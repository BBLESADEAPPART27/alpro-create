// Small inline illustrations for each option card.
// Kept consistent: same canvas, soft style, sage/cream/sky palette.

import React from 'react';

const wrap = (children: React.ReactNode) => (
  <svg viewBox="0 0 120 120" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    {children}
  </svg>
);

// --- BASES ---
export const BaseIllustrations: Record<string, React.ReactNode> = {
  soy: wrap(
    <g>
      <circle cx="60" cy="60" r="38" fill="#F2EAD8" />
      {/* soy pod */}
      <ellipse cx="60" cy="58" rx="28" ry="10" fill="#A8B89F" transform="rotate(-15 60 58)" />
      <circle cx="48" cy="55" r="5" fill="#6B7F5C" />
      <circle cx="60" cy="58" r="5" fill="#6B7F5C" />
      <circle cx="72" cy="61" r="5" fill="#6B7F5C" />
      <path d="M 32 50 Q 28 42, 35 38" stroke="#6B7F5C" strokeWidth="2" fill="none" />
      <ellipse cx="35" cy="36" rx="6" ry="3" fill="#6B7F5C" transform="rotate(-30 35 36)" />
    </g>
  ),
  oat: wrap(
    <g>
      <circle cx="60" cy="60" r="38" fill="#EDE0C4" />
      {/* oat grains */}
      <g transform="translate(60 60)">
        {[0, 60, 120, 180, 240, 300].map((a) => (
          <ellipse
            key={a}
            cx="0"
            cy="-18"
            rx="4"
            ry="9"
            fill="#C9A877"
            transform={`rotate(${a})`}
          />
        ))}
        <circle cx="0" cy="0" r="7" fill="#B68D5B" />
      </g>
    </g>
  ),
  almond: wrap(
    <g>
      <circle cx="60" cy="60" r="38" fill="#E8DCC4" />
      {/* almond */}
      <ellipse cx="60" cy="60" rx="14" ry="22" fill="#C9A877" />
      <ellipse cx="60" cy="58" rx="10" ry="18" fill="#D8B98D" />
      <path d="M 60 45 Q 56 55, 60 75" stroke="#9E7E4A" strokeWidth="1" fill="none" opacity="0.5" />
      <ellipse cx="45" cy="75" rx="8" ry="13" fill="#C9A877" transform="rotate(-30 45 75)" />
      <ellipse cx="75" cy="78" rx="7" ry="11" fill="#C9A877" transform="rotate(25 75 78)" />
    </g>
  ),
  coconut: wrap(
    <g>
      <circle cx="60" cy="60" r="38" fill="#F5EFE0" />
      {/* coconut half */}
      <circle cx="60" cy="60" r="26" fill="#6B4A2B" />
      <circle cx="60" cy="60" r="20" fill="#FFFBF0" />
      <circle cx="60" cy="60" r="14" fill="#F5EFE0" />
      {/* fiber texture */}
      <line x1="60" y1="34" x2="62" y2="40" stroke="#4A2F18" strokeWidth="0.8" />
      <line x1="50" y1="38" x2="52" y2="44" stroke="#4A2F18" strokeWidth="0.8" />
      <line x1="70" y1="38" x2="72" y2="44" stroke="#4A2F18" strokeWidth="0.8" />
      <line x1="60" y1="86" x2="58" y2="80" stroke="#4A2F18" strokeWidth="0.8" />
    </g>
  ),
};

// --- PROTEINS ---
export const ProteinIllustrations: Record<string, React.ReactNode> = {
  low: wrap(
    <g>
      <circle cx="60" cy="60" r="38" fill="#E5EEF3" />
      {/* feather */}
      <path
        d="M 60 30 Q 75 45, 70 75 Q 60 85, 50 75 Q 45 45, 60 30 Z"
        fill="#B8CDD9"
        stroke="#6B8294"
        strokeWidth="1"
      />
      <line x1="60" y1="32" x2="60" y2="85" stroke="#6B8294" strokeWidth="1.5" />
      {[40, 50, 60, 70].map((y) => (
        <React.Fragment key={y}>
          <line x1="60" y1={y} x2="50" y2={y + 3} stroke="#6B8294" strokeWidth="0.6" />
          <line x1="60" y1={y} x2="70" y2={y + 3} stroke="#6B8294" strokeWidth="0.6" />
        </React.Fragment>
      ))}
    </g>
  ),
  high: wrap(
    <g>
      <circle cx="60" cy="60" r="38" fill="#DDE5D3" />
      {/* dumbbell */}
      <rect x="35" y="55" width="50" height="10" rx="3" fill="#6B7F5C" />
      <rect x="25" y="48" width="12" height="24" rx="3" fill="#4A5B3F" />
      <rect x="83" y="48" width="12" height="24" rx="3" fill="#4A5B3F" />
      <rect x="20" y="52" width="6" height="16" rx="2" fill="#4A5B3F" />
      <rect x="94" y="52" width="6" height="16" rx="2" fill="#4A5B3F" />
    </g>
  ),
};

