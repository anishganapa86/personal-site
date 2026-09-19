export default function BackgroundVideo() {
  return (
    <>
      <style>{`
        .bm-wall {
          position: fixed; inset: 0; z-index: 0;
          background: #c9c5bd;
        }
        .bm-wall::before {
          content: '';
          position: absolute; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
          opacity: 0.055; pointer-events: none;
        }
      `}</style>
      <div className="bm-wall" />
    </>
  );
}
