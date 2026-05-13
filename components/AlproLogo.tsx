export default function AlproLogo({ size = 60, color = '#1B2A4A' }: { size?: number; color?: string }) {
  return (
    <svg viewBox="0 0 180 70" width={size * 2.5} height={size} xmlns="http://www.w3.org/2000/svg">
      <text
        x="90"
        y="55"
        textAnchor="middle"
        fill={color}
        fontSize="64"
        fontWeight="800"
        fontFamily="DM Sans, sans-serif"
        fontStyle="italic"
        letterSpacing="-3"
      >
        alpro
      </text>
      {/* leaf above the 'p' */}
      <path d="M 100 12 Q 108 4, 122 9 Q 116 19, 100 12 Z" fill="#6B8E4E" />
      <text x="153" y="38" fill={color} fontSize="12" fontFamily="DM Sans, sans-serif">®</text>
    </svg>
  );
}
