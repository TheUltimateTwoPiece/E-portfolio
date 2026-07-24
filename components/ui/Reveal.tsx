"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeUp } from "@/lib/motion";
import { cn } from "@/lib/utils";

export interface RevealProps {
  as?: keyof React.JSX.IntrinsicElements;
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function Reveal({ as = "div", children, className, delay = 0 }: RevealProps) {
  const reduceMotion = useReducedMotion();
  const Comp = motion[as as keyof typeof motion] as typeof motion.div;

  return (
    <Comp
      variants={fadeUp}
      initial={reduceMotion ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay }}
      className={cn(className)}
    >
      {children}
    </Comp>
  );
}
