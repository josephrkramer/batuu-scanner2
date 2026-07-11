#!/bin/bash

set -euo pipefail

if [ "$#" -ne 2 ]; then
  echo "Usage: $0 <input.glb> <output.glb>"
  exit 1
fi

npx @gltf-transform/cli optimize "$1" "$2" \
  --simplify 0.5 \
  --texture-compress webp \
  --texture-size 1024 \
  --compress false