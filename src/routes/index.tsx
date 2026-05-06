import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  Github, Linkedin, Mail, Phone, Download, ArrowUp, ExternalLink,
  Code2, Brain, Sparkles, Cpu, Database, Workflow, Rocket, GraduationCap,
  Briefcase, Award, MessageSquare, Copy, Check, Menu, X, Terminal,
} from "lucide-react";
import { ParticleBackground } from "@/components/ParticleBackground";
import { CursorGlow } from "@/components/CursorGlow";
import { TypingText } from "@/components/TypingText";
import { CountUp } from "@/components/CountUp";
import { ScrollProgress } from "@/components/ScrollProgress";
import profilePhoto from "@/assets/laxmi-narayana.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "M. Laxmi Narayana — ML Engineer & GenAI Developer" },
      { name: "description", content: "AI/ML Engineer specializing in NLP, LLMs, TensorFlow, FastAPI & Generative AI. Building intelligent systems that solve real-world problems." },
    ],
  }),
  component: Portfolio,
});

const NAV = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

const STACK = ["Python", "TensorFlow", "LangChain", "FastAPI", "Scikit-learn", "LLMs"];

const SKILLS: { group: string; icon: typeof Code2; items: { name: string; level: number }[] }[] = [
  {
    group: "AI / ML",
    icon: Brain,
    items: [
      { name: "Machine Learning", level: 90 },
      { name: "Deep Learning", level: 85 },
      { name: "TensorFlow", level: 88 },
      { name: "Scikit-learn", level: 90 },
      { name: "CNN", level: 80 },
      { name: "Pandas / NumPy", level: 92 },
    ],
  },
  {
    group: "Generative AI & NLP",
    icon: Sparkles,
    items: [
      { name: "NLP", level: 88 },
      { name: "LLMs", level: 85 },
      { name: "LangChain", level: 82 },
      { name: "RAG", level: 80 },
      { name: "AI Agents", level: 78 },
      { name: "Prompt Engineering", level: 88 },
    ],
  },
  {
    group: "Engineering & Tools",
    icon: Cpu,
    items: [
      { name: "Python", level: 95 },
      { name: "FastAPI", level: 88 },
      { name: "SQL", level: 82 },
      { name: "Java", level: 75 },
      { name: "Git & GitHub", level: 88 },
      { name: "API Integration", level: 85 },
    ],
  },
  {
    group: "CS Fundamentals",
    icon: Database,
    items: [
      { name: "Data Structures & Algorithms", level: 82 },
      { name: "Operating Systems", level: 78 },
      { name: "Computer Networks", level: 75 },
    ],
  },
];

const PROJECTS = [
  {
    title: "Crime Rate Prediction & Analysis",
    tagline: "ML-powered hotspot intelligence on 10K+ records",
    description:
      "Regression and classification pipeline that predicts crime rates from historical datasets, identifies hotspots, and serves real-time inferences via a FastAPI REST service.",
    stack: ["Python", "Scikit-learn", "Pandas", "NumPy", "Matplotlib", "FastAPI"],
    bullets: [
      "Analyzed 10K+ records to surface temporal & spatial crime patterns",
      "Boosted accuracy through feature engineering and hyperparameter tuning",
      "Production-ready REST API for real-time predictions",
    ],
    icon: Workflow,
  },
  {
    title: "Intelligent Virtual Assistant",
    tagline: "RAG-powered NLP assistant with 90% understanding",
    description:
      "Context-aware AI assistant combining deep learning with Retrieval-Augmented Generation for grounded, accurate responses through a clean FastAPI surface.",
    stack: ["Python", "TensorFlow", "NLTK", "LangChain", "FastAPI", "RAG"],
    bullets: [
      "90% query understanding accuracy on internal benchmark",
      "LangChain orchestration for contextual multi-turn responses",
      "RAG pipeline reduced hallucinations by 35%",
    ],
    icon: MessageSquare,
  },
];

