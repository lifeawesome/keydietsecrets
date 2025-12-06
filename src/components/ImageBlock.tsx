"use client";

import Image from "next/image";
import { urlForImage } from "@/lib/sanity";

type ImageBlockProps = {
  image: any;
  alt: string;
  caption?: string | null;
};

export function ImageBlock({ image, alt, caption }: ImageBlockProps) {
  if (!image) return null;

  const imageUrl = urlForImage(image).url();

  return (
    <figure className="my-8">
      <div className="relative aspect-video w-full overflow-hidden rounded-lg">
        <Image
          src={imageUrl}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-center text-sm italic text-slate-600">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
