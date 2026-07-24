import { PageShell } from "@/components/layout/PageShell";
import { PageHero } from "@/components/layout/PageHero";
import { PianoKeys } from "@/components/bits/PianoKeys";
import { SwimLap } from "@/components/bits/SwimLap";
import { CornerBrackets, Fiducial } from "@/components/ui/CornerMarks";
import { hobbies, pageContent } from "@/lib/data";

const hobbiesCopy = pageContent.hobbies;

export const metadata = {
  title: hobbiesCopy.metaTitle,
  description: hobbiesCopy.metaDescription,
};

export default function HobbiesPage() {
  return (
    <PageShell>
      <PageHero
        mono={hobbiesCopy.heroEyebrow}
        title={
          <>
            {hobbiesCopy.heroTitle.pre}
            <span className="text-gold">{hobbiesCopy.heroTitle.accent}</span>
            {hobbiesCopy.heroTitle.post}
          </>
        }
        subtitle={hobbiesCopy.heroSubtitle}
        chips={hobbiesCopy.chips}
      />

      <section className="relative px-5 md:px-10 max-w-7xl mx-auto pb-16 md:pb-24">
        <div className="grid md:grid-cols-2 gap-6">
          {hobbies.map((h) => (
            <article
              key={h.id}
              className="relative bg-pcb-panel border border-pcb-edge/60 p-6 md:p-7 panel-edge hover:border-gold/40 transition-colors group block"
            >
              <CornerBrackets
                className="opacity-30 group-hover:opacity-80 transition-opacity"
                color="#eab308"
                size={9}
              />
              <Fiducial position="br" color="#eab308" size={8} />

              <div className="flex items-center justify-between mb-4">
                <span className="mono-label text-gold">// {h.tag}</span>
                <span className="font-mono text-[10px] text-pcb-dim">
                  {h.id.toUpperCase()}
                </span>
              </div>

              <h2 className="font-display display-tight text-pcb-ink text-2xl md:text-3xl">
                {h.title}
              </h2>

              <p className="mt-3 text-pcb-muted text-[15px] leading-relaxed">
                {h.body}
              </p>

              <div className="mt-6">
                {h.id === "piano" ? (
                  <PianoKeys />
                ) : (
                  <SwimLap laneWidth={420} />
                )}
              </div>

              <div className="mt-5 grid grid-cols-3 gap-2">
                {h.facts.map((f) => (
                  <div
                    key={f.label}
                    className="border border-pcb-edge/40 bg-pcb-surface/40 px-3 py-2"
                  >
                    <div className="mono-label">{f.label}</div>
                    <div className="font-display font-semibold text-pcb-ink text-sm mt-0.5 leading-tight">
                      {f.value}
                    </div>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>

        {/* Bottom note */}
        <div className="mt-10 text-center">
          <p className="text-pcb-muted text-[14px] leading-relaxed max-w-2xl mx-auto">
            {hobbiesCopy.bottomNote}
          </p>
        </div>
      </section>
    </PageShell>
  );
}
