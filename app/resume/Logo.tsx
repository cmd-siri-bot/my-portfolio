"use client";

export default function Logo({ src, alt }: { src: string; alt: string }) {
  // Fixed frame; the image shows once the file exists in /public/logos/.
  // A missing file is hidden on error so the layout never breaks.
  return (
    <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-md border border-line bg-paper">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-contain p-1.5"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).style.visibility = "hidden";
        }}
      />
    </div>
  );
}
