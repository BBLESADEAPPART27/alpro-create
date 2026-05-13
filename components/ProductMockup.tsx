'use client';

import { BASES, PROTEINS, TOPPINGS, FLAVORS, type Option } from '@/lib/catalog';

type Props = {
  base?: string;
  protein?: string;
  topping?: string;
  flavor?: string;
  size?: number;
  showSpoon?: boolean;
};

function find(arr: Option[], id?: string) {
  return arr.find((o) => o.id === id);
}

// --- Topping renderers ---------------------------------------------------
// Each renders inside the lid area. Coordinates are local to the SVG.
function ToppingBerries() {
  return (
    <g>
      {/* granola base layer underneath berries */}
      <ellipse cx="160" cy="78" rx="105" ry="22" fill="#C9A877" />
      <ellipse cx="160" cy="76" rx="100" ry="18" fill="#B68D5B" />
      {/* blueberries */}
      <circle cx="110" cy="68" r="9" fill="#3B4E78" />
      <circle cx="108" cy="66" r="3" fill="#5A6B95" opacity="0.6" />
      <circle cx="180" cy="64" r="10" fill="#2F3F66" />
      <circle cx="178" cy="62" r="3" fill="#5A6B95" opacity="0.6" />
      <circle cx="215" cy="72" r="8" fill="#3B4E78" />
      <circle cx="140" cy="74" r="7" fill="#4A5C84" />
      {/* raspberries */}
      <g transform="translate(85 72)">
        <circle cx="0" cy="0" r="10" fill="#B8385A" />
        <circle cx="-3" cy="-2" r="2.5" fill="#D45878" />
        <circle cx="3" cy="-2" r="2.5" fill="#D45878" />
        <circle cx="0" cy="3" r="2.5" fill="#D45878" />
      </g>
      <g transform="translate(232 68)">
        <circle cx="0" cy="0" r="11" fill="#A02E50" />
        <circle cx="-3" cy="-2" r="2.5" fill="#C24C70" />
        <circle cx="3" cy="-2" r="2.5" fill="#C24C70" />
        <circle cx="0" cy="3" r="2.5" fill="#C24C70" />
      </g>
      <circle cx="158" cy="62" r="6" fill="#3B4E78" />
    </g>
  );
}

function ToppingGranola() {
  return (
    <g>
      <ellipse cx="160" cy="78" rx="105" ry="22" fill="#B68D5B" />
      <ellipse cx="160" cy="76" rx="100" ry="18" fill="#A07A48" />
      {/* clusters */}
      {[
        [85, 72, 8], [115, 66, 9], [145, 70, 8], [175, 64, 10],
        [205, 70, 9], [235, 74, 8], [100, 78, 6], [130, 78, 7],
        [160, 78, 8], [190, 78, 7], [220, 78, 6], [250, 72, 7],
      ].map(([x, y, r], i) => (
        <g key={i} transform={`translate(${x} ${y})`}>
          <circle cx="0" cy="0" r={r} fill="#C9A06A" />
          <circle cx="-2" cy="-1" r={(r as number) * 0.4} fill="#E0BE85" />
        </g>
      ))}
      {/* oat flakes */}
      {[[95, 64], [125, 60], [155, 60], [185, 58], [215, 62], [245, 66]].map(
        ([x, y], i) => (
          <ellipse key={i} cx={x} cy={y} rx="6" ry="3" fill="#F0DBB5" transform={`rotate(${i * 15} ${x} ${y})`} />
        )
      )}
    </g>
  );
}

function ToppingStrawberry() {
  return (
    <g>
      <ellipse cx="160" cy="78" rx="105" ry="22" fill="#E8C7A8" />
      <ellipse cx="160" cy="76" rx="100" ry="18" fill="#DDB58F" />
      {/* strawberry slices */}
      {[
        [95, 70], [130, 64], [165, 62], [200, 66], [235, 72], [115, 78], [185, 78], [220, 78],
      ].map(([x, y], i) => (
        <g key={i} transform={`translate(${x} ${y}) rotate(${i * 30})`}>
          <ellipse cx="0" cy="0" rx="11" ry="9" fill="#D45B5B" />
          <ellipse cx="0" cy="0" rx="8" ry="6" fill="#E07878" />
          {/* seeds */}
          <circle cx="-3" cy="-2" r="0.8" fill="#F8E8C4" />
          <circle cx="3" cy="-2" r="0.8" fill="#F8E8C4" />
          <circle cx="0" cy="2" r="0.8" fill="#F8E8C4" />
          <circle cx="-4" cy="2" r="0.8" fill="#F8E8C4" />
          <circle cx="4" cy="2" r="0.8" fill="#F8E8C4" />
        </g>
      ))}
    </g>
  );
}

