"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { ProjectCard, type Project } from "./ProjectCard";
import { fadeUp, stagger } from "@/lib/motion";
import { projects as projectData } from "@/lib/data";

export function Projects() {
  const reduceMotion = useReducedMotion();

  return (
    <Section
      id="projects"
      eyebrow="03 · projects"
      title={
        <>
          Three things I <span className="text-gold">shipped</span>.
        </>
      }
      subtitle="Each one a real system, with real users (or real critics)."
    >
      <motion.div
        variants={stagger(0.12)}
        initial={reduceMotion ? false : "hidden"}
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="space-y-6"
      >
        {projectData.map((p, i) => (
          <motion.div key={p.id} variants={fadeUp}>
            <ProjectCard project={p as Project} index={i} />
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