// --- TOPPINGS ---
export const ToppingIllustrations: Record<string, React.ReactNode> = {
  berries: wrap(
    <g>
      <circle cx="60" cy="60" r="38" fill="#F2E5EA" />
      {/* blueberries */}
      <circle cx="45" cy="55" r="10" fill="#3B4E78" />
      <circle cx="42" cy="52" r="3" fill="#5A6B95" opacity="0.7" />
      <circle cx="75" cy="50" r="11" fill="#2F3F66" />
      <circle cx="72" cy="47" r="3.5" fill="#5A6B95" opacity="0.7" />
      {/* raspberry */}
      <g transform="translate(60 75)">
        <circle cx="0" cy="0" r="13" fill="#B8385A" />
        <circle cx="-4" cy="-3" r="3" fill="#D45878" />
        <circle cx="4" cy="-3" r="3" fill="#D45878" />
        <circle cx="0" cy="4" r="3" fill="#D45878" />
        <circle cx="-4" cy="4" r="3" fill="#D45878" />
        <circle cx="4" cy="4" r="3" fill="#D45878" />
      </g>
    </g>
  ),
  granola: wrap(
    <g>
      <circle cx="60" cy="60" r="38" fill="#F0E4CC" />
      {/* clusters */}
      {[
        [42, 52, 9], [60, 48, 10], [78, 54, 9], [50, 70, 8], [72, 72, 9], [60, 80, 7],
      ].map(([x, y, r], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={r} fill="#C9A06A" />
          <circle cx={(x as number) - 2} cy={(y as number) - 1} r={(r as number) * 0.4} fill="#E0BE85" />
        </g>
      ))}
      {/* oat flake */}
      <ellipse cx="50" cy="45" rx="7" ry="3" fill="#F0DBB5" transform="rotate(20 50 45)" />
      <ellipse cx="78" cy="42" rx="7" ry="3" fill="#F0DBB5" transform="rotate(-15 78 42)" />
    </g>
  ),
  strawberry: wrap(
    <g>
      <circle cx="60" cy="60" r="38" fill="#F5DCDC" />
      {/* whole strawberry */}
      <path
        d="M 60 45 Q 80 50, 75 75 Q 60 90, 45 75 Q 40 50, 60 45 Z"
        fill="#D45B5B"
      />
      <path
        d="M 60 45 Q 78 50, 73 73 Q 60 88, 47 73 Q 42 50, 60 45 Z"
        fill="#E07878"
      />
      {/* seeds */}
      {[
        [52, 58], [62, 56], [70, 60], [55, 68], [65, 68], [60, 76], [50, 72], [70, 72],
      ].map(([x, y], i) => (
        <ellipse key={i} cx={x} cy={y} rx="1.2" ry="2" fill="#F8E8C4" />
      ))}
      {/* leaves */}
      <path d="M 50 45 Q 60 35, 70 45 Q 65 50, 60 47 Q 55 50, 50 45 Z" fill="#6B8E4E" />
      <path d="M 58 38 L 58 47" stroke="#4A6B30" strokeWidth="1.5" />
    </g>
  ),
};

