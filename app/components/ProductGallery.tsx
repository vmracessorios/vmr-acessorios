"use client";

import { useState } from "react";
import Image from "next/image";

interface ProductGalleryProps {
  image: string;
  modelImage: string;
  name: string;
}

export default function ProductGallery({
  image,
  modelImage,
  name,
}: ProductGalleryProps) {
  const [currentImage, setCurrentImage] = useState(image);

  const isModelImage = currentImage === modelImage;

  return (
    <div className="w-full">
      <div className="relative w-full h-[720px] overflow-hidden rounded-3xl bg-[#FAF8F5] flex items-center justify-center">
        <Image
          src={currentImage}
          alt={name}
          fill
          sizes="(max-width:768px) 100vw, 700px"
          className={
            isModelImage
              ? "object-contain object-top p-4"
              : "object-contain p-4"
          }
          priority
        />
      </div>

      <div className="flex gap-4 mt-5">
        <button
          type="button"
          onClick={() => setCurrentImage(image)}
          className={`overflow-hidden rounded-xl border-2 transition ${
            currentImage === image
              ? "border-[#C8A96A]"
              : "border-gray-200"
          }`}
        >
          <Image
            src={image}
            alt={name}
            width={100}
            height={120}
            className="object-cover"
          />
        </button>

        <button
          type="button"
          onClick={() => setCurrentImage(modelImage)}
          className={`overflow-hidden rounded-xl border-2 transition ${
            currentImage === modelImage
              ? "border-[#C8A96A]"
              : "border-gray-200"
          }`}
        >
          <Image
            src={modelImage}
            alt={`${name} modelo`}
            width={100}
            height={120}
            className="object-cover object-top"
          />
        </button>
      </div>
    </div>
  );
}