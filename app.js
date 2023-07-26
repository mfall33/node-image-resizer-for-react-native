const sharp = require('sharp');
const path = require('path');

const sourceFile = process.argv[2]; // source file
const scaleFactors = [2, 3]; // Resize factors (@2x, @3x)

let initialDimensions = {
    width: 0,
    height: 0
};

(async () => {
    await sharp(sourceFile)
        .metadata()
        .then(data => {

            // set the dimensions of our source image
            initialDimensions.height = data.height;
            initialDimensions.width = data.width;

            // after we have these dimensions in memory we can start generating new images
            resizeImages();

        })

})()

// Main function to resize the input image
async function resizeImages() {
    try {

        // say if we had 'image.jpg'

        // '.jpg'
        const fileExt = path.extname(sourceFile);

        // 'image
        const fileName = path.basename(sourceFile, fileExt);

        const resizingPromises = scaleFactors.map(scale => {
            // 'image@2x.jpg', 'image@3x.jpg'
            const outputPath = path.join(`${fileName}@${scale}x${fileExt}`);
            return resizeImage(sourceFile, outputPath, scale);
        });

        Promise.all(resizingPromises);

    } catch (error) {
        console.error('Error resizing image:', error);
    }
}


// Function to resize an image with a given scale factor
async function resizeImage(inputPath, outputPath, scale) {
    // new sharp instance
    await sharp(inputPath)
        .resize({ width: initialDimensions.width * scale }) // Change the width as needed
        .toFile(outputPath)
        .then(data => console.log(`Image resized to @${scale}x: ${outputPath}`))
        .catch(err => console.log(`Failed to resize image: ${err}`))

}