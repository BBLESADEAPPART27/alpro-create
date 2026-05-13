'use client';

import { BASES, PROTEINS, FLAVORS, TOPPINGS, type Option } from '@/lib/catalog';

type Props = {
  base?: string;
  protein?: string;
  flavor?: string;
  toppings?: string[];
  size?: number; // display width in px
};

function find(arr: Option[], id?: string) {
  return arr.find((o) => o.id === id);
}

// The real Alpro photo (alpro-pot.png) shows a pot with "VANILLE" + "AU SOJA"
// printed on it. Rather than digitally erasing those (which leaves ugly
// artifacts), we lay a clean, custom-designed label OVER that area, so it
// looks like a personalized sticker on the pot. The result: real product
// photo + dynamic label that changes with the user's selections.

export default function ProductPhoto({
  base,
  protein,
  flavor,
  toppings = [],
  size = 380,
}: Props) {
  const baseOpt = find(BASES, base);
  const proteinOpt = find(PROTEINS, protein);
  const flavorOpt = find(FLAVORS, flavor);
  const toppingOpts = toppings
    .map((id) => find(TOPPINGS, id))
    .filter(Boolean) as Option[];

  const flavorLabel = flavorOpt?.label?.toUpperCase() || '';
  const baseLabel = baseOpt?.label?.toUpperCase() || '';
  const flavorColor = flavorOpt?.color || '#E8946B';

  const proteinBadge =
    proteinOpt?.id === 'high'
      ? 'HIGH PROTEIN'
      : proteinOpt?.id === 'low'
      ? 'LOW IN FAT'
      : '';

  // The image is 1482 x 1380 — pot is roughly centered.
  // We use percentage positioning over the displayed image.
  // The label area we want to cover (VANILLE + pod + AU SOJA) is roughly:
  //   x: 18% → 80%
  //   y: 38% → 73%

  return (
    <div
      className="relative"
      style={{
        width: size,
        aspectRatio: '1482 / 1380',
      }}
    >
      {/* The real Alpro product photo */}
      <img
        src="/alpro-pot.png"
        alt="Alpro plant-based pot"
        className="absolute inset-0 w-full h-full object-contain"
        style={{
          filter: 'drop-shadow(0 25px 35px rgba(40, 40, 30, 0.18))',
        }}
      />

      {/* CUSTOM LABEL OVERLAY — covers VANILLE/pod/AU SOJA area with a clean
          sticker that holds the dynamic flavor + base info */}
      <div
        className="absolute"
        style={{
          left: '20%',
          right: '20%',
          top: '38%',
          bottom: '27%',
          background:
            'linear-gradient(180deg, rgba(250,246,238,0.96) 0%, rgba(245,239,228,0.98) 100%)',
          borderRadius: '4px',
          boxShadow:
            '0 1px 2px rgba(0,0,0,0.06), inset 0 0 0 1px rgba(0,0,0,0.04)',
          padding: '4% 6%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Flavor name — big, color matches flavor */}
        <div
          style={{
            fontFamily: 'Fraunces, serif',
            fontWeight: 700,
            fontSize: `${size * 0.085}px`,
            color: flavorColor,
            letterSpacing: '0.04em',
            lineHeight: 1,
            textAlign: 'center',
            marginTop: '8%',
          }}
        >
          {flavorLabel || '—'}
        </div>

        {/* Decorative divider */}
        <div
          style={{
            width: '30%',
            height: '1px',
            background: '#1B2A4A',
            opacity: 0.25,
            margin: `${size * 0.025}px 0`,
          }}
        />

        {/* Tagline */}
        <div
          style={{
            fontFamily: 'Fraunces, serif',
            fontStyle: 'italic',
            fontSize: `${size * 0.03}px`,
            color: '#6B7F5C',
            letterSpacing: '0.02em',
            textAlign: 'center',
          }}
        >
          {flavorOpt?.desc || ''}
        </div>

        {/* Base mention */}
        <div
          style={{
            fontFamily: 'DM Sans, sans-serif',
            fontWeight: 600,
            fontSize: `${size * 0.025}px`,
            color: '#1B2A4A',
            letterSpacing: '0.2em',
            textAlign: 'center',
            marginBottom: '4%',
          }}
        >
          {baseLabel ? `MADE WITH ${baseLabel}` : ''}
        </div>
      </div>

      {/* PROTEIN BADGE OVERLAY — covers the right side of the brown nutrients band */}
      {proteinBadge && (
        <div
          className="absolute"
          style={{
            right: '20%',
            top: '18.5%',
            background: proteinOpt?.id === 'high' ? '#6B7F5C' : '#1B2A4A',
            color: '#FFFBF0',
            fontFamily: 'DM Sans, sans-serif',
            fontWeight: 700,
            fontSize: `${size * 0.022}px`,
            letterSpacing: '0.08em',
            padding: `${size * 0.012}px ${size * 0.025}px`,
            borderRadius: '999px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
          }}
        >
          {proteinBadge}
        </div>
      )}

      {/* TOPPINGS BADGE — bottom-left, shows what's in the cup */}
      {toppingOpts.length > 0 && (
        <div
          className="absolute flex flex-col gap-1"
          style={{
            left: '8%',
            top: '8%',
          }}
        >
          {toppingOpts.map((t) => (
            <div
              key={t.id}
              style={{
                background: 'rgba(255, 255, 255, 0.92)',
                color: '#1B2A4A',
                fontFamily: 'DM Sans, sans-serif',
                fontWeight: 600,
                fontSize: `${size * 0.022}px`,
                letterSpacing: '0.05em',
                padding: `${size * 0.01}px ${size * 0.022}px`,
                borderRadius: '999px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                whiteSpace: 'nowrap',
              }}
            >
              + {t.label.toUpperCase()}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
