import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { PageHero } from "@/components/layout/PageHero";
import { WinGallery } from "@/components/wins/WinGallery";
import { CornerBrackets } from "@/components/ui/CornerMarks";
import { roboticsWins, otherAchievements, cca, pageContent } from "@/lib/data";

const achCopy = pageContent.achievements;

export const metadata = {
  title: achCopy.metaTitle,
  description: achCopy.metaDescription,
};

export default function AchievementsPage() {
  return (
    <PageShell>
      <PageHero
        mono={achCopy.heroEyebrow}
        title={
          <>
            {achCopy.heroTitle.line1.pre}
            <span className="text-gold">{achCopy.heroTitle.line1.accent}</span>
            {achCopy.heroTitle.line1.post}
            <br />
            {achCopy.heroTitle.line2.pre}
            <span className="text-gold">{achCopy.heroTitle.line2.accent}</span>
            {achCopy.heroTitle.line2.post}
          </>
        }
        subtitle={achCopy.heroSubtitle}
        chips={achCopy.chips}
      />

      {/* Robotics wins */}
      <section className="relative px-5 md:px-10 max-w-7xl mx-auto py-10 md:py-14">
        <div className="flex items-end justify-between gap-6 mb-6 flex-wrap">
          <div>
            <div className="mono-label flex items-center gap-3">
              <span className="h-px w-7 bg-gold/60" />
              <span>{achCopy.winsSectionEyebrow}</span>
            </div>
            <h2 className="mt-3 font-display display-tight text-pcb-ink text-3xl md:text-4xl">
              {achCopy.winsSectionTitle.pre}
              <Link
                href="/cca"
                className="text-gold hover:text-gold-bright transition-colors"
              >
                {achCopy.winsSectionTitle.linkLabel}
              </Link>
              {achCopy.winsSectionTitle.post}
            </h2>
          </div>
          <Link
            href="/cca"
            className="inline-flex items-center gap-2 font-mono text-[13px] text-pcb-muted hover:text-gold transition-colors"
          >
            <span>{achCopy.winsSectionCta}</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>

        <div className="mt-2 mb-6 mono-label">
          <span className="text-pcb-dim">// </span>
          {achCopy.winsSectionCaption.org} · {achCopy.winsSectionCaption.role}
        </div>

        <WinGallery wins={roboticsWins} cols={3} />
      </section>

      {/* Other achievements */}
      <section className="relative px-5 md:px-10 max-w-7xl mx-auto py-10 md:py-14">
        <div className="flex items-center gap-3 mb-6">
          <span className="mono-label">{achCopy.oddmentsEyebrow}</span>
          <span className="h-px w-12 bg-gold/40" />
        </div>

        <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {otherAchievements.map((a) => (
            <li
              key={a.id}
              className="relative bg-pcb-panel border border-pcb-edge/60 p-5 panel-edge hover:border-gold/40 transition-colors"
            >
              <CornerBrackets
                className="opacity-40"
                color="#eab308"
                size={9}
                visible={["tl", "br"]}
              />
              <div className="flex items-baseline justify-between mb-3">
                <span className="mono-label text-gold">{a.org}</span>
                <span className="font-mono text-xs text-pcb-dim">{a.year}</span>
              </div>
              <h3 className="font-display font-bold text-pcb-ink text-lg leading-tight">
                {a.title}
              </h3>
              <p className="mt-2 text-pcb-muted text-[13.5px] leading-relaxed">
                {a.note}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* Outbound to other places */}
      <section className="relative px-5 md:px-10 max-w-7xl mx-auto py-10 md:py-14">
        <div className="bg-pcb-panel border border-pcb-edge/50 px-6 py-5 panel-edge">
          <div className="mono-label text-pcb-dim mb-2">{achCopy.ifYouWantMoreEyebrow}</div>
          <p className="text-pcb-muted text-[14.5px] leading-relaxed max-w-2xl">
            {achCopy.ifYouWantMoreBody}
            <code className="text-gold font-mono">lib/data.ts</code> under{" "}
            <code className="text-gold font-mono">otherAchievements</code> and
            drop the photo into{" "}
            <code className="text-gold font-mono">/public/competitions/</code>.
          </p>
        </div>
      </section>
    </PageShell>
  );
}
