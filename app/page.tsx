'use client';

import { useState } from 'react';
import { BASES, PROTEINS, TOPPINGS, FLAVORS, pickRandomShops, type Option } from '@/lib/catalog';
import { saveConfiguration } from '@/lib/supabase';
import ProductPhoto from '@/components/ProductPhoto';
import OptionPhoto from '@/components/OptionPhoto';
import AlproLogo from '@/components/AlproLogo';

type Selection = {
  base?: string;
  protein?: string;
  toppings: string[];
  flavor?: string;
};

type Screen = 'welcome' | 'base' | 'protein' | 'topping' | 'flavor' | 'result';

const SCREEN_ORDER: Screen[] = ['welcome', 'base', 'protein', 'topping', 'flavor', 'result'];

export default function Home() {
  const [screen, setScreen] = useState<Screen>('welcome');
  const [selection, setSelection] = useState<Selection>({ toppings: [] });
  const [shops, setShops] = useState<ReturnType<typeof pickRandomShops>>([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const currentStep =
    screen === 'base' ? 1
      : screen === 'protein' ? 2
      : screen === 'topping' ? 3
      : screen === 'flavor' ? 4
      : 0;

  const go = (s: Screen) => setScreen(s);

  const handleSingleSelect = (key: 'base' | 'protein' | 'flavor', id: string, next: Screen) => {
    setSelection((prev) => ({ ...prev, [key]: id }));
    setTimeout(() => {
      if (next === 'result') {
        finalize({ ...selection, [key]: id });
      } else {
        go(next);
      }
    }, 350);
  };

  const toggleTopping = (id: string) => {
    setSelection((prev) => {
      const has = prev.toppings.includes(id);
      if (has) return { ...prev, toppings: prev.toppings.filter((t) => t !== id) };
      if (prev.toppings.length >= 3) return prev;
      return { ...prev, toppings: [...prev.toppings, id] };
    });
  };

  async function finalize(final: Selection) {
    setShops(pickRandomShops(3));
    go('result');
    if (final.base && final.protein && final.toppings.length > 0 && final.flavor) {
      setSaving(true);
      await saveConfiguration({
        base: final.base,
        protein: final.protein,
        toppings: final.toppings,
        flavor: final.flavor,
      });
      setSaving(false);
      setSaved(true);
    }
  }

  const reset = () => {
    setSelection({ toppings: [] });
    setShops([]);
    setSaved(false);
    go('welcome');
  };

  // WELCOME
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
            Four bases. Five flavors. Up to three toppings. A protein level you choose.
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

  // RESULT
  if (screen === 'result') {
    const baseLabel = BASES.find((b) => b.id === selection.base)?.label;
    const proteinLabel = PROTEINS.find((p) => p.id === selection.protein)?.label;
    const toppingLabels = selection.toppings
      .map((id) => TOPPINGS.find((t) => t.id === id)?.label)
      .filter(Boolean)
      .join(', ');
    const flavorLabel = FLAVORS.find((f) => f.id === selection.flavor)?.label;

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
            <div className="flex justify-center md:justify-end">
              <div className="relative">
                <div className="absolute -inset-8 bg-sand/40 rounded-full blur-3xl -z-10" />
                <ProductPhoto
                  base={selection.base}
                  protein={selection.protein}
                  toppings={selection.toppings}
                  flavor={selection.flavor}
                  size={460}
                />
              </div>
            </div>

            <div>
              <div className="font-mono text-xs tracking-widest text-sage uppercase mb-3">
                Your creation
              </div>
              <h2 className="font-display text-5xl leading-tight text-navy mb-2">{flavorLabel}</h2>
              <p className="font-display italic text-2xl text-sage mb-8">
                with {toppingLabels.toLowerCase()}, on {baseLabel?.toLowerCase()} base
              </p>

              <div className="grid grid-cols-2 gap-3 mb-10">
                <SpecCard label="Base" value={baseLabel} />
                <SpecCard label="Protein" value={proteinLabel} />
                <SpecCard label="Toppings" value={toppingLabels} />
                <SpecCard label="Flavor" value={flavorLabel} />
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

  // CHOICE SCREENS
  const stepConfig: Record<'base' | 'protein' | 'topping' | 'flavor', { title: string; subtitle: string; options: Option[]; next: Screen }> = {
    base: { title: 'Pick your base.', subtitle: 'Every great bowl starts here.', options: BASES, next: 'protein' },
    protein: { title: 'How much protein?', subtitle: 'Light and everyday, or fuel for the day.', options: PROTEINS, next: 'topping' },
    topping: { title: 'Choose your toppings.', subtitle: 'Pick up to three. The more, the merrier.', options: TOPPINGS, next: 'flavor' },
    flavor: { title: 'Final touch — your flavor.', subtitle: 'The heart of your bowl.', options: FLAVORS, next: 'result' },
  };

  const cur = stepConfig[screen as 'base' | 'protein' | 'topping' | 'flavor'];
  const isTopping = screen === 'topping';

  return (
    <main className="min-h-screen p-6 md:p-12 step-enter relative">
      <BackgroundShapes />
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <AlproLogo size={36} />
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className={`h-1 rounded-full transition-all duration-500 ${
                  n === currentStep ? 'w-10 bg-sage' : n < currentStep ? 'w-6 bg-sage/50' : 'w-6 bg-ink/15'
                }`}
              />
            ))}
            <span className="ml-3 font-mono text-xs tracking-widest text-ink/50">{currentStep}/4</span>
          </div>
        </div>

        <div className="max-w-2xl mb-12">
          <div className="font-mono text-xs tracking-widest text-sage uppercase mb-3">Step {currentStep}</div>
          <h2 className="font-display text-4xl md:text-6xl leading-[1.05] tracking-tight text-navy">{cur.title}</h2>
          <p className="mt-4 text-ink/60 text-lg font-display italic">{cur.subtitle}</p>
          {isTopping && (
            <p className="mt-3 font-mono text-xs tracking-widest text-sage uppercase">
              {selection.toppings.length} / 3 selected
            </p>
          )}
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
            const isSelected = isTopping
              ? selection.toppings.includes(opt.id)
              : (selection as any)[screen] === opt.id;

            return (
              <button
                key={opt.id}
                onClick={() => {
                  if (isTopping) {
                    toggleTopping(opt.id);
                  } else {
                    handleSingleSelect(screen as 'base' | 'protein' | 'flavor', opt.id, cur.next);
                  }
                }}
                className={`choice-card text-left rounded-3xl p-4 md:p-5 border-2 transition-colors duration-300 ${
                  isSelected ? 'border-sage bg-bone' : 'border-ink/8 bg-bone hover:border-sage/50'
                }`}
              >
                <OptionPhoto src={opt.image} alt={opt.label} />
                <div className="flex items-start justify-between mt-4">
                  <div>
                    <div className="font-display text-2xl text-navy">{opt.label}</div>
                    <div className="text-sm text-ink/60 mt-1 leading-snug">{opt.desc}</div>
                  </div>
                  {isTopping && (
                    <div className={`shrink-0 ml-2 mt-1 w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                      isSelected ? 'bg-sage text-bone' : 'border-2 border-ink/20'
                    }`}>
                      {isSelected && (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                          <path d="M5 12l5 5L20 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {isTopping && (
          <div className="mt-10 flex items-center justify-between">
            <button onClick={() => go('protein')} className="font-mono text-xs tracking-widest text-ink/60 hover:text-navy uppercase">
              ← Back
            </button>
            <button
              onClick={() => go('flavor')}
              disabled={selection.toppings.length === 0}
              className={`group inline-flex items-center gap-3 px-7 py-3.5 rounded-full font-body font-medium text-sm tracking-wide transition-all duration-500 ${
                selection.toppings.length === 0
                  ? 'bg-ink/10 text-ink/30 cursor-not-allowed'
                  : 'bg-navy text-cream hover:bg-deepSage'
              }`}
            >
              CONTINUE
              <span className="inline-block transition-transform duration-500 group-hover:translate-x-1">→</span>
            </button>
          </div>
        )}

        {!isTopping && currentStep > 1 && (
          <button
            onClick={() => {
              const idx = SCREEN_ORDER.indexOf(screen);
              go(SCREEN_ORDER[idx - 1]);
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

function SpecCard({ label, value }: { label: string; value?: string }) {
  return (
    <div className="bg-bone rounded-2xl p-4 border border-ink/5">
      <div className="font-mono text-[10px] tracking-widest text-ink/40 uppercase">{label}</div>
      <div className="font-display text-xl text-navy mt-1">{value}</div>
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
