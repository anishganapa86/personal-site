import { useEffect, useRef, useState, useCallback } from 'react';
import Reveal from './Reveal';

type Card = {
  id: string;
  num: string;
  img: string;
  alt: string;
  label: string;
  sublabel: string;
  aspect: string;
};

const COL_LEFT: Card[] = [
  { id:'c1', num:'01', img:'/interest-lego.png',   alt:'Lego collection',       label:'Lego',        sublabel:'Building & collecting',      aspect:'4/5' },
  { id:'c3', num:'03', img:'/interest-pc.png',      alt:'PC setup',              label:'Tech / PC',   sublabel:'Where everything gets built', aspect:'1/1' },
  { id:'c5', num:'05', img:'/interest-unlv.png',    alt:'UNLV campus',           label:'Photography', sublabel:'Documenting places',         aspect:'3/4' },
];
const COL_RIGHT: Card[] = [
  { id:'c2', num:'02', img:'/interest-noodles.png', alt:'Hotpot noodle dish',    label:'Noodles',     sublabel:'Trying every dish',          aspect:'1/1' },
  { id:'c4', num:'04', img:'/interest-gaming.png',  alt:'Elden Ring screenshot', label:'Video games', sublabel:'Elden Ring & more',          aspect:'4/5' },
  { id:'c6', num:'06', img:'/interest-viola.png',   alt:'Playing viola',         label:'Music',       sublabel:'Viola — on break for now',   aspect:'3/2' },
];

type LBState = { src: string; alt: string; label: string; sublabel: string } | null;