const EXPERIENCE = [
  {
    role: "AI/ML Virtual Intern",
    org: "AICTE EduSkills Foundation",
    period: "Apr 2024 – Jun 2024",
    points: [
      "Developed predictive ML models with Python, TensorFlow & Scikit-learn",
      "Built data preprocessing pipelines that improved model accuracy by 20%",
      "Applied NLP with NLTK for sentiment analysis on real datasets",
      "Implemented SQL-based ETL pipelines for business datasets",
    ],
  },
  {
    role: "Co-Lead, AI & ML Division",
    org: "Google Developer Student Club (GDSC)",
    period: "Aug 2023 – Aug 2024",
    points: [
      "Organized 5 technical workshops with 200+ attendees",
      "Led TensorFlow & Deep Learning hands-on sessions",
      "Mentored 20+ junior students in AI/ML fundamentals",
      "Drove community AI/ML initiatives across campus",
    ],
  },
];

const EDUCATION = [
  {
    title: "B.Tech — Computer Science (AI & ML)",
    place: "MLR Institute of Technology & Management, Hyderabad",
    period: "2021 – 2025",
    score: "CGPA 7.5 / 10",
  },
  {
    title: "Intermediate — MPC",
    place: "Narayana Junior College, Vijayawada",
    period: "2019 – 2021",
    score: "91.3%",
  },
  {
    title: "SSC",
    place: "NTR High School, Vijayawada",
    period: "2018 – 2019",
    score: "GPA 9.8 / 10",
  },
];

const CERTS = [
  "Python — Cisco Networking Academy",
  "AI Foundations Associate — Oracle",
  "Generative AI Professional — Oracle",
  "AI Vector Search — Oracle",
  "Python & Java — HackerRank",
];

function Portfolio() {
  return (
    <div className="relative min-h-screen overflow-x-hidden text-foreground">
      <ScrollProgress />
      <ParticleBackground />
      <CursorGlow />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Certifications />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
      <FloatingSocials />
    </div>
  );
}

/* ---------- NAVBAR ---------- */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4">
        <a
          href="#top"
          className={`flex items-center gap-2 rounded-full px-4 py-2 font-display font-semibold tracking-tight transition-all ${
            scrolled ? "glass" : ""
          }`}
        >
          <span className="grid h-7 w-7 place-items-center rounded-md text-primary-foreground" style={{ background: "var(--gradient-primary)" }}>
            <Brain className="h-4 w-4" />
          </span>
          <span className="text-gradient">Laxmi.AI</span>
        </a>

        <nav className={`hidden items-center gap-1 rounded-full px-2 py-1 md:flex ${scrolled ? "glass" : ""}`}>
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="hidden rounded-full px-4 py-2 text-sm font-medium text-primary-foreground shadow-lg transition-transform hover:scale-105 md:inline-block"
          style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-glow)" }}
        >
          Hire Me
        </a>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
          className="rounded-full glass p-2 md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="mx-4 mt-2 rounded-2xl glass p-3 md:hidden">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm hover:bg-white/5"
            >
              {n.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}

