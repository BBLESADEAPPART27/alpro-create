import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Alpro Create — Your Bowl, Your Way',
  description: 'Design your own Alpro plant-based bowl. Pick a base, protein level, topping and flavor — and find it in Barcelona.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
