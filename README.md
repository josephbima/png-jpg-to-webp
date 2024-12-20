# Image to WebP Converter

## Overview
This is a React-based web application for converting JPG, JPEG, and PNG images to the WebP format. It supports multiple file uploads and provides a side-by-side comparison of the original and converted images, including file size and percentage savings.

## Features
- **Supports Multiple Formats**: Converts JPG, JPEG, and PNG images to WebP.
- **JPG to PNG Conversion**: Automatically converts JPG/JPEG files to PNG before converting to WebP.
- **Batch Processing**: Allows multiple images to be uploaded and processed simultaneously.
- **Side-by-Side Comparison**: Displays the original and converted images with file size and savings percentage.
- **Download Option**: Enables users to download the converted WebP images.

## Tech Stack
- **React**: For building the user interface.
- **Tailwind CSS**: For responsive and modern styling.
- **FileReader API**: To read and process image files.
- **Canvas API**: For rendering and converting images.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/image-to-webp-converter.git
   ```
2. Navigate to the project directory:
   ```bash
   cd image-to-webp-converter
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open the app in your browser at `http://localhost:3000`.

## Usage
1. Upload JPG, JPEG, or PNG files using the file input.
2. The app will display the original image alongside the converted WebP image.
3. View file sizes and savings percentage for each image.
4. Click the "Download WebP" button to save the converted file to your device.

## Folder Structure
```
src/
├── components/
│   ├── ui/
│   │   ├── button.js
│   │   ├── input.js
│   │   ├── alert.js
│   │   ├── badge.js
│   │   ├── card.js
├── App.js
├── main.js
public/
├── index.html
```

## Key Files
- `App.js`: Contains the core logic for the image conversion process.
- `ui/`: Reusable UI components such as buttons, cards, and alerts.

## Styling
The application uses Tailwind CSS for modern, responsive styling. Adjustments can be made in the `tailwind.config.js` file.

## Future Improvements
- Add support for additional image formats (e.g., GIF, BMP).
- Optimize WebP compression settings for higher quality or smaller sizes.
- Add a progress bar for large file uploads.
- Allow folder drag-and-drop functionality.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Contributions
Contributions are welcome! Feel free to fork the repository and submit a pull request.

## Acknowledgments
Special thanks to the developers of React and Tailwind CSS for providing the tools to build this application.