/* ---------- HERO ---------- */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.2]);

  return (
    <section id="top" ref={ref} className="relative flex min-h-screen items-center justify-center pt-28">
      <div className="absolute inset-0 grid-bg [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <motion.div style={{ y, opacity }} className="relative z-10 mx-auto max-w-6xl px-4">
        <div className="grid items-center gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 text-xs text-muted-foreground"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald" />
              </span>
              Available for AI Engineering roles
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-6 font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl"
            >
              M. Laxmi <span className="text-gradient">Narayana</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-4 font-mono text-base text-cyan md:text-lg"
            >
              <span className="text-muted-foreground">&gt;</span>{" "}
              <TypingText
                words={[
                  "ML Engineer",
                  "GenAI Developer",
                  "AI Research Enthusiast",
                  "FastAPI Developer",
                  "NLP Engineer",
                ]}
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground"
            >
              Building intelligent AI systems that solve real-world problems through
              Machine Learning, NLP, and Generative AI.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.03]"
                style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-glow)" }}
              >
                <Rocket className="h-4 w-4" /> View Projects
              </a>
              <a
                href="/resume.pdf"
                download
                className="inline-flex items-center gap-2 rounded-full glass px-5 py-3 text-sm font-medium transition-colors hover:bg-white/10"
              >
                <Download className="h-4 w-4" /> Download Resume
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-medium transition-colors hover:bg-white/5"
              >
                <Mail className="h-4 w-4" /> Contact Me
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="mt-10 flex flex-wrap gap-2"
            >
              {STACK.map((s, i) => (
                <motion.span
                  key={s}
                  className="rounded-full glass px-3 py-1.5 text-xs text-muted-foreground"
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 3 + i * 0.2, repeat: Infinity, ease: "easeInOut" }}
                >
                  {s}
                </motion.span>
              ))}
            </motion.div>
          </div>

          <div className="relative mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative animate-float"
            >
              <div
                className="absolute -inset-6 rounded-full opacity-70 blur-2xl"
                style={{ background: "var(--gradient-vivid)" }}
              />
              <div className="relative grid h-64 w-64 place-items-center rounded-full glass md:h-80 md:w-80">
                <div
                  className="grid h-56 w-56 place-items-center rounded-full p-[3px] md:h-72 md:w-72"
                  style={{ background: "var(--gradient-vivid)" }}
                >
                  <div className="h-full w-full overflow-hidden rounded-full bg-background">
                    <img
                      src={profilePhoto}
                      alt="M. Laxmi Narayana"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Orbiting badges */}
              {[
                { icon: Brain, x: -120, y: -40 },
                { icon: Code2, x: 130, y: -50 },
                { icon: Sparkles, x: 140, y: 80 },
                { icon: Cpu, x: -130, y: 90 },
              ].map((b, i) => (
                <motion.div
                  key={i}
                  className="absolute left-1/2 top-1/2 grid h-12 w-12 place-items-center rounded-2xl glass"
                  style={{ x: b.x, y: b.y }}
                  animate={{ y: [b.y, b.y - 10, b.y], rotate: [0, 8, 0] }}
                  transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
                >
                  <b.icon className="h-5 w-5 text-cyan" />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ---------- SECTION HEADER ---------- */
function SectionHeader({ kicker, title, subtitle }: { kicker: string; title: string; subtitle?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6 }}
      className="mb-14 text-center"
    >
      <div className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-cyan">{kicker}</div>
      <h2 className="font-display text-4xl font-bold md:text-5xl">{title}</h2>
      {subtitle && <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">{subtitle}</p>}
    </motion.div>
  );
}

/* ---------- ABOUT ---------- */
function About() {
  const stats = [
    { v: 2, s: "+", l: "AI Projects" },
    { v: 5, s: "+", l: "Workshops Led" },
    { v: 200, s: "+", l: "Community Impacted" },
    { v: 20, s: "+", l: "Students Mentored" },
  ];
  return (
    <section id="about" className="relative py-28">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader kicker="01 / About" title="Engineering intelligent systems." />
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl glass p-8 md:p-10"
          >
            <p className="text-lg leading-relaxed text-muted-foreground">
              I'm an <span className="text-foreground font-medium">AI &amp; Machine Learning graduate</span> from
              MLR Institute of Technology &amp; Management with hands-on experience building ML, NLP and
              Generative AI applications using Python, TensorFlow, FastAPI and LangChain.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              I specialize in end-to-end intelligent systems — predictive models, REST APIs, AI assistants
              and RAG-based applications — combining strong engineering fundamentals with modern AI:
              <span className="text-cyan"> LLMs, Prompt Engineering &amp; Deep Learning.</span>
            </p>

            <div className="mt-8 grid grid-cols-2 gap-3 text-sm md:grid-cols-3">
              {["Python", "TensorFlow", "LangChain", "FastAPI", "RAG", "LLMs"].map((t) => (
                <div key={t} className="rounded-xl border border-border bg-white/[0.02] px-3 py-2 text-center font-mono text-muted-foreground">
                  {t}
                </div>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((st, i) => (
              <motion.div
                key={st.l}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-2xl glass p-6"
              >
                <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-30 blur-2xl transition-opacity group-hover:opacity-60" style={{ background: "var(--gradient-primary)" }} />
                <div className="relative font-display text-4xl font-bold text-gradient">
                  <CountUp end={st.v} suffix={st.s} />
                </div>
                <div className="relative mt-2 text-sm text-muted-foreground">{st.l}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- SKILLS ---------- */
function Skills() {
  return (
    <section id="skills" className="relative py-28">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader kicker="02 / Skills" title="Tooling & expertise." subtitle="A modern AI engineering stack across modeling, deployment and orchestration." />
        <div className="grid gap-6 md:grid-cols-2">
          {SKILLS.map((s, idx) => (
            <motion.div
              key={s.group}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="group relative overflow-hidden rounded-3xl glass p-7 transition-transform hover:-translate-y-1"
            >
              <div className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: "var(--gradient-radial-glow)" }} />
              <div className="mb-5 flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-xl text-primary-foreground" style={{ background: "var(--gradient-primary)" }}>
                  <s.icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-xl font-semibold">{s.group}</h3>
              </div>
              <div className="space-y-3">
                {s.items.map((it) => (
                  <SkillBar key={it.name} name={it.name} level={it.level} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 grid gap-3 md:grid-cols-5 sm:grid-cols-2">
          {["Problem Solving", "Communication", "Collaboration", "Adaptability", "Time Management"].map((s) => (
            <div key={s} className="rounded-xl border border-border bg-white/[0.02] px-4 py-3 text-center text-sm text-muted-foreground">
              {s}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillBar({ name, level }: { name: string; level: number }) {
  return (
    <div>
      <div className="mb-1 flex justify-between text-xs">
        <span className="text-muted-foreground">{name}</span>
        <span className="font-mono text-cyan">{level}%</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ background: "var(--gradient-primary)" }}
        />
      </div>
    </div>
  );
}

/* ---------- PROJECTS ---------- */
function Projects() {
  return (
    <section id="projects" className="relative py-28">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader kicker="03 / Projects" title="Selected work." subtitle="End-to-end ML & GenAI systems with production-ready APIs." />
        <div className="grid gap-7 md:grid-cols-2">
          {PROJECTS.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-3xl p-[1px] transition-transform hover:-translate-y-1"
              style={{ background: "var(--gradient-vivid)" }}
            >
              <div className="relative h-full rounded-3xl bg-background/90 p-7 backdrop-blur">
                <div className="mb-5 flex items-start justify-between">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl glass">
                    <p.icon className="h-5 w-5 text-cyan" />
                  </div>
                  <div className="flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                    <a href="https://github.com/laxminaryana" target="_blank" rel="noreferrer" className="rounded-full glass p-2 hover:bg-white/10">
                      <Github className="h-4 w-4" />
                    </a>
                    <a href="#" className="rounded-full glass p-2 hover:bg-white/10">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>

                <h3 className="font-display text-2xl font-semibold">{p.title}</h3>
                <p className="mt-1 text-sm text-cyan">{p.tagline}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.description}</p>

                <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
                  {p.bullets.map((b) => (
                    <li key={b} className="flex gap-2">
                      <Check className="mt-0.5 h-4 w-4 flex-none text-emerald" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap gap-1.5">
                  {p.stack.map((s) => (
                    <span key={s} className="rounded-md border border-border bg-white/[0.03] px-2 py-1 font-mono text-[11px] text-muted-foreground">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- EXPERIENCE ---------- */
function Experience() {
  return (
    <section id="experience" className="relative py-28">
      <div className="mx-auto max-w-5xl px-4">
        <SectionHeader kicker="04 / Experience" title="Where I've contributed." />
        <div className="relative">
          <div className="absolute left-4 top-0 hidden h-full w-px md:left-1/2 md:block" style={{ background: "linear-gradient(to bottom, transparent, oklch(0.68 0.19 252 / 0.5), transparent)" }} />
          <div className="space-y-10">
            {EXPERIENCE.map((e, i) => (
              <motion.div
                key={e.role}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6 }}
                className={`md:grid md:grid-cols-2 md:gap-10 ${i % 2 ? "md:[&>div:first-child]:order-2" : ""}`}
              >
                <div className="rounded-3xl glass p-7">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-xl text-primary-foreground" style={{ background: "var(--gradient-primary)" }}>
                      <Briefcase className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="font-display text-lg font-semibold">{e.role}</div>
                      <div className="text-sm text-cyan">{e.org}</div>
                    </div>
                  </div>
                  <div className="mb-4 font-mono text-xs text-muted-foreground">{e.period}</div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {e.points.map((pt) => (
                      <li key={pt} className="flex gap-2">
                        <span className="mt-2 h-1 w-1 flex-none rounded-full bg-cyan" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- EDUCATION ---------- */
function Education() {
  return (
    <section id="education" className="relative py-28">
      <div className="mx-auto max-w-5xl px-4">
        <SectionHeader kicker="05 / Education" title="Academic foundation." />
        <div className="grid gap-6 md:grid-cols-3">
          {EDUCATION.map((ed, i) => (
            <motion.div
              key={ed.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group rounded-3xl glass p-6 transition-transform hover:-translate-y-1"
            >
              <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl text-primary-foreground" style={{ background: "var(--gradient-emerald)" }}>
                <GraduationCap className="h-5 w-5" />
              </div>
              <h3 className="font-display text-lg font-semibold">{ed.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{ed.place}</p>
              <div className="mt-4 flex items-center justify-between font-mono text-xs">
                <span className="text-muted-foreground">{ed.period}</span>
                <span className="text-cyan">{ed.score}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- CERTS ---------- */
function Certifications() {
  return (
    <section className="relative py-28">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader kicker="06 / Certifications" title="Credentials & achievements." />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {CERTS.map((c, i) => (
            <motion.div
              key={c}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group flex items-center gap-3 rounded-2xl glass p-4 transition-all hover:bg-white/[0.07]"
            >
              <div className="grid h-10 w-10 flex-none place-items-center rounded-xl bg-white/5 text-cyan transition-colors group-hover:text-emerald">
                <Award className="h-5 w-5" />
              </div>
              <span className="text-sm">{c}</span>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            { title: "Co-Lead, GDSC AI/ML", desc: "Led the AI/ML division at GDSC during 2023–2024." },
            { title: "200+ Students Reached", desc: "Conducted hands-on workshops on TensorFlow & DL." },
            { title: "20+ Mentees", desc: "Guided junior developers on AI/ML career paths." },
          ].map((a) => (
            <div key={a.title} className="rounded-2xl glass p-5">
              <div className="font-display text-base font-semibold text-gradient">{a.title}</div>
              <p className="mt-1 text-sm text-muted-foreground">{a.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- CONTACT ---------- */
function Contact() {
  const [copied, setCopied] = useState(false);
  const email = "laxminarayana95150@gmail.com";

  const copy = async () => {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <section id="contact" className="relative py-28">
      <div className="mx-auto max-w-5xl px-4">
        <SectionHeader kicker="07 / Contact" title="Let's build something intelligent." subtitle="Open to ML Engineer / GenAI Developer roles, collaborations and research." />
        <div className="grid gap-6 lg:grid-cols-[1fr_1.3fr]">
          {/* Info card */}
          <div className="space-y-4">
            <div className="rounded-3xl glass p-6">
              <div className="mb-2 font-mono text-xs uppercase tracking-widest text-cyan">Email</div>
              <div className="flex items-center justify-between gap-2">
                <a href={`mailto:${email}`} className="truncate text-sm hover:text-cyan">{email}</a>
                <button onClick={copy} className="rounded-lg glass p-2 hover:bg-white/10" aria-label="Copy email">
                  {copied ? <Check className="h-4 w-4 text-emerald" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <div className="rounded-3xl glass p-6">
              <div className="mb-2 font-mono text-xs uppercase tracking-widest text-cyan">Phone</div>
              <a href="tel:+917330882231" className="text-sm hover:text-cyan">+91 73308 82231</a>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <SocialTile href="https://linkedin.com/in/laxminarayana-m" icon={Linkedin} label="LinkedIn" />
              <SocialTile href="https://github.com/laxminaryana" icon={Github} label="GitHub" />
            </div>
            <a
              href="/resume.pdf"
              download
              className="flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02]"
              style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-glow)" }}
            >
              <Download className="h-4 w-4" /> Download Resume
            </a>
          </div>

          {/* Form */}
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

function SocialTile({ href, icon: Icon, label }: { href: string; icon: typeof Github; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group flex items-center justify-between rounded-2xl glass p-4 transition-all hover:-translate-y-0.5 hover:bg-white/10"
    >
      <span className="flex items-center gap-3 text-sm">
        <Icon className="h-4 w-4 text-cyan" /> {label}
      </span>
      <ExternalLink className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
    </a>
  );
}

function ContactForm() {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
      setTimeout(() => setSent(false), 2400);
      (e.target as HTMLFormElement).reset();
    }, 1200);
  };

  return (
    <form onSubmit={onSubmit} className="rounded-3xl glass p-7">
      <div className="mb-4 flex items-center gap-2 font-mono text-xs text-muted-foreground">
        <Terminal className="h-4 w-4 text-cyan" />
        <span>~/contact</span>
        <span className="ml-auto flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-destructive/70" />
          <span className="h-2 w-2 rounded-full bg-yellow-400/70" />
          <span className="h-2 w-2 rounded-full bg-emerald/80" />
        </span>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Name" name="name" placeholder="Your name" required />
        <Field label="Email" name="email" type="email" placeholder="you@company.com" required />
      </div>
      <Field label="Subject" name="subject" placeholder="What's this about?" required />
      <div className="mt-4">
        <label className="mb-1 block font-mono text-xs uppercase tracking-widest text-muted-foreground">Message</label>
        <textarea
          name="message"
          required
          rows={5}
          placeholder="Tell me about your project or role..."
          className="w-full resize-none rounded-xl border border-border bg-white/[0.03] px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
        />
      </div>
      <button
        type="submit"
        disabled={sending}
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.01] disabled:opacity-70"
        style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-glow)" }}
      >
        {sending ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
            Sending...
          </>
        ) : sent ? (
          <>
            <Check className="h-4 w-4" /> Message sent
          </>
        ) : (
          <>
            <Mail className="h-4 w-4" /> Send Message
          </>
        )}
      </button>
    </form>
  );
}

function Field({ label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <div>
      <label className="mb-1 block font-mono text-xs uppercase tracking-widest text-muted-foreground">{label}</label>
      <input
        {...props}
        className="w-full rounded-xl border border-border bg-white/[0.03] px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
      />
    </div>
  );
}

/* ---------- FOOTER ---------- */
function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-sm text-muted-foreground md:flex-row">
        <div>© {new Date().getFullYear()} M. Laxmi Narayana. Crafted with code &amp; curiosity.</div>
        <div className="font-mono text-xs">Built with React · TanStack · Framer Motion</div>
      </div>
    </footer>
  );
}

/* ---------- BACK TO TOP ---------- */
function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <button
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-6 right-6 z-40 grid h-11 w-11 place-items-center rounded-full text-primary-foreground shadow-lg transition-all ${show ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"}`}
      style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-glow)" }}
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}

/* ---------- FLOATING SOCIALS ---------- */
function FloatingSocials() {
  const items = [
    { href: "https://github.com/laxminaryana", icon: Github },
    { href: "https://linkedin.com/in/laxminarayana-m", icon: Linkedin },
    { href: "mailto:laxminarayana95150@gmail.com", icon: Mail },
    { href: "tel:+917330882231", icon: Phone },
  ];
  return (
    <div className="fixed left-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-3 lg:flex">
      {items.map((it, i) => (
        <a
          key={i}
          href={it.href}
          target="_blank"
          rel="noreferrer"
          className="grid h-10 w-10 place-items-center rounded-full glass text-muted-foreground transition-all hover:-translate-y-0.5 hover:text-cyan"
        >
          <it.icon className="h-4 w-4" />
        </a>
      ))}
      <div className="mx-auto h-12 w-px bg-border" />
    </div>
  );
}
