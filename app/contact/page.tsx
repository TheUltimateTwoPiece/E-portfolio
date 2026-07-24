"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Mail, Phone } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { PageHero } from "@/components/layout/PageHero";
import { CornerBrackets, Fiducial } from "@/components/ui/CornerMarks";
import { fadeUp, stagger } from "@/lib/motion";
import { identity, pageContent } from "@/lib/data";
import { footerYear } from "@/lib/utils";

const contactCopy = pageContent.contact;

type FormState =
  | { status: "idle" }
  | { status: "sending" }
  | { status: "sent"; reference: string }
  | { status: "error"; message: string };

export default function ContactPage() {
  const reduceMotion = useReducedMotion();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [state, setState] = useState<FormState>({ status: "idle" });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setState({ status: "error", message: contactCopy.formValidationError });
      return;
    }
    setState({ status: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "Submission failed.");
      setState({ status: "sent", reference: data.reference ?? "ok" });
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setState({
        status: "error",
        message: err instanceof Error ? err.message : "Something went wrong.",
      });
    }
  };

  return (
    <PageShell>
      <PageHero
        mono={contactCopy.heroEyebrow}
        title={
          <>
            {contactCopy.heroTitle.pre && (
              <>{contactCopy.heroTitle.pre}</>
            )}
            <span className="text-gold">{contactCopy.heroTitle.accent}</span>
            {contactCopy.heroTitle.post}
          </>
        }
        subtitle={contactCopy.heroSubtitle}
        chips={contactCopy.chips}
      />

      <section className="relative px-5 md:px-10 max-w-7xl mx-auto pb-16 md:pb-24">
        <motion.div
          variants={stagger(0.08)}
          initial={reduceMotion ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid md:grid-cols-5 gap-6"
        >
          {/* Primary contact tiles */}
          <motion.div variants={fadeUp} className="md:col-span-2 space-y-4">
            <PrimaryTile
              kind="email"
              icon={<Mail size={20} strokeWidth={1.6} />}
              label="EMAIL"
              value={identity.email}
              href={`mailto:${identity.email}`}
              hint={contactCopy.emailHint}
            />
            <PrimaryTile
              kind="phone"
              icon={<Phone size={20} strokeWidth={1.6} />}
              label="PHONE"
              value={identity.phone}
              href={`tel:${identity.phone.replace(/\s/g, "")}`}
              hint={contactCopy.phoneHint}
            />

            <div className="relative bg-pcb-panel/60 border border-pcb-edge/50 p-5 panel-edge">
              <CornerBrackets className="opacity-30" color="#eab308" size={8} />
              <div className="mono-label text-pcb-dim mb-2">{contactCopy.contextEyebrow}</div>
              <ul className="space-y-1.5 text-pcb-muted text-sm">
                {contactCopy.contextLines.map((line) => (
                  <li key={line.label}>
                    <span className="font-mono text-pcb-dim">{line.label} · </span>
                    {line.value}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            variants={fadeUp}
            onSubmit={submit}
            className="md:col-span-3 relative bg-pcb-panel border border-pcb-edge/60 p-6 md:p-7 panel-edge"
          >
            <CornerBrackets className="opacity-30" color="#eab308" size={9} />
            <Fiducial position="tr" color="#eab308" size={9} />

            <div className="mono-label mb-4">{contactCopy.formEyebrow}</div>

            <div className="grid sm:grid-cols-2 gap-4">
              <Field
                id="c-name"
                label="Name"
                value={form.name}
                onChange={(v) => setForm({ ...form, name: v })}
              />
              <Field
                id="c-email"
                label="Email"
                type="email"
                value={form.email}
                onChange={(v) => setForm({ ...form, email: v })}
              />
            </div>
            <div className="mt-4">
              <Field
                id="c-message"
                label="Message"
                value={form.message}
                onChange={(v) => setForm({ ...form, message: v })}
                textarea
              />
            </div>

            <div className="mt-5 flex items-center justify-between gap-4 flex-wrap">
              <span className="mono-label">
                <span className="text-pcb-dim">{contactCopy.formEndpointLabel}</span>
                <code className="text-gold">/api/contact</code>
              </span>
              <button
                type="submit"
                disabled={state.status === "sending"}
                className="group relative inline-flex items-center gap-2 bg-gold text-pcb-base px-5 py-2.5 font-mono font-semibold text-sm hover:bg-gold-bright transition-colors disabled:opacity-50"
              >
                <CornerBrackets
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                  color="#08090c"
                  size={6}
                />
                {state.status === "sending"
                  ? contactCopy.submitSending
                  : state.status === "sent"
                  ? contactCopy.submitSent
                  : contactCopy.submitIdle}
              </button>
            </div>

            {state.status === "sent" && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 font-mono text-sm text-pcb-muted"
              >
                <span className="text-copper">OK</span> · reference{" "}
                <span className="text-gold">{state.reference}</span>
              </motion.div>
            )}
            {state.status === "error" && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 font-mono text-sm text-pcb-muted"
              >
                <span className="text-red-400">ERR</span> · {state.message}
              </motion.div>
            )}
          </motion.form>
        </motion.div>
      </section>

      <section className="px-5 md:px-10 max-w-7xl mx-auto py-8 border-t border-pcb-edge/30">
        <div className="flex items-center justify-between gap-6 flex-wrap">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-[13px] text-pcb-muted hover:text-gold transition-colors"
          >
            <ArrowLeft size={14} />
            <span>{contactCopy.backCta}</span>
          </Link>
          <span className="mono-label text-pcb-dim" suppressHydrationWarning>
            {contactCopy.typedFromScratchLabel}{footerYear}
          </span>
        </div>
      </section>
    </PageShell>
  );
}

function PrimaryTile({
  kind,
  icon,
  label,
  value,
  href,
  hint,
}: {
  kind: "email" | "phone";
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
  hint: string;
}) {
  return (
    <a
      href={href}
      className="group relative block bg-pcb-panel border border-gold/30 p-5 panel-edge hover:border-gold transition-colors"
    >
      <CornerBrackets
        className="opacity-30 group-hover:opacity-100 transition-opacity"
        color="#eab308"
        size={10}
      />
      <div className="flex items-center justify-between mb-3">
        <span className="grid place-items-center h-9 w-9 bg-gold/15 text-gold border border-gold/30">
          {icon}
        </span>
        <span className="mono-label">// {label}</span>
      </div>
      <div className="font-display font-bold text-pcb-ink text-lg md:text-xl break-all">
        {value}
      </div>
      <p className="mt-3 text-pcb-muted text-[13px] leading-relaxed">{hint}</p>
      <span className="absolute bottom-4 right-5 font-mono text-xs text-gold opacity-0 group-hover:opacity-100 transition-opacity">
        {kind === "email" ? "MAIL →" : "CALL →"}
      </span>
    </a>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  type = "text",
  textarea = false,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  textarea?: boolean;
}) {
  const base =
    "w-full bg-pcb-surface border border-pcb-edge/60 focus:border-gold/70 focus:outline-none focus:ring-2 focus:ring-gold/15 px-3 py-2.5 font-mono text-[13px] text-pcb-ink placeholder:text-pcb-dim transition-colors";
  return (
    <label htmlFor={id} className="block">
      <span className="mono-label mb-1.5 inline-block">{label}</span>
      {textarea ? (
        <textarea
          id={id}
          name={id}
          rows={5}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={`Your ${label.toLowerCase()}…`}
          className={base + " resize-y min-h-[120px]"}
          required
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={`Your ${label.toLowerCase()}…`}
          className={base}
          required
        />
      )}
    </label>
  );
}
