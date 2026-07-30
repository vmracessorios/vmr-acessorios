"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  images: string[];
  name: string;
};

export default function ProductGallery({
  images,
  name,
}: Props) {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="space-y-4">

      <div className="relative aspect-square rounded-3xl overflow-hidden bg-[#FAF8F5]">

        <Image
          src={selectedImage}
          alt={name}
          fill
          className="object-cover transition duration-300 hover:scale-110"
        />

      </div>

      <div className="flex gap-3">

        {images.map((image, index) => (

          <button
            key={index}
            onClick={() => setSelectedImage(image)}
            className={`relative h-20 w-20 overflow-hidden rounded-xl border-2 ${
              selectedImage === image
                ? "border-[#C8A96A]"
                : "border-neutral-200"
            }`}
          >
            <Image
              src={image}
              alt={`${name} ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>

        ))}

      </div>

    </div>
  );
}