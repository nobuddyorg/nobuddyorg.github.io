import sharp from 'sharp';
import { readFile, writeFile, access, mkdir, unlink } from 'fs/promises';
import path from 'path';
import { glob } from 'glob'; // Assumes glob is available

// --- Configuration ---
const BASE_PUBLIC_DIR = path.resolve('public'); // Assuming script is run from web-buddy directory
const IMAGE_SUBDIRS = ['images', 'logos'];
const SOURCE_FILE_PATTERNS = ['**/*.{png,gif,jpg,jpeg}']; // Added jpg/jpeg
const COMPONENTS_DIR = path.resolve('src/app'); // Assuming script is run from web-buddy directory
const TSX_FILE_PATTERN = path.join(COMPONENTS_DIR, '**/*.tsx');

// --- Helper Functions ---

/**
 * Extracts width and height from a Next.js Image component string.
 * @param {string} componentStr - The string segment of the Image component.
 * @returns {{width: number, height: number} | null}
 */
function extractDimensionsFromComponent(componentStr) {
  // Regex to find width={NUMBER} or width="NUMBER"
  const widthMatch = componentStr.match(/width=\{?\s*"?(\d+)"?\s*\}?/);
  // Regex to find height={NUMBER} or height="NUMBER"
  const heightMatch = componentStr.match(/height=\{?\s*"?(\d+)"?\s*\}?/);

  if (widthMatch && widthMatch[1] && heightMatch && heightMatch[1]) {
    return {
      width: parseInt(widthMatch[1], 10),
      height: parseInt(heightMatch[1], 10),
    };
  }
  return null;
}

/**
 * Searches .tsx files for <Image /> component usage with a specific src path
 * and extracts its width and height.
 * @param {string} imageSrcPath - The src path of the image (e.g., /images/foo.png).
 * @returns {Promise<{width: number, height: number} | null>}
 */
async function findImageDimensionsInCode(imageSrcPath) {
  // TSX_FILE_PATTERN is already an absolute path or resolved from CWD if glob needs it that way.
  // Glob's `cwd` option makes it search relative to that directory, but the pattern itself can be absolute.
  // Let's ensure tsxFiles are joined with COMPONENTS_DIR if glob returns relative paths from its CWD.
  const tsxFilePaths = await glob(TSX_FILE_PATTERN, { nodir: true }); // Simpler glob call

  for (const tsxFile of tsxFilePaths) { // tsxFile is now an absolute path or relative to project root
    try {
      // const filePath = path.isAbsolute(tsxFile) ? tsxFile : path.join(COMPONENTS_DIR, tsxFile);
      // Since TSX_FILE_PATTERN is already path.join(COMPONENTS_DIR, '**/*.tsx'), paths should be absolute.
      const content = await readFile(tsxFile, 'utf-8');

      // Regex to find <Image ... src="IMAGE_SRC_PATH" ... />
      // This regex is designed to be somewhat flexible with prop order and content.
      // It captures the entire Image component tag.
      // Explanation:
      // <Image          - Matches the opening of the Image component
      // [^>]*           - Matches any character except '>' (non-greedy) zero or more times (attributes before src)
      // src=["']        - Matches src= followed by a quote (single or double)
      // ${imageSrcPath} - The specific image src path we're looking for (escaped for regex)
      // ["']            - Matches the closing quote for src
      // [^>]*           - Matches any character except '>' (non-greedy) zero or more times (attributes after src)
      // \/?             - Optionally matches a self-closing slash '/'
      // >               - Matches the closing '>' of the tag
      const escapedSrc = imageSrcPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // Escape special characters in src path
      const imageComponentRegex = new RegExp(
        `<Image[^>]*src=["']${escapedSrc}["'][^>]*\\/?>`,
        'g' // Global flag to find all occurrences, though we'll use the first
      );

      let match;
      while ((match = imageComponentRegex.exec(content)) !== null) {
        const componentStr = match[0];
        const dimensions = extractDimensionsFromComponent(componentStr);
        if (dimensions) {
          console.log(`   Found dimensions ${dimensions.width}x${dimensions.height} for ${imageSrcPath} in ${tsxFile}`);
          return dimensions; // Return dimensions from the first match
        }
      }
    } catch (err) {
      console.warn(`   Warning: Could not read or parse ${tsxFile}: ${err.message}`);
    }
  }
  console.log(`   No dimensions found for ${imageSrcPath} in .tsx files.`);
  return null;
}


