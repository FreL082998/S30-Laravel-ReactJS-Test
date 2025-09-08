#!/bin/sh

# Check if `node_modules` exists
if [ ! -d "node_modules" ] || [ package-lock.json -nt node_modules ] || [ package.json -nt node_modules ]; then
    echo "Installing or updating dependencies..."
    npm install
else
    echo "Dependencies are already installed. Skipping npm install."
fi

# Build the application
echo "Running npm run build..."
npm run build
