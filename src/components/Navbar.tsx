import { useState } from 'react';

const TABS = [
  { label: 'About Me',    href: '#about'     },
  { label: 'Projects',   href: '#projects'  },
  { label: 'Currently',  href: '#experience'},
  { label: 'Essays',     href: '#essays'    },
  { label: 'Interests',  href: '#interests' },
  { label: 'Get in touch', href: '#contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav
        className="fixed left-0 top-0 flex w-full items-center justify-between px-5 py-4 sm:px-8 sm:py-5"
        style={{ zIndex: 10 }}
      >
        {/* empty left slot */}
        <div aria-hidden="true" className="w-8" />

        {/* desktop links */}
        <div className="hidden items-center gap-4 text-[13px] text-black md:flex lg:gap-6 lg:text-[15px]">
          {TABS.map(tab => (
            <a key={tab.href} href={tab.href} className="transition-opacity hover:opacity-60">
              {tab.label}
            </a>
          ))}
        </div>

        {/* hamburger */}
        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen(v => !v)}
          className="flex flex-col gap-[5px] p-2 md:hidden"
        >
          <span className="h-[2px] w-6 bg-black transition-all duration-300"
            style={{ transform: open ? 'translateY(7px) rotate(45deg)' : 'none' }} />
          <span className="h-[2px] w-6 bg-black transition-all duration-300"
            style={{ opacity: open ? 0 : 1 }} />
          <span className="h-[2px] w-6 bg-black transition-all duration-300"
            style={{ transform: open ? 'translateY(-7px) rotate(-45deg)' : 'none' }} />
        </button>
      </nav>

      {/* mobile overlay */}
      <div
        className="fixed inset-0 flex flex-col items-start justify-center gap-5 bg-white/96 px-8 backdrop-blur-sm md:hidden"
        style={{
          zIndex: 9,
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity 0.25s ease',
        }}
      >
        {TABS.map(tab => (
          <a
            key={tab.href}
            href={tab.href}
            className="text-[28px] font-medium text-black"
            onClick={() => setOpen(false)}
          >
            {tab.label}
          </a>
        ))}
      </div>
    </>
  );
}
