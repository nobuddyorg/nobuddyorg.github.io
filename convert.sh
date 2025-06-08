#!/bin/bash

find . -type f -iname '*.webp' | while read -r file; do
    out="${file%.*}.webp"
    echo "Converting PNG: $file → $out"
    cwebp -q 80 "$file" -o "$out"
done

find . -type f -iname '*.webp' | while read -r file; do
    frames=$(identify "$file" | wc -l)
    if [ "$frames" -gt 1 ]; then
        out="${file%.*}.webp"
        echo "Converting animated GIF: $file → $out"
        gif2webp "$file" -o "$out"
    fi
done