function Lightbox({ data, onClose }: { data: LBState; onClose: () => void }) {
  useEffect(() => {
    if (!data) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', handler); document.body.style.overflow = ''; };
  }, [data, onClose]);

  if (!data) return null;

  return (
    <div
      className="fixed inset-0 z-[9000] flex items-center justify-center p-8"
      style={{ background: 'rgba(0,0,0,0.82)', backdropFilter: 'blur(10px)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="relative w-full max-w-3xl">
        {data.src ? (
          <img src={data.src} alt={data.alt} className="block w-full rounded-2xl object-cover" style={{ maxHeight: '80vh' }} />
        ) : (
          <div className="flex h-64 w-full items-center justify-center rounded-2xl bg-white/5 border border-white/10">
            <p className="text-white/40 text-sm">Image coming soon</p>
          </div>
        )}
        <button
          onClick={onClose}
          className="absolute -right-3 -top-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white text-black/60 shadow-lg transition-colors hover:text-black"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
        </button>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-[14px] text-white/90 font-medium">{data.label}</span>
          <span className="text-[11px] uppercase tracking-[0.14em] text-white/45">{data.sublabel}</span>
        </div>
      </div>
    </div>
  );
}

function PCard({ card, onOpen }: { card: Card; onOpen: (c: Card) => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="group relative w-full max-w-[320px] cursor-pointer overflow-hidden rounded-2xl border border-black/10"
      style={{
        aspectRatio: card.aspect,
        background: card.img ? '#f0efec' : '#f5f3ee',
        borderColor: hovered ? 'rgba(0,0,0,0.25)' : 'rgba(0,0,0,0.10)',
        transform: hovered ? 'scale(1.015)' : 'scale(1)',
        boxShadow: hovered ? '0 20px 60px rgba(0,0,0,0.13)' : '0 2px 12px rgba(0,0,0,0.05)',
        transition: 'transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s ease, border-color 0.3s ease',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onOpen(card)}
    >
      {card.img ? (
        <img
          src={card.img} alt={card.alt} loading="lazy"
          className="h-full w-full object-cover"
          style={{ transform: hovered ? 'scale(1.06)' : 'scale(1)', transition: 'transform 0.7s cubic-bezier(0.22,1,0.36,1)' }}
        />
      ) : (
        /* Anime placeholder — geometric pattern */
        <div className="flex h-full w-full flex-col items-center justify-center gap-3 p-6">
          <div className="relative flex items-center justify-center">
            {[0,60,120,180,240,300].map(deg => (
              <div key={deg} className="absolute h-[2px] w-10 rounded-full bg-black/12"
                style={{ transform: `rotate(${deg}deg)` }} />
            ))}
            <div className="h-8 w-8 rounded-full border-2 border-black/15 bg-white/60" />
          </div>
          <span className="text-[11px] uppercase tracking-[0.2em] text-black/28">Anime</span>
          <span className="text-center text-[12px] leading-relaxed text-black/38">
            Mob Psycho 100, Ping Pong the Animation, and more
          </span>
        </div>
      )}

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-multiply"
        style={{ backgroundImage: 'radial-gradient(circle,rgba(0,0,0,0.9) 1px,transparent 1px)', backgroundSize: '4px 4px' }}
      />
      <span className="absolute right-3 top-3 text-[10px] tabular-nums text-black/20">{card.num}</span>

      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          background: 'rgba(250,249,247,0.70)',
          backdropFilter: 'blur(12px)',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      >
        <div
          className="flex h-11 w-11 items-center justify-center rounded-full border border-black/15 bg-white/80 text-black/60 shadow-sm"
          style={{ transform: hovered ? 'scale(1)' : 'scale(0.8)', transition: 'transform 0.3s cubic-bezier(0.22,1,0.36,1)' }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
            <path d="M2 8h12M8 2v12"/>
          </svg>
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 p-3"
        style={{ opacity: hovered ? 1 : 0, transition: 'opacity 0.3s ease' }}
      >
        <span className="rounded-full border border-black/12 bg-white/80 px-3 py-1.5 text-[11px] uppercase tracking-[0.15em] text-black/65 backdrop-blur-sm">
          {card.label}
        </span>
      </div>
    </div>
  );
}

function ParallaxCol({ cards, yOffset }: { cards: Card[]; yOffset: number }) {
  const [lb, setLb] = useState<LBState>(null);
  const close = useCallback(() => setLb(null), []);

  return (
    <>
      <div className="flex flex-col gap-5"
        style={{ transform: `translateY(${yOffset}px)`, willChange: 'transform' }}>
        {cards.map(card => (
          <PCard key={card.id} card={card}
            onOpen={c => setLb({ src: c.img, alt: c.alt, label: c.label, sublabel: c.sublabel })} />
        ))}
      </div>
      <Lightbox data={lb} onClose={close} />
    </>
  );
}

function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }

export default function Interests() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [yLeft, setYLeft]   = useState(0);
  const [yRight, setYRight] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect   = el.getBoundingClientRect();
      const sectionH = el.offsetHeight;
      const viewH  = window.innerHeight;
      const scrolled = -rect.top;
      const total  = sectionH - viewH;
      const p      = Math.max(0, Math.min(1, scrolled / total));
      const travel = viewH * 0.5;
      setYLeft(  lerp( travel * 0.35, -travel * 0.65, p));
      setYRight( lerp(-travel * 0.25,  travel * 0.55, p));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section
      id="interests"
      ref={sectionRef}
      className="relative border-t border-black/10 bg-white"
      style={{ minHeight: '280vh' }}
    >
      {/* Pinned center — no "scroll to explore" */}
      <div className="pointer-events-none sticky top-0 z-10 flex h-screen items-center justify-center">
        <div className="pointer-events-auto text-center px-6">
          <Reveal y={12} blur={6} scale={1} duration={0.7}>
            <div className="mb-5 flex items-center justify-center gap-3 text-[11px] uppercase tracking-[0.25em] text-black/38">
              <div className="h-px w-7 bg-black/15" />
              <span>Interests</span>
              <div className="h-px w-7 bg-black/15" />
            </div>
          </Reveal>
          <Reveal delay={0.1} y={50} blur={18} scale={0.95} duration={1.1}>
            <h2 className="text-black"
              style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(38px, 8vw, 72px)', lineHeight: 1.0, letterSpacing: '-0.03em' }}>
              Outside the lab
            </h2>
          </Reveal>
          <Reveal delay={0.2} y={24} blur={8} duration={0.85}>
            <p className="mx-auto mt-4 text-black/48"
              style={{ fontSize: 'clamp(14px, 1.8vw, 17px)', lineHeight: 1.65, maxWidth: '34ch' }}>
              Lego, noodles, building PCs, video games, photography, music, and anime. Viola on hold for now.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Parallax columns — pushed down so they start well below the hero fold */}
      <div
        className="pointer-events-none absolute inset-x-0 z-20 flex justify-center"
        style={{ top: '50vh' }}
      >
        <div className="pointer-events-auto grid w-full max-w-5xl grid-cols-2 gap-6 px-5 sm:px-8 md:gap-12 md:px-10">
          <div className="flex justify-end">
            <ParallaxCol cards={COL_LEFT}  yOffset={yLeft}  />
          </div>
          <div className="flex justify-start">
            <ParallaxCol cards={COL_RIGHT} yOffset={yRight} />
          </div>
        </div>
      </div>
    </section>
  );
}
