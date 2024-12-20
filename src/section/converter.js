"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ImageToWebPConverter() {
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");

  const handleFilesUpload = (event) => {
    const files = Array.from(event.target.files);
    const validFiles = files.filter((file) =>
      /image\/(png|jpeg|jpg)/.test(file.type)
    );

    if (!validFiles.length) {
      setError("Please upload valid PNG or JPG files.");
      return;
    }

    setError("");

    const imagePromises = validFiles.map(
      (file) =>
        new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = () => {
            const img = new Image();
            img.onload = () => {
              const canvas = document.createElement("canvas");
              canvas.width = img.width;
              canvas.height = img.height;

              const ctx = canvas.getContext("2d");
              ctx.drawImage(img, 0, 0);

              if (/image\/jpeg/.test(file.type)) {
                // Convert JPG to PNG
                canvas.toBlob((pngBlob) => {
                  const pngImg = new Image();
                  pngImg.onload = () => {
                    const webpCanvas = document.createElement("canvas");
                    webpCanvas.width = pngImg.width;
                    webpCanvas.height = pngImg.height;

                    const webpCtx = webpCanvas.getContext("2d");
                    webpCtx.drawImage(pngImg, 0, 0);

                    webpCanvas.toBlob(
                      (webpBlob) => {
                        resolve({
                          originalURL: reader.result,
                          originalSize: file.size,
                          webpURL: URL.createObjectURL(webpBlob),
                          webpSize: webpBlob.size,
                        });
                      },
                      "image/webp",
                      0.8
                    );
                  };
                  pngImg.src = URL.createObjectURL(pngBlob);
                }, "image/png");
              } else {
                // Direct PNG to WebP
                canvas.toBlob(
                  (blob) => {
                    resolve({
                      originalURL: reader.result,
                      originalSize: file.size,
                      webpURL: URL.createObjectURL(blob),
                      webpSize: blob.size,
                    });
                  },
                  "image/webp",
                  0.8
                );
              }
            };
            img.src = reader.result;
          };
          reader.readAsDataURL(file);
        })
    );

    Promise.all(imagePromises).then((results) => setImages(results));
  };

  const downloadWebP = (webpURL, index) => {
    const link = document.createElement("a");
    link.href = webpURL;
    link.download = `converted-${index + 1}.webp`;
    link.click();
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div>
        <h1>Upload JPG, JPEG, or PNG Files</h1>
        <Input
          type="file"
          accept="image/png, image/jpeg"
          multiple
          onChange={handleFilesUpload}
          className="block w-full"
        />
      </div>
      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {images.map((image, index) => {
          const savingsPercent = (
            ((image.originalSize - image.webpSize) / image.originalSize) *
            100
          ).toFixed(2);

          return (
            <Card key={index} className="flex flex-row gap-8 items-center">
              <div className="w-1/2">
                <CardHeader>
                  <CardTitle>Original Image</CardTitle>
                </CardHeader>
                <CardContent>
                  <img
                    src={image.originalURL}
                    alt={`Original ${index + 1}`}
                    className="rounded shadow w-full"
                  />
                  <Badge variant="secondary" className="mt-2">
                    Original Size: {(image.originalSize / 1024).toFixed(2)} KB
                  </Badge>
                </CardContent>
              </div>
              <div className="w-1/2">
                <CardHeader>
                  <CardTitle>Converted WebP</CardTitle>
                </CardHeader>
                <CardContent>
                  <img
                    src={image.webpURL}
                    alt={`Converted ${index + 1}`}
                    className="rounded shadow w-full"
                  />
                  <Badge variant="secondary" className="mt-2">
                    WebP Size: {(image.webpSize / 1024).toFixed(2)} KB
                  </Badge>
                  <div className="mt-2 text-green-500 font-bold text-sm">
                    Savings: {savingsPercent}%
                  </div>
                  <Button
                    onClick={() => downloadWebP(image.webpURL, index)}
                    className="mt-4"
                  >
                    Download WebP
                  </Button>
                </CardContent>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
