#!/bin/bash


echo "Cleaning packages..."
echo ""

for d in packages/* ; do
    [ -L "${d%/}" ] && continue  # skip symlinks
    APP="${d/packages\//}"
    echo "Syncing $APP..."

    rm -rf "$d/.next"
    rm -rf "$d/node_modules"
    rm -rf "$d/package-lock.json"
    #npm install --prefix $d --quiet
done