// --- Main Function ---
async function optimizeImages() {
  console.log('Starting image optimization...');
  let processedCount = 0;
  let skippedCount = 0;

  for (const subdir of IMAGE_SUBDIRS) {
    const fullSubdirPath = path.join(BASE_PUBLIC_DIR, subdir);
    for (const pattern of SOURCE_FILE_PATTERNS) {
      // Construct search pattern for glob relative to BASE_PUBLIC_DIR
      const searchPatternInPublic = path.join(subdir, pattern);
      const imagePaths = await glob(searchPatternInPublic, { nodir: true, cwd: BASE_PUBLIC_DIR });

      for (const imagePathWithinSubdir of imagePaths) { // e.g., 'images/procrastination-buddy/buddy-preview.gif'
        const relativeImagePath = imagePathWithinSubdir; // imagePathWithinSubdir is already relative to BASE_PUBLIC_DIR
        const absoluteImagePath = path.join(BASE_PUBLIC_DIR, relativeImagePath);
        const imageExtension = path.extname(relativeImagePath);
        const imageName = path.basename(relativeImagePath, imageExtension);

        const outputDirectory = path.dirname(absoluteImagePath);
        const webpOutputPath = path.join(outputDirectory, `${imageName}.webp`);

        // src path as used in components (e.g., /images/procrastination-buddy/buddy-preview.gif)
        const srcPath = `/${relativeImagePath.replace(/\\/g, '/')}`; // Ensure forward slashes for URL

        console.log(`\nProcessing: ${absoluteImagePath}`);

        try {
          // Ensure output directory exists (it should, but good practice)
          await mkdir(outputDirectory, { recursive: true });

          let dimensions = null;
          // Only attempt to find dimensions if it's not a GIF (resizing GIFs can be tricky and might lose animation if not handled carefully by sharp for all frames)
          // For this script, we will only resize static images.
          if (imageExtension.toLowerCase() !== '.gif') {
             dimensions = await findImageDimensionsInCode(srcPath);
          } else {
            console.log(`   Skipping dimension search for GIF: ${srcPath}`);
          }

          const image = sharp(absoluteImagePath, { animated: imageExtension.toLowerCase() === '.gif' });

          if (dimensions && dimensions.width && dimensions.height) {
            image.resize({
              width: dimensions.width,
              height: dimensions.height,
              fit: 'inside',
              withoutEnlargement: true,
            });
            console.log(`   Resizing to: ${dimensions.width}x${dimensions.height}`);
          } else {
            console.log(`   No resize dimensions found or applied for ${srcPath}.`);
          }

          await image.webp({ quality: 80 }).toFile(webpOutputPath);
          console.log(`   Converted: ${absoluteImagePath} -> ${webpOutputPath}`);

          // Delete the original file after successful conversion
          if (imageExtension.toLowerCase() !== '.webp') { // Don't delete if somehow a .webp was a source
            await unlink(absoluteImagePath);
            console.log(`   Deleted original: ${absoluteImagePath}`);
          }
          processedCount++;

        } catch (error) {
          console.error(`   Error processing ${absoluteImagePath}: ${error.message}`);
          skippedCount++;
        }
      }
    }
  }

  console.log(`\nImage optimization complete. Processed: ${processedCount}, Skipped/Errors: ${skippedCount}`);
  if (skippedCount > 0) {
    console.log('   Note: Some original files that caused errors were not deleted.');
  }
}

// --- Execute ---
optimizeImages().catch(error => {
  console.error('Critical error during image optimization:', error);
  process.exit(1);
});
