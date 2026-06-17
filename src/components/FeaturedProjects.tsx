import Reveal from './Reveal';

type CardProps = {
  index: string;
  tag: string;
  title: string;
  subtitle: string;
  desc: string;
  meta: string;
  dark?: boolean;
  img: string;
  imgAlt: string;
  imgFit?: 'cover' | 'contain';
  link?: string;
};

function Card({ index, tag, title, subtitle, desc, meta, dark, img, imgAlt, imgFit = 'cover', link }: CardProps) {
  const bg        = dark ? 'bg-[#0d0d0d]'       : 'bg-white';
  const border    = dark ? 'border-white/10'     : 'border-black/10';
  const hoverBord = dark ? 'hover:border-white/25' : 'hover:border-black/28';
  const tagCls    = dark ? 'bg-black/60 border-white/12 text-white/60' : 'bg-white/85 border-black/10 text-black/55';
  const idxCls    = dark ? 'text-white/20'       : 'text-black/22';
  const titleCls  = dark ? 'text-white'          : 'text-black';
  const subCls    = dark ? 'text-white/40'       : 'text-black/42';
  const descCls   = dark ? 'text-white/60'       : 'text-black/65';
  const metaCls   = dark ? 'text-white/35'       : 'text-black/40';
  const shadow    = dark
    ? 'hover:shadow-[0_20px_60px_rgba(0,0,0,0.55)]'
    : 'hover:shadow-[0_16px_50px_rgba(0,0,0,0.09)]';
  const mediaBg   = dark ? 'bg-[#161616]' : 'bg-[#f0efec]';

  const inner = (
    <article
      className={`group flex flex-col overflow-hidden rounded-2xl border ${border} ${bg} ${hoverBord} ${shadow} transition-all duration-300 ${link ? 'cursor-pointer' : ''}`}
    >
      <div
        className={`relative w-full shrink-0 overflow-hidden ${mediaBg}`}
        style={{ height: '220px' }}
      >
        <img
          src={img}
          alt={imgAlt}
          className="h-full w-full transition-transform duration-500 group-hover:scale-[1.03]"
          style={{ objectFit: imgFit, objectPosition: 'center' }}
        />
        <span className={`absolute left-4 top-4 rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.18em] backdrop-blur-sm ${tagCls}`}>
          {tag}
        </span>
        <span className={`absolute right-4 top-4 text-[10px] tabular-nums ${idxCls}`}>{index}</span>
      </div>

      <div className="flex flex-col p-6">
        <h3 className={titleCls} style={{ fontFamily: 'var(--font-heading)', fontSize: '23px', letterSpacing: '-0.01em' }}>
          {title}
        </h3>
        <p className={`mt-1 text-[13px] ${subCls}`}>{subtitle}</p>
        <p className={`mt-4 text-[14px] leading-relaxed ${descCls}`}>{desc}</p>
        <div className="mt-6 flex items-center justify-between">
          <span className={`text-[11px] uppercase tracking-[0.14em] ${metaCls}`}>{meta}</span>
          {link && (
            <span className={`text-[11px] uppercase tracking-[0.12em] underline underline-offset-2 transition-opacity duration-200 group-hover:opacity-100 ${dark ? 'text-white/30 group-hover:text-white/60' : 'text-black/30 group-hover:text-black/60'}`}>
              Visit ↗
            </span>
          )}
        </div>
      </div>
    </article>
  );

  if (link) {
    return <a href={link} target="_blank" rel="noopener noreferrer" className="block">{inner}</a>;
  }
  return inner;
}

export default function FeaturedProjects() {
  return (
    <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">

      {/* Biofilm - dark, microscopy photo */}
      <Reveal delay={0.08} y={50} blur={16} scale={0.96} duration={1.0}>
        <Card
          index="01"
          tag="Microbiology"
          title="Biofilm research"
          subtitle="Molecular biology of Candida albicans biofilm development"
          desc="I contribute to projects investigating the molecular and mechanistic basis of microbial communities, with a focus on Candida albicans biofilm development. My work involves performing molecular biology and microbiology protocols to culture microorganisms, conduct biofilm assays, and collect and analyze experimental data. Through this research, I support efforts to uncover how transcriptional networks regulate gene expression and how interspecies interactions shape microbial community structure and function."
          meta="UC Merced · Ongoing"
          dark
          img="/microscopy.png"
          imgAlt="EVOS F1 microscope in the Nobile Lab"
        />
      </Reveal>

      {/* MicroResist */}
      <Reveal delay={0.16} y={44} blur={14} scale={0.97} duration={0.95}>
        <Card
          index="02"
          tag="Machine Learning"
          title="MicroResist"
          subtitle="ML for antimicrobial-resistance prediction"
          desc="A Random Forest classifier flagging genomic sites enriched for AMR genes - beta-lactamase, fluoroquinolone, and mobile colistin (mcr) resistance. Validated against BioProject PRJNA833122. Built to run without external compute for resource-limited clinical settings."
          meta="Independent · Completed 2025"
          img="/microresist-map.png"
          imgAlt="AMR resistance heatmap across the Las Vegas region"
        />
      </Reveal>

      {/* PeakSPECTRA */}
      <Reveal delay={0.24} y={44} blur={14} scale={0.97} duration={0.95}>
        <Card
          index="03"
          tag="Computational Biology"
          title="PeakSPECTRA"
          subtitle="Benchmarking peak callers on chromatin data"
          desc="A pipeline for benchmarking chromatin peak-calling methods on CUT&RUN data. Kept high-level while the work is ongoing."
          meta="UC Merced · Ongoing"
          img="/fragment-size.png"
          imgAlt="Fragment size distributions: GFP vs IGG"
          imgFit="contain"
        />
      </Reveal>

      {/* HUG Foundation */}
      <Reveal delay={0.32} y={44} blur={14} scale={0.97} duration={0.95}>
        <Card
          index="04"
          tag="Community · Non-profit"
          title="HUG Foundation"
          subtitle="Youth-led non-profit serving underserved communities"
          desc="Co-founded and built the HUG Foundation, a youth-led non-profit focused on collecting and distributing essential goods to underserved communities. Designed and developed the organization's full website."
          meta="hug-foundation.com"
          img="/hug-foundation.png"
          imgAlt="HUG Foundation volunteers with donation bags"
          link="https://hug-foundation.com"
        />
      </Reveal>

    </div>
  );
}
