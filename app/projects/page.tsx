import { PageShell } from "@/components/layout/PageShell";
import { PageHero } from "@/components/layout/PageHero";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { projects, pageContent } from "@/lib/data";

const projectsCopy = pageContent.projects;

export const metadata = {
  title: projectsCopy.metaTitle,
  description: projectsCopy.metaDescription,
};

export default function ProjectsPage() {
  const projectIds = ["homework-board", "meal-planning", "robotic-arm"] as const;
  return (
    <PageShell>
      <PageHero
        mono={projectsCopy.heroEyebrow}
        title={
          <>
            {projectsCopy.heroTitle.pre}
            <span className="text-gold">{projectsCopy.heroTitle.accent}</span>
            {projectsCopy.heroTitle.post}
          </>
        }
        subtitle={projectsCopy.heroSubtitle}
        chips={projectsCopy.chips}
      />

      <section className="relative px-5 md:px-10 max-w-7xl mx-auto pb-16 md:pb-24">
        <div className="space-y-6">
          {projectIds.map((id, i) => {
            const project = projects.find((p) => p.id === id);
            if (!project) return null;
            return (
              <ProjectCard key={project.id} project={project} index={i} />
            );
          })}
        </div>
      </section>
    </PageShell>
  );
}
