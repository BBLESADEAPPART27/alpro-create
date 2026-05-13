// Central catalog for the Alpro configurator.
// Image URLs come from Unsplash — these are highly popular, stable photos
// chosen for their relevance and longevity.

export type Option = {
  id: string;
  label: string;
  desc: string;
  color: string;
  image: string;
};

// Helper: build an Unsplash CDN URL from a known photo ID with consistent sizing.
const u = (id: string) =>
  `https://images.unsplash.com/${id}?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80`;

export const BASES: Option[] = [
  {
    id: 'soy',
    label: 'Soya',
    desc: 'Creamy classic. Smooth and balanced.',
    color: '#F2EAD8',
    // Soy beans (local image)
    image: '/options/soy.png',
  },
  {
    id: 'oat',
    label: 'Oat',
    desc: 'Naturally sweet, velvety texture.',
    color: '#EDE0C4',
    // Oat grain bowl
    image: u('photo-1614961233913-a5113a4a34ed'),
  },
  {
    id: 'almond',
    label: 'Almond',
    desc: 'Light, nutty, refreshing.',
    color: '#E8DCC4',
    // Almonds
    image: u('photo-1508061253366-f7da158b6d46'),
  },
  {
    id: 'coconut',
    label: 'Coconut',
    desc: 'Tropical, rich and rounded.',
    color: '#F5EFE0',
    // Coconut (local image)
    image: '/options/coconut.png',
  },
];

export const PROTEINS: Option[] = [
  {
    id: 'low',
    label: 'Low Protein',
    desc: 'Light and everyday. 5g per serving.',
    color: '#B8CDD9',
    // Light meal / leaf
    image: u('photo-1490818387583-1baba5e638af'),
  },
  {
    id: 'high',
    label: 'High Protein',
    desc: 'Boosted for performance. 15g per serving.',
    color: '#6B7F5C',
    // Fitness / workout
    image: u('photo-1517836357463-d25dfeac3438'),
  },
];

export const TOPPINGS: Option[] = [
  {
    id: 'berries',
    label: 'Berries',
    desc: 'Blueberries & raspberries.',
    color: '#7B3F5F',
    // Mixed berries
    image: u('photo-1498557850523-fd3d118b962e'),
  },
  {
    id: 'granola',
    label: 'Granola',
    desc: 'Crunchy oats and seeds.',
    color: '#B68D5B',
    // Granola (local image)
    image: '/options/granola.png',
  },
  {
    id: 'strawberry',
    label: 'Strawberry',
    desc: 'Fresh sliced strawberries.',
    color: '#D45B5B',
    // Strawberries
    image: u('photo-1464965911861-746a04b4bca6'),
  },
];

export const FLAVORS: Option[] = [
  {
    id: 'vanilla',
    label: 'Vanilla',
    desc: 'Madagascar bourbon.',
    color: '#E8946B',
    // Vanilla beans (local image)
    image: '/options/vanilla.png',
  },
  {
    id: 'lemon',
    label: 'Lemon',
    desc: 'Bright and zesty.',
    color: '#E8C76B',
    // Lemons
    image: u('photo-1590502593747-42a996133562'),
  },
  {
    id: 'caramel',
    label: 'Caramel',
    desc: 'Salted, golden, indulgent.',
    color: '#B87A3D',
    // Caramel sauce (local image)
    image: '/options/caramel.png',
  },
  {
    id: 'pistachio',
    label: 'Pistachio',
    desc: 'Mediterranean nut, refined.',
    color: '#8FA86E',
    // Pistachios (local image)
    image: '/options/pistachio.png',
  },
  {
    id: 'matcha',
    label: 'Matcha',
    desc: 'Ceremonial grade green tea.',
    color: '#6B8E4E',
    // Matcha powder / drink
    image: u('photo-1536256263959-770b48d82b0a'),
  },
];

export const BARCELONA_SHOPS = [
  { name: 'Veritas — Diagonal', address: "Av. Diagonal 469, 08036 Barcelona", neighborhood: 'Eixample' },
  { name: 'Veritas — Gràcia', address: "Travessera de Gràcia 145, 08012 Barcelona", neighborhood: 'Gràcia' },
  { name: 'Ametller Origen — Passeig de Gràcia', address: "Passeig de Gràcia 73, 08008 Barcelona", neighborhood: 'Eixample' },
  { name: 'Ametller Origen — Born', address: "Carrer del Rec 30, 08003 Barcelona", neighborhood: 'El Born' },
  { name: 'Carrefour Market — Ronda Sant Antoni', address: "Ronda de Sant Antoni 39, 08011 Barcelona", neighborhood: 'Sant Antoni' },
  { name: 'Carrefour Express — Sants', address: "Carrer de Sants 79, 08014 Barcelona", neighborhood: 'Sants' },
  { name: 'Bonpreu — Sant Gervasi', address: "Carrer de Balmes 245, 08006 Barcelona", neighborhood: 'Sant Gervasi' },
  { name: 'Mercadona — Poblenou', address: "Av. Diagonal 211, 08018 Barcelona", neighborhood: 'Poblenou' },
  { name: 'Condis — Sagrada Família', address: "Carrer de Provença 435, 08025 Barcelona", neighborhood: 'Sagrada Família' },
  { name: 'La Sirena — Eixample', address: "Carrer d'Aragó 268, 08007 Barcelona", neighborhood: 'Eixample' },
  { name: 'BonÀrea — Gòtic', address: "Carrer de la Boqueria 22, 08002 Barcelona", neighborhood: 'Gòtic' },
  { name: 'Veganity Store', address: "Carrer de Verdi 14, 08012 Barcelona", neighborhood: 'Gràcia' },
];

export function pickRandomShops(n = 3) {
  const pool = [...BARCELONA_SHOPS];
  const out = [];
  for (let i = 0; i < n && pool.length > 0; i++) {
    const idx = Math.floor(Math.random() * pool.length);
    out.push(pool.splice(idx, 1)[0]);
  }
  return out;
}
