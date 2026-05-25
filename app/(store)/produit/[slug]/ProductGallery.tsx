"use client";

import { useState } from "react";
import Image from "next/image";

interface Props {
  images: string[];
  name: string;
}

export default function ProductGallery({ images, name }: Props) {
  const [active, setActive] = useState(0);
  const hasImages = images.length > 0;

  return (
    <div className="flex gap-3">
      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex flex-col gap-2">
          {images.map((url, i) => (
            <button
              key={url}
              onClick={() => setActive(i)}
              aria-pressed={i === active}
              aria-label={`Image ${i + 1}${i === active ? ", actuellement affichée" : ""}`}
              className={`w-16 h-16 rounded-xl border-2 overflow-hidden bg-[var(--color-background-soft)] transition-colors ${i === active ? "border-[var(--color-primary)]" : "border-[var(--color-border-subtle)]"}`}
            >
              <Image src={url} alt={`${name} vue ${i + 1}`} width={64} height={64} className="w-full h-full object-contain p-1" />
            </button>
          ))}
        </div>
      )}

      {/* Main image */}
      <div className="flex-1 aspect-square rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-background-soft)] relative overflow-hidden">
        {hasImages ? (
          <Image
            src={images[active]}
            alt={name}
            fill
            className="object-contain p-6"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[var(--color-on-surface-variant)] opacity-30 text-sm">
            Image à venir
          </div>
        )}
      </div>
    </div>
  );
}
