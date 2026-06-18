import type { ReactNode } from 'react';
import Reveal from './Reveal';
import FeaturedProjects from './FeaturedProjects';
import { GithubIcon, LinkedinIcon } from './icons';
import { GITHUB, LINKEDIN } from '../links';

const bodyStyle = {
  fontSize: 'clamp(16px, 2.2vw, 20px)',
  lineHeight: 1.65,
  maxWidth: '60ch',
} as const;

/* ── SVG icons ── */
function ChipIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="7" y="7" width="10" height="10" rx="1" />
      <path d="M9 7V4M12 7V4M15 7V4M9 17v3M12 17v3M15 17v3M7 9H4M7 12H4M7 15H4M17 9h3M17 12h3M17 15h3" />
    </svg>
  );
}
function RobotIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="10" rx="2" />
      <rect x="9" y="7" width="6" height="4" rx="1" />
      <path d="M12 7V4M9 15h.01M15 15h.01" />
      <circle cx="12" cy="3" r="1" />
    </svg>
  );
}
function MicroscopeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 18h8M3 21h18M14 21v-4" />
      <path d="M14 7v4a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7" />
      <path d="M9 3h5M9 3a2 2 0 0 0-2 2v2h7V5a2 2 0 0 0-2-2z" />
      <path d="M9 7V3" />
    </svg>
  );
}
function MonitorIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  );
}

const ABOUT_TAGS = [
  { label: 'Genomics',      Icon: ChipIcon      },
  { label: 'ML / AI',       Icon: RobotIcon     },
  { label: 'Biofilm Assays',Icon: MicroscopeIcon},
  { label: 'Computational Biology', Icon: MonitorIcon },
];

function TagPill({ Icon, label, delay }: { Icon: () => JSX.Element; label: string; delay: number }) {
  return (
    <Reveal delay={delay} y={20} blur={8} scale={0.95} duration={0.7}>
      <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2.5 text-[13px] text-black shadow-[0_2px_16px_rgba(0,0,0,0.07)] transition-all duration-300 hover:-translate-y-0.5 hover:border-black/25 hover:shadow-[0_6px_22px_rgba(0,0,0,0.11)]">
        <span className="text-black/45"><Icon /></span>
        {label}
      </span>
    </Reveal>
  );
}

function Section({ id, index, label, children }: { id: string; index: string; label: string; children: ReactNode }) {
  return (
    <section id={id} className={`flex scroll-mt-24 items-center border-t border-black/10 bg-white px-5 sm:px-8 md:px-10 ${id === 'contact' ? 'min-h-[55vh]' : 'min-h-screen'}`}>
      <div className="mx-auto w-full max-w-5xl py-24">
        <Reveal y={12} blur={6} scale={1} duration={0.7}>
          <div className="mb-8 flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-black/38">
            <span className="tabular-nums font-medium">{index}</span>
            <span className="h-px w-10 bg-black/15" />
            <span>{label}</span>
          </div>
        </Reveal>
        {children}
      </div>
    </section>
  );
}

function Heading({ children, delay = 0.08 }: { children: ReactNode; delay?: number }) {
  return (
    <Reveal delay={delay} y={56} blur={18} scale={0.95} duration={1.1}>
      <h2 className="text-black" style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(34px, 7vw, 60px)', lineHeight: 1.0, letterSpacing: '-0.025em' }}>
        {children}
      </h2>
    </Reveal>
  );
}

/* ── RAPID update card ── */
function UpdateCard({ title, tag, body, status }: { title: string; tag: string; body: string; status: string }) {
  return (
    <Reveal delay={0.22} y={36} blur={12} duration={0.9}>
      <div className="rounded-2xl border border-black/10 bg-white p-7 transition-all duration-300 hover:border-black/22 hover:shadow-[0_12px_40px_rgba(0,0,0,0.07)]">
        <div className="mb-4 flex items-center gap-3">
          <span className="rounded-full border border-black/10 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-black/50">
            {tag}
          </span>
          <span className="flex items-center gap-1.5 text-[11px] text-black/35">
            <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-black/40" />
            {status}
          </span>
        </div>
        <h3 className="text-black" style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', letterSpacing: '-0.01em' }}>
          {title}
        </h3>
        <p className="mt-4 text-[14px] leading-relaxed text-black/60">{body}</p>
      </div>
    </Reveal>
  );
}