function ToppingPlaceholder() {
  return (
    <g>
      <ellipse cx="160" cy="78" rx="105" ry="22" fill="#FAF6EE" opacity="0.4" />
    </g>
  );
}

function renderTopping(toppingId?: string) {
  switch (toppingId) {
    case 'berries':
      return <ToppingBerries />;
    case 'granola':
      return <ToppingGranola />;
    case 'strawberry':
      return <ToppingStrawberry />;
    default:
      return <ToppingPlaceholder />;
  }
}

// --- Flavor accent rendering on the pot label ---------------------------
function FlavorAccent({ flavorId, color }: { flavorId?: string; color: string }) {
  if (!flavorId) return null;
  switch (flavorId) {
    case 'vanilla':
      return (
        <g transform="translate(95 245)" opacity="0.85">
          {/* vanilla pod */}
          <ellipse cx="0" cy="20" rx="4" ry="22" fill="#5B3A1F" transform="rotate(-20)" />
          <ellipse cx="-2" cy="18" rx="2" ry="20" fill="#3A2412" transform="rotate(-20)" />
          {/* flower */}
          <g transform="translate(20 8)">
            {[0, 72, 144, 216, 288].map((a) => (
              <ellipse key={a} cx="0" cy="-10" rx="6" ry="11" fill="#FFFBF0" transform={`rotate(${a})`} />
            ))}
            <circle cx="0" cy="0" r="3.5" fill="#E8C76B" />
          </g>
        </g>
      );
    case 'lemon':
      return (
        <g transform="translate(95 245)" opacity="0.9">
          <circle cx="15" cy="15" r="22" fill="#E8C76B" />
          <circle cx="15" cy="15" r="17" fill="#F2D87A" />
          {[0, 45, 90, 135].map((a) => (
            <line key={a} x1="15" y1="15" x2={15 + 15 * Math.cos((a * Math.PI) / 180)} y2={15 + 15 * Math.sin((a * Math.PI) / 180)} stroke="#FFFBF0" strokeWidth="1.5" />
          ))}
          {[0, 90, 180, 270].map((a) => (
            <ellipse key={a} cx={15 + 8 * Math.cos((a * Math.PI) / 180)} cy={15 + 8 * Math.sin((a * Math.PI) / 180)} rx="3" ry="6" fill="#FFFBF0" transform={`rotate(${a} ${15 + 8 * Math.cos((a * Math.PI) / 180)} ${15 + 8 * Math.sin((a * Math.PI) / 180)})`} />
          ))}
        </g>
      );
    case 'caramel':
      return (
        <g transform="translate(85 240)" opacity="0.9">
          {/* caramel drizzle */}
          <path d="M 0 20 Q 10 10, 20 18 Q 30 26, 40 16 Q 50 6, 55 18" stroke="#B87A3D" strokeWidth="6" fill="none" strokeLinecap="round" />
          <ellipse cx="20" cy="30" rx="18" ry="6" fill="#B87A3D" opacity="0.6" />
        </g>
      );
    case 'pistachio':
      return (
        <g transform="translate(95 245)" opacity="0.9">
          {/* pistachio nuts */}
          <ellipse cx="0" cy="15" rx="9" ry="14" fill="#8FA86E" transform="rotate(-30)" />
          <ellipse cx="-2" cy="13" rx="6" ry="11" fill="#A8C088" transform="rotate(-30)" />
          <ellipse cx="20" cy="20" rx="9" ry="14" fill="#7A9560" transform="rotate(20)" />
          <ellipse cx="22" cy="18" rx="6" ry="11" fill="#9CB67A" transform="rotate(20)" />
          <ellipse cx="35" cy="10" rx="8" ry="13" fill="#8FA86E" transform="rotate(-10)" />
        </g>
      );
    case 'matcha':
      return (
        <g transform="translate(90 240)" opacity="0.92">
          {/* whisked matcha swirl */}
          <ellipse cx="20" cy="20" rx="22" ry="12" fill="#6B8E4E" />
          <ellipse cx="20" cy="18" rx="18" ry="9" fill="#82A560" />
          <path d="M 5 18 Q 20 8, 35 18 Q 28 22, 20 16 Q 12 22, 5 18 Z" fill="#A8C078" opacity="0.7" />
          {/* leaf */}
          <ellipse cx="40" cy="10" rx="4" ry="9" fill="#4A6B30" transform="rotate(45 40 10)" />
        </g>
      );
    default:
      return null;
  }
}

