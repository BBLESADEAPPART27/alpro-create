'use client';

import { useState } from 'react';
import { BASES, PROTEINS, TOPPINGS, FLAVORS, pickRandomShops, type Option } from '@/lib/catalog';
import { saveConfiguration } from '@/lib/supabase';
import OptionPhoto from '@/components/OptionPhoto';
import AlproLogo from '@/components/AlproLogo';

type Selection = {
  base?: string;
  protein?: string;
  flavor?: string;
};

// New flow: welcome → base → protein → flavor → topping (info) → result
type Screen = 'welcome' | 'base' | 'protein' | 'flavor' | 'topping' | 'result';

// All 3 toppings are now included by default for every bowl.
const INCLUDED_TOPPINGS = ['berries', 'granola', 'strawberry'];

export default function Home() {
  const [screen, setScreen] = useState<Screen>('welcome');
  const [selection, setSelection] = useState<Selection>({});
  const [shops, setShops] = useState<ReturnType<typeof pickRandomShops>>([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const currentStep =
    screen === 'base' ? 1
      : screen === 'protein' ? 2
      : screen === 'flavor' ? 3
      : screen === 'topping' ? 4
      : 0;

  const go = (s: Screen) => setScreen(s);

  const handleSingleSelect = (key: 'base' | 'protein' | 'flavor', id: string, next: Screen) => {
    setSelection((prev) => ({ ...prev, [key]: id }));
    setTimeout(() => go(next), 350);
  };

  async function finalize() {
    setShops(pickRandomShops(3));
    go('result');
    if (selection.base && selection.protein && selection.flavor) {
      setSaving(true);
      await saveConfiguration({
        base: selection.base,
        protein: selection.protein,
        toppings: INCLUDED_TOPPINGS,
        flavor: selection.flavor,
      });
      setSaving(false);
      setSaved(true);
    }
  }

  const reset = () => {
    setSelection({});
    setShops([]);
    setSaved(false);
    go('welcome');
  };

  // ---------- WELCOME ----------
  if (screen === 'welcome') {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-6 step-enter relative">
        <BackgroundShapes />
        <div className="relative z-10 max-w-2xl text-center">
          <div className="mb-2 font-mono text-xs tracking-widest text-sage uppercase">
            New · plant-based · made in Belgium
          </div>
          <div className="float-anim my-6 flex justify-center">
            <AlproLogo size={88} />
          </div>
          <h1 className="font-display text-5xl md:text-7xl leading-[0.95] tracking-tight text-navy">
            Create your own<br />
            <span className="italic text-sage">Alpro</span> bowl.
          </h1>
          <p className="mt-6 max-w-md mx-auto text-ink/70 text-base md:text-lg leading-relaxed">
            Four bases. Five flavors. Three signature toppings included.
            Designed by you, ready in Barcelona.
          </p>
          <button
            onClick={() => go('base')}
            className="mt-10 group inline-flex items-center gap-3 bg-navy text-cream px-8 py-4 rounded-full font-body font-medium text-sm tracking-wide hover:bg-deepSage transition-all duration-500"
          >
            START CREATING
            <span className="inline-block transition-transform duration-500 group-hover:translate-x-1">→</span>
          </button>
          <div className="mt-16 text-xs font-mono uppercase tracking-widest text-ink/40">
            A marketing concept · Alpro × Barcelona
          </div>
        </div>
      </main>
    );
  }

  // ---------- RESULT ----------
  if (screen === 'result') {
    const baseOpt = BASES.find((b) => b.id === selection.base);
    const proteinOpt = PROTEINS.find((p) => p.id === selection.protein);
    const flavorOpt = FLAVORS.find((f) => f.id === selection.flavor);
    const productImage = flavorOpt?.productImage || '';

    return (
      <main className="min-h-screen p-6 md:p-12 step-enter relative">
        <BackgroundShapes />
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <AlproLogo size={36} />
            <button onClick={reset} className="font-mono text-xs tracking-widest text-ink/60 hover:text-navy uppercase">
              ← Start over
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Product visual — just the photo, nothing on top */}
            <div className="flex justify-center md:justify-end">
              <div className="relative">
                <div className="absolute -inset-8 bg-sand/40 rounded-full blur-3xl -z-10" />
                <img
                  src={productImage}
                  alt={`Alpro ${flavorOpt?.label} yogurt`}
                  className="w-full max-w-md object-contain"
                  style={{
                    filter: 'drop-shadow(0 25px 35px rgba(40, 40, 30, 0.18))',
                  }}
                />
              </div>
            </div>

            {/* Details */}
            <div>
              <div className="font-mono text-xs tracking-widest text-sage uppercase mb-3">
                Your creation
              </div>
              <h2 className="font-display text-5xl leading-tight text-navy mb-2">
                {flavorOpt?.label}
              </h2>
              <p className="font-display italic text-2xl text-sage mb-8">
                on {baseOpt?.label.toLowerCase()} base · {proteinOpt?.label.toLowerCase()}
              </p>

              {/* Horizontal info strip below visual context */}
              <div className="bg-bone border border-ink/8 rounded-2xl px-5 py-4 mb-8">
                <div className="font-mono text-[10px] tracking-widest text-ink/40 uppercase mb-2">
                  Included in your bowl
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-display text-base text-navy">
                  <span>{baseOpt?.label}</span>
                  <span className="text-ink/20">·</span>
                  <span>{proteinOpt?.label}</span>
                  <span className="text-ink/20">·</span>
                  <span className="italic">Berries</span>
                  <span className="text-ink/20">·</span>
                  <span className="italic">Granola</span>
                  <span className="text-ink/20">·</span>
                  <span className="italic">Strawberry</span>
                </div>
              </div>

              <div className="border-t border-ink/10 pt-8">
                <div className="font-mono text-xs tracking-widest text-sage uppercase mb-4">
                  Available now · Barcelona
                </div>
                <div className="space-y-3">
                  {shops.map((s, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 bg-bone rounded-2xl border border-ink/5">
                      <div className="font-display text-2xl text-sage italic">0{i + 1}</div>
                      <div className="flex-1">
                        <div className="font-medium text-navy">{s.name}</div>
                        <div className="text-sm text-ink/60">{s.address}</div>
                        <div className="text-xs font-mono uppercase tracking-wider text-ink/40 mt-1">{s.neighborhood}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 text-xs font-mono uppercase tracking-widest text-ink/40">
                {saving && '· Saving your configuration ·'}
                {saved && '· Configuration saved ·'}
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // ---------- TOPPING (info-only screen, step 4) ----------
  if (screen === 'topping') {
    const includedToppings = TOPPINGS.filter((t) => INCLUDED_TOPPINGS.includes(t.id));
    return (
      <main className="min-h-screen p-6 md:p-12 step-enter relative">
        <BackgroundShapes />
        <div className="relative z-10 max-w-6xl mx-auto">
          <Header step={currentStep} />

          <div className="max-w-2xl mb-12">
            <div className="font-mono text-xs tracking-widest text-sage uppercase mb-3">Step 4</div>
            <h2 className="font-display text-4xl md:text-6xl leading-[1.05] tracking-tight text-navy">
              Here are your 3 toppings included.
            </h2>
            <p className="mt-4 text-ink/60 text-lg font-display italic">
              Every Alpro bowl comes loaded — no choices to make.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {includedToppings.map((opt) => (
              <div
                key={opt.id}
                className="rounded-3xl p-4 md:p-5 border-2 border-sage bg-bone"
              >
                <OptionPhoto src={opt.image} alt={opt.label} />
                <div className="flex items-start justify-between mt-4">
                  <div>
                    <div className="font-display text-2xl text-navy">{opt.label}</div>
                    <div className="text-sm text-ink/60 mt-1 leading-snug">{opt.desc}</div>
                  </div>
                  <div className="shrink-0 ml-2 mt-1 w-6 h-6 rounded-full bg-sage text-bone flex items-center justify-center">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12l5 5L20 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex items-center justify-between">
            <button onClick={() => go('flavor')} className="font-mono text-xs tracking-widest text-ink/60 hover:text-navy uppercase">
              ← Back
            </button>
            <button
              onClick={finalize}
              className="group inline-flex items-center gap-3 bg-navy text-cream px-7 py-3.5 rounded-full font-body font-medium text-sm tracking-wide hover:bg-deepSage transition-all duration-500"
            >
              SEE MY BOWL
              <span className="inline-block transition-transform duration-500 group-hover:translate-x-1">→</span>
            </button>
          </div>
        </div>
      </main>
    );
  }

  // ---------- CHOICE SCREENS (base / protein / flavor) ----------
  const stepConfig: Record<'base' | 'protein' | 'flavor', { title: string; subtitle: string; options: Option[]; next: Screen }> = {
    base: { title: 'Pick your base.', subtitle: 'Every great bowl starts here.', options: BASES, next: 'protein' },
    protein: { title: 'How much protein?', subtitle: 'Light and everyday, or fuel for the day.', options: PROTEINS, next: 'flavor' },
    flavor: { title: 'Pick your flavor.', subtitle: 'The heart of your bowl.', options: FLAVORS, next: 'topping' },
  };

  const cur = stepConfig[screen as 'base' | 'protein' | 'flavor'];

  return (
    <main className="min-h-screen p-6 md:p-12 step-enter relative">
      <BackgroundShapes />
      <div className="relative z-10 max-w-6xl mx-auto">
        <Header step={currentStep} />

        <div className="max-w-2xl mb-12">
          <div className="font-mono text-xs tracking-widest text-sage uppercase mb-3">Step {currentStep}</div>
          <h2 className="font-display text-4xl md:text-6xl leading-[1.05] tracking-tight text-navy">{cur.title}</h2>
          <p className="mt-4 text-ink/60 text-lg font-display italic">{cur.subtitle}</p>
        </div>

        <div
          className={`grid gap-4 md:gap-6 ${
            cur.options.length === 2 ? 'grid-cols-1 md:grid-cols-2 max-w-3xl'
            : cur.options.length === 3 ? 'grid-cols-1 md:grid-cols-3'
            : cur.options.length === 4 ? 'grid-cols-2 md:grid-cols-4'
            : 'grid-cols-2 md:grid-cols-5'
          }`}
        >
          {cur.options.map((opt) => {
            const isSelected = (selection as any)[screen] === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => handleSingleSelect(screen as 'base' | 'protein' | 'flavor', opt.id, cur.next)}
                className={`choice-card text-left rounded-3xl p-4 md:p-5 border-2 transition-colors duration-300 ${
                  isSelected ? 'border-sage bg-bone' : 'border-ink/8 bg-bone hover:border-sage/50'
                }`}
              >
                <OptionPhoto src={opt.image} alt={opt.label} />
                <div className="mt-4">
                  <div className="font-display text-2xl text-navy">{opt.label}</div>
                  <div className="text-sm text-ink/60 mt-1 leading-snug">{opt.desc}</div>
                </div>
              </button>
            );
          })}
        </div>

        {currentStep > 1 && (
          <button
            onClick={() => {
              if (screen === 'protein') go('base');
              else if (screen === 'flavor') go('protein');
            }}
            className="mt-10 font-mono text-xs tracking-widest text-ink/60 hover:text-navy uppercase"
          >
            ← Back
          </button>
        )}
      </div>
    </main>
  );
}

function Header({ step }: { step: number }) {
  return (
    <div className="flex justify-between items-center mb-12">
      <AlproLogo size={36} />
      <div className="flex items-center gap-2">
        {[1, 2, 3, 4].map((n) => (
          <div
            key={n}
            className={`h-1 rounded-full transition-all duration-500 ${
              n === step ? 'w-10 bg-sage' : n < step ? 'w-6 bg-sage/50' : 'w-6 bg-ink/15'
            }`}
          />
        ))}
        <span className="ml-3 font-mono text-xs tracking-widest text-ink/50">{step}/4</span>
      </div>
    </div>
  );
}

function BackgroundShapes() {
  return (
    <>
      <div className="fixed top-[-100px] right-[-100px] w-[400px] h-[400px] rounded-full bg-matcha/20 blur-3xl -z-10" />
      <div className="fixed bottom-[-150px] left-[-100px] w-[500px] h-[500px] rounded-full bg-sky/20 blur-3xl -z-10" />
    </>
  );
}