export default function Content() {
  return (
    <div className="relative" style={{ zIndex: 2 }}>

      {/* 01 - ABOUT */}
      <Section id="about" index="01" label="About">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_auto]">
          <div>
            <Heading>About Me</Heading>
            <Reveal delay={0.2} y={36} blur={12} duration={1.0}>
              <p className="mt-8 text-black" style={{ fontSize: 'clamp(21px, 3.4vw, 32px)', lineHeight: 1.25, fontWeight: 400, maxWidth: '22ch' }}>
                I'm a high schooler working where microbiology meets machine learning.
              </p>
            </Reveal>
            <Reveal delay={0.32} y={28} blur={10}>
              <p className="mt-6 text-black/65" style={bodyStyle}>
                My research is in molecular cell biology - building tools to make sense of
                complex genomic data, and running biofilm assays built for embedded systems.
                Outside the lab, I build hardware and software at the intersection of health
                and machine learning.
              </p>
            </Reveal>
            <Reveal delay={0.44} y={22} blur={8} duration={0.85}>
              <p className="mt-5 text-black/42" style={bodyStyle}>
                Currently a researcher at UC Merced, previously at the University of Nevada, Las Vegas.
                Based in Henderson, Nevada.
              </p>
            </Reveal>
          </div>

          <div className="hidden flex-col justify-center gap-3 md:flex">
            {ABOUT_TAGS.map((t, i) => (
              <TagPill key={t.label} Icon={t.Icon} label={t.label} delay={0.25 + i * 0.1} />
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-2 md:hidden">
          {ABOUT_TAGS.map((t, i) => (
            <TagPill key={t.label} Icon={t.Icon} label={t.label} delay={0.3 + i * 0.07} />
          ))}
        </div>
      </Section>

      {/* 02 - PROJECTS */}
      <Section id="projects" index="02" label="Selected Work">
        <Heading>Featured Projects</Heading>
        <Reveal delay={0.18} y={24} blur={8} duration={0.8}>
          <p className="mt-5 text-black/55" style={bodyStyle}>
            A few of the things I've been building and researching.
          </p>
        </Reveal>
        <FeaturedProjects />
      </Section>

      {/* 03 - CURRENTLY / UPDATES */}
      <Section id="experience" index="03" label="Currently">
        <Heading>What I'm Working On</Heading>
        <Reveal delay={0.18} y={24} blur={8} duration={0.8}>
          <p className="mt-5 text-black/55" style={bodyStyle}>
            Things I'm actively building, researching, or thinking about.
          </p>
        </Reveal>

        <div className="mt-10">
          <UpdateCard
            tag="Biosensor · Hardware"
            title="RAPID"
            status="In progress"
            body="A portable biosensor project targeting early detection in resource-limited settings. More details to follow once the work is further along."
          />
        </div>
      </Section>

      {/* 06 - CONTACT */}
      <Section id="contact" index="04" label="Contact">
        <Heading>Get in touch</Heading>
        <Reveal delay={0.2} y={28} blur={10}>
          <p className="mt-6 text-black/65" style={bodyStyle}>
            Reach me directly — I'm always open to research conversations, collaborations, or just a good email.
          </p>
        </Reveal>
        <Reveal delay={0.32} y={20} blur={8} duration={0.8}>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="mailto:anish.ganapa@gmail.com"
              className="inline-flex items-center gap-2 rounded-full bg-black px-5 py-2.5 text-[15px] text-white transition-all duration-200 hover:-translate-y-0.5 hover:opacity-80 hover:shadow-lg">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
              anish.ganapa@gmail.com
            </a>
          </div>
        </Reveal>
        <Reveal delay={0.42} y={18} blur={7} duration={0.8}>
          <div className="mt-3 flex flex-wrap gap-3">
            <a href="https://instagram.com/anishganapa86" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-black/20 px-5 py-2.5 text-[15px] text-black transition-all duration-200 hover:-translate-y-0.5 hover:bg-black hover:text-white hover:shadow-lg">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
              </svg>
              Instagram
            </a>
            <a href={GITHUB} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-black/20 px-5 py-2.5 text-[15px] text-black transition-all duration-200 hover:-translate-y-0.5 hover:bg-black hover:text-white hover:shadow-lg">
              <GithubIcon size={16} />GitHub
            </a>
            <a href={LINKEDIN} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-black/20 px-5 py-2.5 text-[15px] text-black transition-all duration-200 hover:-translate-y-0.5 hover:bg-black hover:text-white hover:shadow-lg">
              <LinkedinIcon size={16} />LinkedIn
            </a>
          </div>
        </Reveal>
      </Section>

    </div>
  );
}
