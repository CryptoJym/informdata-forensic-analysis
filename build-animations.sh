#!/bin/bash

echo "Building Remotion animations..."

# Create output directory
mkdir -p public/animations

# Render all animations as MP4 files
echo "Rendering Repository Transformation..."
npx remotion render src/index.tsx RepositoryTransformation public/animations/repository-transformation.mp4 --codec h264

echo "Rendering API Flow Comparison..."
npx remotion render src/index.tsx APIFlowComparison public/animations/api-flow-comparison.mp4 --codec h264

echo "Rendering Field Naming..."
npx remotion render src/index.tsx FieldNaming public/animations/field-naming.mp4 --codec h264

echo "Rendering Product Structure..."
npx remotion render src/index.tsx ProductStructure public/animations/product-structure.mp4 --codec h264

echo "Rendering Verification Pattern..."
npx remotion render src/index.tsx VerificationPattern public/animations/verification-pattern.mp4 --codec h264

echo "Rendering Business Impact..."
npx remotion render src/index.tsx BusinessImpact public/animations/business-impact.mp4 --codec h264

echo "All animations rendered successfully!"
echo "Files saved to public/animations/"