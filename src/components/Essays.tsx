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

const ESSAY_2_BODY = (
  <div className="space-y-6 text-[16px] leading-[1.8] text-black/70">
    <p>
      There's a specific kind of awkward that doesn't get talked about enough.
      Not the awkward of saying the wrong thing. The awkward of saying
      anything at all to someone who has already left the room, even though
      their body is still standing in front of you.
    </p>
    <p>
      You can feel it almost immediately. The eye contact that holds a half
      second too long before drifting. The nod that comes slightly after your
      sentence ends instead of during it. You're mid-thought and you already
      know they stopped tracking two sentences ago. So now you're not really
      talking to them anymore. You're talking at the version of them that's
      still technically present, while the actual person is somewhere else
      entirely, running their own thread.
    </p>

    <h3 className="pt-2 text-[19px] font-medium text-black" style={{ letterSpacing: '-0.01em' }}>
      Everyone is in their own simulation
    </h3>

    <p>
      I don't think this happens because people are rude. I think it happens
      because everyone is quietly running a full simulation of their own life
      at all times, and conversation is just an interrupt that competes for
      processing time with whatever else is loading. A deadline. A text they
      haven't answered. A version of an argument they're replaying from
      earlier. You catch maybe sixty percent of someone's attention on a good
      day, and the other forty percent is somewhere you'll never see.
    </p>
    <p>
      What makes it awkward isn't the distraction itself. It's the small
      dishonesty in pretending it isn't happening. Both people know the
      conversation has become performative, a placeholder exchange of words
      to fill the silence, and both people keep going anyway because stopping
      to say "you're not really here right now" would be a bigger breach of
      etiquette than just letting the conversation quietly fail.
    </p>

    <h3 className="pt-2 text-[19px] font-medium text-black" style={{ letterSpacing: '-0.01em' }}>
      It happens everywhere, not just with strangers
    </h3>

    <p>
      I notice this most with people who are deep in something, whatever that
      something happens to be. You ask them a completely reasonable question
      and watch the delay before they even process that you spoke. Not
      because they don't care. Because their working memory is full of
      whatever they were mid-thought on, and you're an unscheduled interrupt
      they have to context-switch into and then back out of. I've been on
      both sides of this more times than I can count, and I still haven't
      figured out a graceful way to handle it beyond just accepting that the
      conversation is going to be thinner than it should be.
    </p>
    <p>
      The strange part is that everyone recognizes this instantly in other
      people and almost never in themselves. You can spot someone else's
      glazed-over half-attention from across a room. You rarely notice your
      own until someone repeats a question back to you and you realize you
      have no idea what they originally asked.
    </p>

    <h3 className="pt-2 text-[19px] font-medium text-black" style={{ letterSpacing: '-0.01em' }}>
      Presence is the actual scarce resource
    </h3>

    <p>
      I used to think being interesting was the hard part of talking to
      people. I don't think that anymore. Being interesting is easy compared
      to being fully present, and almost nobody is fully present for more
      than a few minutes at a time. The conversations that actually land, the
      ones that don't have that background static of someone half-elsewhere,
      are rare enough that I've started noticing them specifically when they
      happen. Not because the content was better. Because for once, both
      people were actually in the room.
    </p>
  </div>
);

const ESSAYS: Essay[] = [
  {
    id: 'own-little-world',
    date: '2026',
    readTime: '4 min read',
    title: 'Talking to someone who has already left the room',
    subtitle:
      'On the specific awkwardness of conversations where the other person is somewhere else entirely, and why presence might be the scarcest thing anyone can offer.',
    body: ESSAY_2_BODY,
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
            <span className="tabular-nums font-medium">04</span>
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
