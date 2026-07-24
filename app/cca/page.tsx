import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { PageHero } from "@/components/layout/PageHero";
import { WinGallery } from "@/components/wins/WinGallery";
import { CornerBrackets } from "@/components/ui/CornerMarks";
import { cca, roboticsWins, skills, pageContent } from "@/lib/data";

const ccaCopy = pageContent.cca;

export const metadata = {
  title: ccaCopy.metaTitle,
  description: ccaCopy.metaDescription,
};

export default function CCAPage() {
  const accentPalette = ["#eab308", "#79c0ff", "#f59e0b", "#5eead4"];
  const equipment = [...cca.equipment, ...skills.find((s) => s.group === "Software")!.items.map((i) => ({ label: i.name, value: i.note }))];

  return (
    <PageShell>
      <PageHero
        mono={ccaCopy.heroEyebrow}
        title={
          <>
            {ccaCopy.heroTitle.pre}
            <span className="text-gold">{ccaCopy.heroTitle.accent}</span>
            {ccaCopy.heroTitle.post}
          </>
        }
        subtitle={cca.blurb}
        chips={ccaCopy.chips}
      />

      {/* The four beats of the work */}
      <section className="relative px-5 md:px-10 max-w-7xl mx-auto py-12 md:py-16">
        <div className="mono-label flex items-center gap-3 mb-6">
          <span className="h-px w-7 bg-gold/60" />
          <span>{ccaCopy.beatsEyebrow}</span>
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          {cca.beats.map((b, i) => (
            <article
              key={b.tag}
              className="relative bg-pcb-panel border border-pcb-edge/60 p-6 panel-edge hover:border-gold/50 transition-colors"
            >
              <CornerBrackets
                className="opacity-40"
                color={accentPalette[i % accentPalette.length]}
                size={10}
              />
              <div className="flex items-center gap-3 mb-3">
                <span
                  className="mono-label"
                  style={{ color: accentPalette[i % accentPalette.length] }}
                >
                  [ {b.tag} ]
                </span>
                <span className="h-px flex-1 bg-pcb-edge/60" />
              </div>
              <h3 className="font-display font-bold text-pcb-ink text-xl">
                {b.title}
              </h3>
              <p className="mt-3 text-pcb-muted text-[14.5px] leading-relaxed">
                {b.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Equipment */}
      <section className="relative px-5 md:px-10 max-w-7xl mx-auto py-12 md:py-16">
        <div className="mono-label flex items-center gap-3 mb-6">
          <span className="h-px w-7 bg-gold/60" />
          <span>{ccaCopy.equipmentEyebrow}</span>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {equipment.map((e) => (
            <div
              key={e.label}
              className="relative bg-pcb-surface/40 border border-pcb-edge/50 px-4 py-3 hover:border-gold/40 transition-colors"
            >
              <div className="mono-label">{e.label}</div>
              <div className="font-display font-semibold text-pcb-ink text-sm mt-1 leading-snug">
                {e.value}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Wins */}
      <section className="relative px-5 md:px-10 max-w-7xl mx-auto py-12 md:py-16">
        <div className="flex items-end justify-between gap-6 mb-6 flex-wrap">
          <div>
            <div className="mono-label flex items-center gap-3">
              <span className="h-px w-7 bg-gold/60" />
              <span>{ccaCopy.winsEyebrow}</span>
            </div>
            <h2 className="mt-3 font-display display-tight text-pcb-ink text-3xl md:text-4xl">
              {ccaCopy.winsTitle.pre}<span className="text-gold">{ccaCopy.winsTitle.accent}</span>{ccaCopy.winsTitle.post}
            </h2>
          </div>
          <Link
            href="/achievements"
            className="mono-label text-pcb-muted hover:text-gold transition-colors"
          >
            {ccaCopy.winsLink}
          </Link>
        </div>
        <WinGallery wins={roboticsWins} cols={3} />
      </section>

      <BackToHome />
    </PageShell>
  );
}

function BackToHome() {
  return (
    <section className="px-5 md:px-10 max-w-7xl mx-auto py-12">
      <Link
        href="/"
        className="inline-flex items-center gap-2 font-mono text-[13px] text-pcb-muted hover:text-gold transition-colors"
      >
        <ArrowLeft size={14} />
        <span>Back home</span>
      </Link>
    </section>
  );
}
