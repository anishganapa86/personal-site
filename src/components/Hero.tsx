import { useEffect, useState } from 'react';
import { GithubIcon, LinkedinIcon, ArrowUpRightIcon } from './icons';
import { GITHUB, LINKEDIN } from '../links';

const NAME = 'Anish';
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$&';
const TYPEWRITER_TEXT =
  'Glad you stopped in. Good taste tends to find us. Now, what are we building?';

function useTypewriter(text: string, speed = 38, startDelay = 800) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  useEffect(() => {
    setDisplayed(''); setDone(false);
    let i = 0; let iv: ReturnType<typeof setInterval>;
    const t = setTimeout(() => {
      iv = setInterval(() => {
        i++; setDisplayed(text.slice(0, i));
        if (i >= text.length) { clearInterval(iv); setDone(true); }
      }, speed);
    }, startDelay);
    return () => { clearTimeout(t); clearInterval(iv); };
  }, [text, speed, startDelay]);
  return { displayed, done };
}

// Each letter spins through random chars then snaps to final
function SlotLetter({ final, delay }: { final: string; delay: number }) {
  const [display, setDisplay] = useState(CHARS[Math.floor(Math.random() * CHARS.length)]);
  const [landed, setLanded] = useState(false);

  useEffect(() => {
    setLanded(false);
    const SPIN = 20;
    const SETTLE = 8;
    const FRAME_MS = 48;
    let frame = 0;
    let lastTime = 0;
    let raf: number;

    const tick = (now: number) => {
      if (now - lastTime < FRAME_MS) { raf = requestAnimationFrame(tick); return; }
      lastTime = now;
      if (frame < SPIN) {
        setDisplay(CHARS[Math.floor(Math.random() * CHARS.length)]);
      } else if (frame < SPIN + SETTLE) {
        const p = (frame - SPIN) / SETTLE;
        setDisplay(Math.random() < p * p ? final : CHARS[Math.floor(Math.random() * CHARS.length)]);
      } else {
        setDisplay(final);
        setLanded(true);
        return;
      }
      frame++;
      raf = requestAnimationFrame(tick);
    };

    const t = setTimeout(() => { raf = requestAnimationFrame(tick); }, delay);
    return () => { clearTimeout(t); cancelAnimationFrame(raf); };
  }, [final, delay]);

  return (
    <span
      style={{
        display: 'inline-block',
        color: landed ? 'black' : 'rgba(0,0,0,0.38)',
        transition: 'color 0.2s ease',
        fontVariantNumeric: 'tabular-nums',
      }}
    >
      {display}
    </span>
  );
}

const pill =
  'inline-flex items-center gap-2 rounded-full border border-black/20 bg-white/70 px-4 py-2 text-[13px] text-black backdrop-blur-sm transition-colors hover:bg-black hover:text-white active:bg-black active:text-white';

export default function Hero() {
  const { displayed, done } = useTypewriter(TYPEWRITER_TEXT);
  const [showSub, setShowSub] = useState(false);

  useEffect(() => {
    // last letter lands at ~180ms×4 stagger + ~1.4s spin = ~2.1s
    const t = setTimeout(() => setShowSub(true), 2200);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      className="relative flex h-[100svh] flex-col justify-end overflow-hidden px-5 pb-10 sm:px-8 md:justify-center md:pb-0 md:px-10"
      style={{ zIndex: 1 }}
    >
      <div className="relative z-10 max-w-[60%] sm:max-w-xl">

        {/* eyebrow */}
        <p
          className="mb-3 text-black/50"
          style={{
            fontSize: 'clamp(11px, 1.3vw, 13px)',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            animation: 'fadeUp 0.6s ease both',
            animationDelay: '0.1s',
          }}
        >
          Researcher / Dev
        </p>

        {/* slot machine name — left aligned, naturally sized */}
        <h1
          className="mb-5 leading-none"
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(80px, 13vw, 160px)',
            fontWeight: 500,
            letterSpacing: '-0.02em',
            lineHeight: 0.95,
          }}
        >
          {NAME.split('').map((char, i) => (
            <SlotLetter key={i} final={char} delay={80 + i * 150} />
          ))}
        </h1>

        {/* sub content */}
        <div
          style={{
            opacity: showSub ? 1 : 0,
            transform: showSub ? 'translateY(0)' : 'translateY(12px)',
            transition: 'opacity 0.65s ease, transform 0.65s cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          <p
            className="mb-6 text-black"
            style={{ fontSize: 'clamp(15px, 2vw, 20px)', lineHeight: 1.45, maxWidth: '34ch' }}
          >
            {displayed}
            {!done && (
              <span
                className="ml-[2px] inline-block h-[1.1em] w-[2px] bg-black align-middle"
                style={{ animation: 'blink 1s step-end infinite' }}
              />
            )}
          </p>

          <div className="flex flex-wrap gap-2">
            <a href={GITHUB} target="_blank" rel="noopener noreferrer" className={pill}>
              <GithubIcon size={14} />GitHub
            </a>
            <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className={pill}>
              <LinkedinIcon size={14} />LinkedIn
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 rounded-full bg-black px-4 py-2 text-[13px] text-white hover:opacity-80 active:opacity-70"
            >
              Get in touch <ArrowUpRightIcon size={12} />
            </a>
          </div>
        </div>
      </div>

      {/* scroll indicator */}
      <div
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
        style={{ opacity: showSub ? 1 : 0, transition: 'opacity 0.6s ease 0.4s' }}
      >
        <span className="text-[10px] uppercase tracking-[0.25em] text-black/40">Scroll</span>
        <div className="relative h-10 w-px overflow-hidden bg-black/15">
          <span
            className="absolute left-0 top-0 block h-1/2 w-px bg-black/55"
            style={{ animation: 'scrollDown 1.6s ease-in-out infinite' }}
          />
        </div>
      </div>
    </section>
  );
}
