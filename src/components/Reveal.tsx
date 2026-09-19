import { useEffect, useRef, useState, type ReactNode } from 'react';

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  blur?: number;
  scale?: number;
  duration?: number;
  className?: string;
};

export default function Reveal({
  children,
  delay = 0,
  y = 40,
  blur = 14,
  scale = 0.97,
  duration = 0.95,
  className = '',
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const [shown, setShown] = useState(reduce);

  useEffect(() => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) { setShown(true); return; }
    const io = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) { setShown(true); io.disconnect(); } },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduce]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? 'translateY(0) scale(1)' : `translateY(${y}px) scale(${scale})`,
        filter: shown ? 'blur(0px)' : `blur(${blur}px)`,
        transition: `opacity ${duration}s ease ${delay}s, transform ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, filter ${duration * 0.85}s ease ${delay}s`,
        willChange: 'opacity, transform, filter',
      }}
    >
      {children}
    </div>
  );
}