// --- Main component ------------------------------------------------------
export default function ProductMockup({
  base,
  protein,
  topping,
  flavor,
  size = 320,
  showSpoon = true,
}: Props) {
  const baseOpt = find(BASES, base);
  const proteinOpt = find(PROTEINS, protein);
  const flavorOpt = find(FLAVORS, flavor);

  const labelColor = baseOpt?.color || '#F5EFE4';
  const flavorColor = flavorOpt?.color || '#C9A877';
  const proteinColor = proteinOpt?.color || '#A8B89F';

  const flavorLabel = flavorOpt?.label?.toUpperCase() || 'FLAVOR';
  const baseLabel = baseOpt?.label?.toUpperCase() || 'BASE';
  const proteinBadge =
    proteinOpt?.id === 'high' ? 'HIGH PROTEIN' : proteinOpt?.id === 'low' ? 'LOW IN FAT' : '5 ESSENTIAL NUTRIENTS';

  return (
    <svg
      viewBox="0 0 420 480"
      width={size}
      height={(size * 480) / 420}
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: 'drop-shadow(0 30px 40px rgba(40, 40, 30, 0.15))' }}
    >
      <defs>
        <linearGradient id="lidGloss" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="potBody" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={labelColor} stopOpacity="0.85" />
          <stop offset="50%" stopColor={labelColor} />
          <stop offset="100%" stopColor={labelColor} stopOpacity="0.85" />
        </linearGradient>
        <linearGradient id="proteinBand" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={proteinColor} />
          <stop offset="100%" stopColor={proteinColor} stopOpacity="0.7" />
        </linearGradient>
        <linearGradient id="spoonWood" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D4B58E" />
          <stop offset="100%" stopColor="#B8985E" />
        </linearGradient>
      </defs>

      {/* --- LID (transparent dome) holding toppings --- */}
      <g>
        {/* dome outline */}
        <path
          d="M 55 90 Q 55 40, 160 38 Q 265 40, 265 90 L 270 105 L 50 105 Z"
          fill="#FFFFFF"
          fillOpacity="0.12"
          stroke="#FFFFFF"
          strokeOpacity="0.6"
          strokeWidth="1.5"
        />
        {/* toppings inside lid */}
        {renderTopping(topping)}
        {/* dome highlight */}
        <path
          d="M 70 90 Q 70 45, 160 42 Q 170 42, 175 45"
          stroke="url(#lidGloss)"
          strokeWidth="3"
          fill="none"
          opacity="0.7"
        />
      </g>

      {/* --- POT BODY --- */}
      <g>
        {/* pot shape: trapezoid (narrower at bottom) */}
        <path
          d="M 50 105 L 270 105 L 255 430 L 65 430 Z"
          fill="url(#potBody)"
        />
        {/* subtle side shading */}
        <path
          d="M 50 105 L 75 105 L 70 430 L 65 430 Z"
          fill="#000000"
          fillOpacity="0.06"
        />
        <path
          d="M 245 105 L 270 105 L 255 430 L 250 430 Z"
          fill="#000000"
          fillOpacity="0.04"
        />

        {/* Protein/nutrients band at top of pot */}
        <path
          d="M 50 105 L 270 105 L 268 135 L 52 135 Z"
          fill="url(#proteinBand)"
        />
        {/* Leaf badge on left of band */}
        <g transform="translate(70 120)">
          <path d="M -12 0 Q -6 -14, 12 -10 Q 6 8, -12 0 Z" fill="#6B8E4E" />
          <path d="M -8 -2 Q 0 -8, 8 -6" stroke="#FFFBF0" strokeWidth="0.8" fill="none" opacity="0.6" />
        </g>
        <text x="88" y="118" fill="#FFFBF0" fontSize="7" fontWeight="700" fontFamily="DM Sans, sans-serif" letterSpacing="0.5">
          5 ESSENTIAL
        </text>
        <text x="88" y="128" fill="#FFFBF0" fontSize="7" fontWeight="700" fontFamily="DM Sans, sans-serif" letterSpacing="0.5">
          NUTRIENTS
        </text>
        <text x="265" y="123" textAnchor="end" fill="#FFFBF0" fontSize="9" fontWeight="700" fontFamily="DM Sans, sans-serif" letterSpacing="0.8">
          {proteinBadge}
        </text>

        {/* alpro logo */}
        <text
          x="160"
          y="195"
          textAnchor="middle"
          fill="#1B2A4A"
          fontSize="56"
          fontWeight="800"
          fontFamily="DM Sans, sans-serif"
          fontStyle="italic"
          letterSpacing="-2"
        >
          alpro
        </text>
        {/* tiny leaf above the 'p' */}
        <path d="M 169 152 Q 175 145, 184 150 Q 179 158, 169 152 Z" fill="#6B8E4E" />
        {/* registered mark */}
        <text x="223" y="180" fill="#1B2A4A" fontSize="10" fontFamily="DM Sans, sans-serif">®</text>

        {/* Flavor name — big, orange-toned, like 'VANILLE' on reference */}
        <text
          x="160"
          y="245"
          textAnchor="middle"
          fill={flavorColor}
          fontSize="36"
          fontWeight="700"
          fontFamily="Fraunces, serif"
          letterSpacing="2"
        >
          {flavorLabel}
        </text>

        {/* Flavor accent illustration (vanilla pod, lemon, etc.) */}
        <FlavorAccent flavorId={flavor} color={flavorColor} />

        {/* Cream/yogurt swirl illustration mid-label */}
        <g transform="translate(175 290)" opacity="0.95">
          <path
            d="M 0 20 Q 20 -5, 40 15 Q 35 25, 25 20 Q 30 28, 20 30 Q 10 32, 5 25 Q -5 27, 0 20 Z"
            fill="#FFFBF0"
            stroke="#EBE3D2"
            strokeWidth="0.8"
          />
          <path d="M 15 12 Q 25 5, 32 12" stroke="#FFFFFF" strokeWidth="2" fill="none" opacity="0.7" />
        </g>

        {/* 'AU SOJA / OAT / ALMOND / COCONUT' base mention */}
        <text
          x="160"
          y="385"
          textAnchor="middle"
          fill="#1B2A4A"
          fontSize="11"
          fontWeight="600"
          fontFamily="DM Sans, sans-serif"
          letterSpacing="3"
        >
          {base ? `MADE WITH ${baseLabel}` : 'MADE WITH —'}
        </text>

        {/* Bottom green 'végétal' badge */}
        <g transform="translate(215 405)">
          <circle cx="0" cy="0" r="22" fill="#6B8E4E" />
          <path d="M -10 -2 Q -4 -12, 8 -8 Q 4 4, -10 -2 Z" fill="#FFFBF0" />
          <text x="0" y="14" textAnchor="middle" fill="#FFFBF0" fontSize="6" fontWeight="700" fontFamily="DM Sans, sans-serif">
            PLANT-BASED
          </text>
        </g>
      </g>

      {/* --- WOODEN EDIBLE SPOON (signature alpro) --- */}
      {showSpoon && (
        <g transform="translate(285 380) rotate(20)">
          {/* handle */}
          <rect x="0" y="0" width="100" height="14" rx="6" fill="url(#spoonWood)" />
          {/* scoop */}
          <ellipse cx="-8" cy="7" rx="20" ry="11" fill="url(#spoonWood)" />
          <ellipse cx="-8" cy="7" rx="15" ry="7" fill="#9E7E4A" opacity="0.5" />
          {/* embossed alpro on handle */}
          <text x="50" y="11" textAnchor="middle" fill="#8A6B3E" fontSize="7" fontWeight="800" fontFamily="DM Sans, sans-serif" fontStyle="italic" opacity="0.7">
            alpro
          </text>
          {/* wood grain */}
          <line x1="15" y1="3" x2="95" y2="3" stroke="#8A6B3E" strokeWidth="0.3" opacity="0.4" />
          <line x1="15" y1="11" x2="95" y2="11" stroke="#8A6B3E" strokeWidth="0.3" opacity="0.4" />
        </g>
      )}
    </svg>
  );
}
