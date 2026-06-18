import { useState } from 'react';
import Reveal from './Reveal';

type Essay = {
  id: string;
  date: string;
  readTime: string;
  title: string;
  subtitle: string;
  body: React.ReactNode;
};

const ESSAY_1_BODY = (
  <div className="space-y-6 text-[16px] leading-[1.8] text-black/70">
    <p>
      CS has a new model every few weeks. AI tooling that was standard practice
      six months ago is already legacy. Hardware ships faster than most people
      can learn it. I have watched the field I work in move so fast that things
      I built a year ago feel dated. That velocity is real, and most days I find
      it exciting.
    </p>
    <p>
      But I also spend time in the other direction. Working with underserved
      communities through HUG Foundation. Reading about public health access.
      Running biofilm assays in a lab that is trying to understand, at a
      molecular level, how microbial communities form and what that means for
      infection. And from that direction, medicine looks completely different.
      It moves on decade timescales. Clinical trials take years to recruit.
      Drugs take longer to approve than some startups take to go from idea to
      acquisition. The communities that need better diagnostics the most are
      still waiting for tools that, technically, already exist.
    </p>

    <h3 className="pt-2 text-[19px] font-medium text-black" style={{ letterSpacing: '-0.01em' }}>
      The bottleneck is not capability
    </h3>

    <p>
      When I built MicroResist, a Random Forest classifier for predicting
      antimicrobial resistance gene enrichment, the hardest part was not the
      model. The hardest part was understanding enough biology to know what
      question to ask. The compute is cheap. The tooling is accessible. What is
      scarce is people who can sit at the intersection of the two fields and
      actually aim the tools correctly.
    </p>
    <p>
      That is the bottleneck. Not capability. Direction. Most of the people who
      could build useful things for medicine are building recommendation engines
      and engagement optimizers instead. That is not because they are bad people.
      It is because the incentive structures point that way, and it is easier to
      build for markets that already understand what you made.
    </p>

    <h3 className="pt-2 text-[19px] font-medium text-black" style={{ letterSpacing: '-0.01em' }}>
      What Mob actually chose
    </h3>

    <p>
      I keep thinking about Mob Psycho 100. Mob has psychic powers strong enough
      to end most conflicts instantly. The whole show is built around situations
      where using them would be the obvious, easy move. He mostly does not. Not
      because he cannot. Because at some point he decided what his power was for,
      and demolishing buildings was not it.
    </p>
    <p>
      I think about that a lot when I look at what people with real technical
      capability decide to build. The power is the same. The question is just
      what you aim it at. A startup that cuts restaurant wait times. A tool that
      flags drug-resistant genes in metagenomic data so a clinic without internet
      access can still run it. The engineering is not that different. The aim is
      completely different.
    </p>
    <p>
      If everyone with serious technical capability aimed at the same set of
      problems, even for a few years, I genuinely do not know how far medicine
      could move. I do not think anyone does, because we have never actually
      tried it. The compute exists. The biology is increasingly tractable. What
      is missing is enough people deciding that is what their capability is for.
    </p>

    <h3 className="pt-2 text-[19px] font-medium text-black" style={{ letterSpacing: '-0.01em' }}>
      Medicine's slowness is not all wrong
    </h3>

    <p>
      I want to be honest about this. Some of medicine's pace is correct. You
      cannot ship a drug the way you ship a software update. A false positive in
      a classifier is annoying. A false positive in a diagnostic changes
      someone's life. The caution is not bureaucratic noise. It is there for
      real reasons.
    </p>
    <p>
      But there is a difference between appropriate caution and structural
      underinvestment. The communities I have worked with through public health
      adjacent work do not have access to basic genomic diagnostics not because
      the science is not ready. It is because no one aimed it at them. That is
      not a caution story. That is a direction story.
    </p>
    <p>
      Mob could have leveled every building in the show. He chose not to, because
      he had already decided what he was building toward. I think that is the
      question sitting in front of anyone who can actually build things. Not
      whether you have the capability. Whether you have decided what it is for.
    </p>
  </div>
);

const ESSAYS: Essay[] = [
  {
    id: 'medicine-gap',
    date: '2026',
    readTime: '5 min read',
    title: "Medicine is the last frontier we're not sprinting toward",
    subtitle:
      'On the velocity gap between CS and health, what Mob Psycho taught me about aimed capability, and what happens if more people point their work at what actually matters.',
    body: ESSAY_1_BODY,
  },
];

function EssayCard({ essay }: { essay: Essay }) {
  const [open, setOpen] = useState(false);

  return (
    <Reveal delay={0.12} y={36} blur={12} duration={0.9}>
      <article className="rounded-2xl border border-black/10 bg-white transition-all duration-300 hover:border-black/20 hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)]">
        <button
          type="button"
          onClick={() => setOpen(v => !v)}
          className="w-full text-left p-7 group"
          aria-expanded={open}
        >
          <div className="flex items-start justify-between gap-6">
            <div className="flex-1">
              <div className="mb-3 flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-black/38">
                <span>{essay.date}</span>
                <span className="h-px w-5 bg-black/18" />
                <span>{essay.readTime}</span>
              </div>
              <h3
                className="text-black transition-opacity duration-200 group-hover:opacity-75"
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(20px, 2.8vw, 26px)',
                  lineHeight: 1.15,
                  letterSpacing: '-0.015em',
                }}
              >
                {essay.title}
              </h3>
              <p className="mt-2 text-[14px] leading-relaxed text-black/50">
                {essay.subtitle}
              </p>
            </div>
            <span
              className="mt-1 shrink-0 flex h-8 w-8 items-center justify-center rounded-full border border-black/12 text-black/40 transition-all duration-300 group-hover:border-black/25 group-hover:text-black/70"
              style={{
                transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.35s cubic-bezier(0.22,1,0.36,1), border-color 0.2s, color 0.2s',
              }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </span>
          </div>
        </button>

        <div
          className="overflow-hidden"
          style={{
            maxHeight: open ? '9999px' : '0px',
            transition: 'max-height 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        >
          <div className="border-t border-black/8 px-7 pb-8 pt-6">
            {essay.body}
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export default function Essays() {
  return (
    <section
      id="essays"
      className="flex min-h-screen scroll-mt-24 items-start border-t border-black/10 bg-white px-5 sm:px-8 md:px-10"
    >
      <div className="mx-auto w-full max-w-5xl py-24">
        <Reveal y={12} blur={6} scale={1} duration={0.7}>
          <div className="mb-8 flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-black/38">
            <span className="tabular-nums font-medium">05</span>
            <span className="h-px w-10 bg-black/15" />
            <span>Essays</span>
          </div>
        </Reveal>

        <Reveal delay={0.08} y={56} blur={18} scale={0.95} duration={1.1}>
          <h2
            className="text-black"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(34px, 7vw, 60px)',
              lineHeight: 1.0,
              letterSpacing: '-0.025em',
            }}
          >
            Things I've been thinking about
          </h2>
        </Reveal>

        <Reveal delay={0.18} y={24} blur={8} duration={0.8}>
          <p
            className="mt-5 text-black/52"
            style={{ fontSize: 'clamp(16px, 2.2vw, 20px)', lineHeight: 1.65, maxWidth: '58ch' }}
          >
            Loosely structured writing on research, technology, and whatever I'm figuring out.
          </p>
        </Reveal>

        <div className="mt-12 space-y-4">
          {ESSAYS.map(essay => (
            <EssayCard key={essay.id} essay={essay} />
          ))}
        </div>
      </div>
    </section>
  );
}
