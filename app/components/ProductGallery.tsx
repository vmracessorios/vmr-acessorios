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

  return (
    <div>
      <div className="overflow-hidden rounded-3xl bg-[#FAF8F5]">
        <Image
          src={currentImage}
          alt={name}
          width={700}
          height={900}
          className="w-full h-auto"
        />
      </div>

      <div className="flex gap-4 mt-5">
        <button onClick={() => setCurrentImage(image)}>
          <Image
            src={image}
            alt={name}
            width={100}
            height={120}
            className="rounded-xl border"
          />
        </button>

        <button onClick={() => setCurrentImage(modelImage)}>
          <Image
            src={modelImage}
            alt={`${name} modelo`}
            width={100}
            height={120}
            className="rounded-xl border"
          />
        </button>
      </div>
    </div>
  );
}