// --- FLAVORS ---
export const FlavorIllustrations: Record<string, React.ReactNode> = {
  vanilla: wrap(
    <g>
      <circle cx="60" cy="60" r="38" fill="#FAF0DC" />
      {/* vanilla pod */}
      <ellipse cx="45" cy="65" rx="5" ry="24" fill="#5B3A1F" transform="rotate(-25 45 65)" />
      <ellipse cx="43" cy="63" rx="2.5" ry="22" fill="#3A2412" transform="rotate(-25 43 63)" />
      {/* flower */}
      <g transform="translate(70 55)">
        {[0, 72, 144, 216, 288].map((a) => (
          <ellipse key={a} cx="0" cy="-14" rx="8" ry="15" fill="#FFFBF0" transform={`rotate(${a})`} />
        ))}
        <circle cx="0" cy="0" r="5" fill="#E8C76B" />
      </g>
    </g>
  ),
  lemon: wrap(
    <g>
      <circle cx="60" cy="60" r="38" fill="#FAF1D2" />
      {/* lemon */}
      <ellipse cx="60" cy="60" rx="26" ry="22" fill="#E8C76B" />
      <ellipse cx="60" cy="60" rx="22" ry="18" fill="#F2D87A" />
      {/* segments */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => {
        const rad = (a * Math.PI) / 180;
        return (
          <line
            key={a}
            x1="60"
            y1="60"
            x2={60 + 18 * Math.cos(rad)}
            y2={60 + 14 * Math.sin(rad)}
            stroke="#FFFBF0"
            strokeWidth="1.5"
          />
        );
      })}
      {/* pulp */}
      {[0, 90, 180, 270].map((a) => {
        const rad = (a * Math.PI) / 180;
        const x = 60 + 9 * Math.cos(rad);
        const y = 60 + 7 * Math.sin(rad);
        return <ellipse key={a} cx={x} cy={y} rx="3" ry="5" fill="#FFFBF0" transform={`rotate(${a} ${x} ${y})`} />;
      })}
      {/* leaf */}
      <ellipse cx="42" cy="38" rx="6" ry="11" fill="#6B8E4E" transform="rotate(-45 42 38)" />
    </g>
  ),
  caramel: wrap(
    <g>
      <circle cx="60" cy="60" r="38" fill="#F0DCBC" />
      {/* caramel pool */}
      <ellipse cx="60" cy="70" rx="26" ry="10" fill="#B87A3D" />
      <ellipse cx="60" cy="68" rx="22" ry="7" fill="#D49860" />
      {/* drizzle */}
      <path
        d="M 40 50 Q 50 35, 60 50 Q 70 65, 80 50"
        stroke="#B87A3D"
        strokeWidth="7"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M 40 50 Q 50 35, 60 50 Q 70 65, 80 50"
        stroke="#D49860"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
    </g>
  ),
  pistachio: wrap(
    <g>
      <circle cx="60" cy="60" r="38" fill="#E0E8D0" />
      {/* shell open */}
      <ellipse cx="50" cy="55" rx="14" ry="22" fill="#C9A877" transform="rotate(-25 50 55)" />
      <ellipse cx="48" cy="55" rx="10" ry="18" fill="#8FA86E" transform="rotate(-25 48 55)" />
      <ellipse cx="46" cy="55" rx="7" ry="14" fill="#A8C088" transform="rotate(-25 46 55)" />
      {/* second pistachio */}
      <ellipse cx="72" cy="68" rx="13" ry="20" fill="#C9A877" transform="rotate(25 72 68)" />
      <ellipse cx="73" cy="68" rx="9" ry="16" fill="#7A9560" transform="rotate(25 73 68)" />
    </g>
  ),
  matcha: wrap(
    <g>
      <circle cx="60" cy="60" r="38" fill="#D8E4C4" />
      {/* matcha bowl */}
      <path d="M 30 60 Q 30 85, 60 88 Q 90 85, 90 60 Z" fill="#FFFBF0" stroke="#C9A877" strokeWidth="1.5" />
      <ellipse cx="60" cy="60" rx="30" ry="6" fill="#6B8E4E" />
      <ellipse cx="60" cy="58" rx="26" ry="4" fill="#82A560" />
      {/* foam swirl */}
      <path d="M 45 60 Q 60 55, 75 60" stroke="#A8C078" strokeWidth="2" fill="none" />
      {/* leaf */}
      <ellipse cx="78" cy="42" rx="5" ry="11" fill="#4A6B30" transform="rotate(40 78 42)" />
      <line x1="76" y1="35" x2="80" y2="50" stroke="#4A6B30" strokeWidth="0.8" />
    </g>
  ),
};
