#!/bin/bash

find . -type f -iname '*.png' | while read -r file; do
    out="${file%.*}.webp"
    echo "Converting PNG: $file → $out"
    cwebp -q 80 "$file" -o "$out"
done

find . -type f -iname '*.gif' | while read -r file; do
    frames=$(identify "$file" | wc -l)
    if [ "$frames" -gt 1 ]; then
        out="${file%.*}.webp"
        echo "Converting animated GIF: $file → $out"
        gif2webp "$file" -o "$out"
    fi
done

for name in procrastination.webp fair.webp thrash.webp karma.webp qr.webp peek.webp ridemerge.webp powertrail.webp gamegallery.webp; do
    find . -type f -name "$name" | while read -r file; do
        echo "Resizing $file..."
        convert "$file" -resize 100x100\! -quality 85 "$file"
    done
done
