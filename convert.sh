#!/bin/bash

#find . -type f -iname '*.png' | while read -r file; do
#    out="${file%.*}.webp"
#    echo "Converting PNG: $file → $out"
#    cwebp -q 80 "$file" -o "$out"
#done

# Find the full path of the directory named "collection-buddy"
dir=$(find . -type d -name "collection-buddy" -print -quit)

if [ -z "$dir" ]; then
    echo "Directory 'collection-buddy' not found."
    exit 1
fi

echo "Found directory: $dir"

# Process all GIFs inside the found directory
find "$dir" -type f -iname '*.gif' -print0 | while IFS= read -r -d '' file; do
    # Check if GIF is animated (more than 1 frame)
    frames=$(gif2webp -info "$file" 2>/dev/null | grep -c 'frame')
    
    if [ "$frames" -gt 1 ]; then
        out="${file%.*}.webp"
        echo "Converting animated GIF: $file → $out"
        gif2webp "$file" -o "$out"
    fi
done

#for name in procrastination.webp fair.webp thrash.webp karma.webp peek.webp ridemerge.webp powertrail.webp gamegallery.webp; do
#    find . -type f -name "$name" | while read -r file; do
#        echo "Resizing $file..."
#        convert "$file" -resize 100x100\! -quality 85 "$file"
#    done
#done
