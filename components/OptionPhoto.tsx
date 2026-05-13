'use client';

type Props = {
  src: string;
  alt: string;
};

// Renders a square photo inside a choice card with subtle styling.
export default function OptionPhoto({ src, alt }: Props) {
  return (
    <div className="relative w-full aspect-square overflow-hidden rounded-2xl bg-sand">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Subtle inner shadow for depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow: 'inset 0 0 30px rgba(0,0,0,0.15)',
        }}
      />
    </div>
  );
}
