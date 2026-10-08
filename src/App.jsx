import React, {
  Suspense,
  lazy,
  useEffect,
  useMemo,
  useState,
} from "react";

import { motion, AnimatePresence } from "framer-motion";
import Lenis from "lenis";

import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ExternalLink,
  Instagram,
  Layers3,
  Mail,
  Menu,
  MessageCircle,
  MousePointer2,
  Send,
  Sparkles,
  Target,
  TrendingUp,
  X,
  Zap,
  Quote,
} from "lucide-react";

import { siteData as data } from "./data/siteData";
import { Section } from "./components/Section";
import Counter from "./components/Counter";
import CustomCursor from "./components/CustomCursor";
import Lightbox from "./components/Lightbox";
import VideoCard from "./components/VideoCard";

const Scene3D = lazy(() => import("./components/Scene3D"));

const nav = [
  ["home", "Home"],
  ["about", "About"],
  ["services", "Services"],
  ["video-testimonials", "Video Testimonials"],
  ["work", "Work"],
  ["reviews", "Reviews"],
  ["contact", "Contact"],
];

const iconMap = {
  growth: TrendingUp,
  ads: Target,
  content: Layers3,
  reels: Zap,
};

function useActiveSection() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-35% 0px -55% 0px",
      }
    );

    nav.forEach(([id]) => {
      const element = document.getElementById(id);

      if (element) {
        obs.observe(element);
      }
    });

    return () => obs.disconnect();
  }, []);

  return active;
}

function App() {
  const active = useActiveSection();

  const [menu, setMenu] = useState(false);
  const [lightbox, setLightbox] = useState(-1);
  const [testimonial, setTestimonial] = useState(0);
  const [filter, setFilter] = useState("All");
  const [formState, setFormState] = useState("idle");

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
    });

    let raf;

    const loop = (time) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const handler = (event) => {
      if (event.key === "Escape") {
        setMenu(false);
      }
    };

    window.addEventListener("keydown", handler);

    return () => {
      window.removeEventListener("keydown", handler);
    };
  }, []);

  const filters = [
    "All",
    "Organic Growth",
    "Meta + Content",
    "Short Form",
  ];

  const projects = useMemo(() => {
    return data.projects.filter(
      (project) =>
        filter === "All" || project.category === filter
    );
  }, [filter]);

  const submit = async (event) => {
    event.preventDefault();

    setFormState("sending");

    const formData = new FormData(event.currentTarget);

    if (data.formspreeEndpoint) {
      try {
        const response = await fetch(data.formspreeEndpoint, {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Form submission failed");
        }

        setFormState("sent");
        event.currentTarget.reset();
      } catch {
        setFormState("error");
      }
    } else {
      const subject = encodeURIComponent(
        `Portfolio enquiry — ${
          formData.get("name") || "New lead"
        }`
      );

      const body = encodeURIComponent(
        `Name: ${formData.get("name") || ""}
Email: ${formData.get("email") || ""}
Company: ${formData.get("company") || ""}

${formData.get("message") || ""}`
      );

      window.location.href = `mailto:${data.email}?subject=${subject}&body=${body}`;

      setFormState("sent");
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#07070a] text-white">
      <CustomCursor />

      {/* =========================
          HEADER / NAVBAR
      ========================== */}

      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[.06] bg-[#07070a]/65 backdrop-blur-xl">
        <div className="mx-auto flex h-[76px] w-[min(1180px,92%)] items-center justify-between">
          <a
            href="#home"
            className="font-display text-lg font-bold tracking-tight"
          >
            <span className="text-white">HVS</span>
            <span className="ml-1 text-violet-400">.</span>
          </a>

          <nav className="hidden items-center gap-1 md:flex">
            {nav.map(([id, label]) => (
              <a
                key={id}
                href={`#${id}`}
                className={`rounded-full px-3 py-2 text-sm transition ${
                  active === id
                    ? "bg-white/10 text-white"
                    : "text-white/55 hover:bg-white/5 hover:text-white"
                }`}
              >
                {label}
              </a>
            ))}
          </nav>

          <a
            href={`https://wa.me/${data.whatsapp}?text=${encodeURIComponent(
              "Hi Harsh, I want to discuss a growth/performance marketing project."
            )}`}
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-full bg-white px-4 py-2 text-sm font-bold text-black transition hover:scale-105 md:inline-flex"
          >
            Let's talk
          </a>

          <button
            onClick={() => setMenu((value) => !value)}
            className="rounded-full border border-white/10 p-2 md:hidden"
            aria-label="Toggle menu"
          >
            {menu ? <X /> : <Menu />}
          </button>
        </div>

        <AnimatePresence>
          {menu && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-white/10 md:hidden"
            >
              <div className="mx-auto grid w-[92%] gap-1 py-3">
                {nav.map(([id, label]) => (
                  <a
                    onClick={() => setMenu(false)}
                    key={id}
                    href={`#${id}`}
                    className="rounded-xl px-4 py-3 text-white/70 hover:bg-white/5"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        {/* =========================
            HERO
        ========================== */}

        <section
          id="home"
          className="relative min-h-screen overflow-hidden pt-28 grid-bg"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(139,92,246,.24),transparent_34%),radial-gradient(circle_at_15%_70%,rgba(34,211,238,.10),transparent_28%)]" />

          <Suspense fallback={null}>
            <Scene3D />
          </Suspense>

          <div className="relative mx-auto flex min-h-[calc(100vh-7rem)] w-[min(1180px,92%)] items-center py-16">
            <div className="grid w-full items-center gap-14 lg:grid-cols-[1.1fr_.9fr]">
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white/70 backdrop-blur"
                >
                  <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                  Available for selected projects
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.1,
                    duration: 0.75,
                  }}
                  className="font-display text-[clamp(3.3rem,8vw,7.6rem)] font-bold leading-[.88] tracking-[-.07em]"
                >
                  {data.name.split(" ").map((word, index) => (
                    <React.Fragment key={`${word}-${index}`}>
                      {index > 0 && " "}
                      <span
                        className={
                          index === data.name.split(" ").length - 1
                            ? "text-gradient"
                            : ""
                        }
                      >
                        {word}
                      </span>
                    </React.Fragment>
                  ))}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.22 }}
                  className="mt-8 max-w-2xl text-lg leading-8 text-white/65 sm:text-xl"
                >
                  {data.role}.{" "}
                  <span className="text-white/90">
                    {data.tagline}
                  </span>
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-8 flex flex-wrap gap-3"
                >
                  <a
                    href="#contact"
                    className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-bold text-black transition hover:scale-[1.03]"
                  >
                    Hire me
                    <ArrowRight
                      size={17}
                      className="transition group-hover:translate-x-1"
                    />
                  </a>

                  <a
                    href="#work"
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 font-semibold backdrop-blur hover:bg-white/10"
                  >
                    View work
                    <MousePointer2 size={16} />
                  </a>
                </motion.div>

                <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm text-white/45">
                  <span className="inline-flex items-center gap-2">
                    <CheckCircle2
                      size={15}
                      className="text-emerald-400"
                    />
                    Organic + paid growth
                  </span>

                  <span className="inline-flex items-center gap-2">
                    <CheckCircle2
                      size={15}
                      className="text-emerald-400"
                    />
                    Strategy-first creative
                  </span>

                  <span className="inline-flex items-center gap-2">
                    <CheckCircle2
                      size={15}
                      className="text-emerald-400"
                    />
                    Data-led execution
                  </span>
                </div>
              </div>

              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.92,
                  y: 30,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.15,
                  duration: 0.8,
                }}
                className="relative mx-auto w-full max-w-[470px]"
              >
                <div className="absolute -inset-8 rounded-[3rem] bg-violet-600/20 blur-3xl" />

                <div className="relative overflow-hidden rounded-[2.4rem] border border-white/15 bg-white/5 p-2 shadow-2xl backdrop-blur">
                  <div className="relative overflow-hidden rounded-[2rem]">
                    <img
                      src={data.profileImage}
                      alt={`${data.name} portrait`}
                      className="h-[560px] w-full object-cover object-top sm:h-[620px]"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#07070a] via-transparent to-violet-500/10" />

                    <div className="absolute bottom-5 left-5 right-5 glass rounded-2xl p-4">
                      <div className="flex items-end justify-between gap-4">
                        <div>
                          <p className="text-xs uppercase tracking-[.22em] text-white/45">
                            Proof of work
                          </p>

                          <p className="mt-1 text-xl font-bold">
                            30M+ client views
                          </p>
                        </div>

                        <div className="rounded-full bg-white p-2 text-black">
                          <TrendingUp size={19} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-xs uppercase tracking-[.25em] text-white/30 sm:flex">
            <ChevronDown size={15} />
            Scroll to explore
          </div>
        </section>

        {/* =========================
            ABOUT
        ========================== */}

        <Section
          id="about"
          eyebrow="01 / About"
          title="Growth is not a guess. It is a system."
        >
          <div className="grid gap-8 lg:grid-cols-[1.05fr_.95fr]">
            <div className="glass rounded-[2rem] p-7 sm:p-10">
              <p className="text-xl leading-9 text-white/75">
                {data.bio}
              </p>

              <p className="mt-6 leading-7 text-white/45">
                {data.proof}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <span className="rounded-full bg-violet-500/10 px-4 py-2 text-sm text-violet-200">
                  Organic growth
                </span>

                <span className="rounded-full bg-cyan-500/10 px-4 py-2 text-sm text-cyan-200">
                  Meta Ads
                </span>

                <span className="rounded-full bg-white/5 px-4 py-2 text-sm text-white/70">
                  Creative strategy
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {data.stats.map((stat, index) => {
                const isFollowerStat = stat.label
                  .toLowerCase()
                  .includes("follower");

                const isNonFollowerStat = stat.label
                  .toLowerCase()
                  .includes("non-follower");

                return (
                  <motion.div
                    key={stat.label}
                    initial={{
                      opacity: 0,
                      y: 18,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      delay: index * 0.06,
                    }}
                    className="glass rounded-3xl p-6 sm:p-7"
                  >
                    <div className="font-display text-4xl font-bold tracking-tight text-gradient sm:text-5xl">
                      {isFollowerStat && !isNonFollowerStat ? (
                        <Counter
                          value={10}
                          suffix="K+"
                        />
                      ) : isNonFollowerStat ? (
                        <Counter
                          value={98.6}
                          suffix="%"
                        />
                      ) : (
                        <Counter
                          value={stat.value}
                          suffix={stat.suffix}
                        />
                      )}
                    </div>

                    <p className="mt-3 text-sm leading-6 text-white/45">
                      {isFollowerStat && !isNonFollowerStat
                        ? "Last month"
                        : isNonFollowerStat
                        ? "Non-follower reach on a 30-day snapshot"
                        : stat.label}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </Section>

        {/* =========================
            SERVICES
        ========================== */}

        <Section
          id="services"
          eyebrow="02 / Services"
          title="Built around the outcome, not the deliverable."
        >
          <div className="grid gap-4 md:grid-cols-2">
            {data.services.map((service, index) => {
              const Icon =
                iconMap[service.icon] || Sparkles;

              return (
                <motion.article
                  key={service.title}
                  initial={{
                    opacity: 0,
                    y: 22,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    delay: index * 0.08,
                  }}
                  whileHover={{
                    y: -8,
                    rotateX: 2,
                    rotateY: -2,
                  }}
                  className="glass group rounded-[2rem] p-7 transition-shadow hover:shadow-[0_30px_100px_rgba(139,92,246,.12)] sm:p-8"
                >
                  <div className="flex items-start justify-between">
                    <div className="rounded-2xl bg-violet-500/10 p-3 text-violet-300">
                      <Icon />
                    </div>

                    <span className="text-sm text-white/20">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="mt-8 text-2xl font-bold">
                    {service.title}
                  </h3>

                  <p className="mt-3 max-w-lg leading-7 text-white/45">
                    {service.text}
                  </p>

                  <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-white/70">
                    Explore service

                    <ArrowRight
                      size={15}
                      className="transition group-hover:translate-x-1"
                    />
                  </div>
                </motion.article>
              );
            })}
          </div>
        </Section>

        {/* =========================
            VIDEO TESTIMONIALS
        ========================== */}

        <Section
          id="video-testimonials"
          eyebrow="03 / Video Testimonials"
          title="Hear it from the people behind the numbers."
          className="bg-[radial-gradient(circle_at_50%_0%,rgba(139,92,246,.12),transparent_45%)]"
        >
          <div className="mb-7 flex items-end justify-between gap-4">
            <div>
              <p className="max-w-2xl text-lg leading-8 text-white/45">
                Real people. Real experiences. Real results.
              </p>
            </div>

            <div className="hidden gap-2 sm:flex">
              <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/40">
                Lazy loaded
              </span>

              <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/40">
                Optimized MP4
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {data.reviewVideos.map((video) => (
              <div
                key={video.src}
                className="min-w-0 w-full"
              >
                <VideoCard video={video} />
              </div>
            ))}
          </div>
        </Section>

        {/* =========================
            WORK
        ========================== */}

        <Section
          id="work"
          eyebrow="04 / Selected work"
          title="Proof that looks like performance."
        >
          <div className="mb-7 flex flex-wrap gap-2">
            {filters.map((item) => (
              <button
                key={item}
                onClick={() => setFilter(item)}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                  filter === item
                    ? "border-white bg-white text-black"
                    : "border-white/10 bg-white/5 text-white/55 hover:bg-white/10"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <motion.article
                layout
                key={project.title}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/[.035]"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                  <span className="absolute left-4 top-4 rounded-full bg-black/50 px-3 py-1 text-xs font-semibold backdrop-blur">
                    {project.category}
                  </span>

                  <span className="absolute bottom-4 right-4 rounded-full bg-white px-3 py-1 text-xs font-black text-black">
                    {project.metric}
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold">
                    {project.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-white/45">
                    {project.description}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>

          <div className="mt-8 rounded-3xl border border-dashed border-white/15 bg-white/[.025] p-6 text-sm text-white/45">
            <span className="font-semibold text-white/75">
              Case-study note:
            </span>{" "}
            The uploaded screenshots are used as
            proof-of-work snapshots. Replace project names,
            context and outcomes in{" "}
            <code className="rounded bg-white/5 px-1.5 py-0.5 text-violet-200">
              src/data/siteData.js
            </code>{" "}
            as client case studies are approved.
          </div>
        </Section>

        {/* =========================
            REVIEWS
        ========================== */}

        <Section
          id="reviews"
          eyebrow="05 / Client proof"
          title="Real screenshots. Real reactions."
          className="bg-[radial-gradient(circle_at_50%_0%,rgba(139,92,246,.12),transparent_45%)]"
        >
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {data.reviewImages.map((source, index) => (
              <motion.button
                key={source}
                initial={{
                  opacity: 0,
                  scale: 0.98,
                }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: index * 0.05,
                }}
                onClick={() => setLightbox(index)}
                className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[.03] text-left"
              >
                <img
                  src={source}
                  alt={`Client analytics screenshot ${
                    index + 1
                  }`}
                  loading="lazy"
                  className="aspect-[9/16] w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                />

                <div className="p-4 text-sm font-semibold text-white/65">
                  Open proof screenshot{" "}
                  <span className="text-violet-300">
                    ↗
                  </span>
                </div>
              </motion.button>
            ))}
          </div>

          <div className="relative mx-auto mt-14 max-w-3xl text-center">
            <Quote
              className="mx-auto text-violet-400/60"
              size={34}
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={testimonial}
                initial={{
                  opacity: 0,
                  x: 20,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                exit={{
                  opacity: 0,
                  x: -20,
                }}
                className="mt-5"
              >
                <p className="text-2xl font-semibold leading-9 sm:text-3xl">
                  “
                  {data.testimonials[testimonial].quote}
                  ”
                </p>

                <p className="mt-5 text-sm text-white/40">
                  {data.testimonials[testimonial].name}{" "}
                  ·{" "}
                  {data.testimonials[testimonial].role}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="mt-6 flex justify-center gap-2">
              {data.testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setTestimonial(index)}
                  aria-label={`Show testimonial ${
                    index + 1
                  }`}
                  className={`h-2 rounded-full transition-all ${
                    index === testimonial
                      ? "w-8 bg-white"
                      : "w-2 bg-white/20"
                  }`}
                />
              ))}
            </div>
          </div>
        </Section>

        {/* =========================
            CONTACT
        ========================== */}

        <Section
          id="contact"
          eyebrow="06 / Contact"
          title="Have an offer worth growing? Let's build the engine."
        >
          <div className="grid gap-7 lg:grid-cols-[.8fr_1.2fr]">
            <div className="glass rounded-[2rem] p-7 sm:p-9">
              <p className="text-lg leading-8 text-white/65">
                Tell me what you are selling, where you
                are stuck and what success looks like.
                I’ll reply with the clearest next step.
              </p>

              <div className="mt-8 space-y-4">
                <a
                  href={`https://wa.me/${data.whatsapp}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 rounded-2xl bg-emerald-500/10 p-4 transition hover:bg-emerald-500/15"
                >
                  <span className="rounded-xl bg-emerald-500 p-2 text-black">
                    <MessageCircle size={18} />
                  </span>

                  <div>
                    <p className="text-xs uppercase tracking-widest text-white/35">
                      WhatsApp
                    </p>

                    <p className="mt-1 font-semibold">
                      {data.phone}
                    </p>
                  </div>
                </a>

                <a
                  href={`mailto:${data.email}`}
                  className="flex items-center gap-4 rounded-2xl bg-white/5 p-4 transition hover:bg-white/8"
                >
                  <span className="rounded-xl bg-white/10 p-2">
                    <Mail size={18} />
                  </span>

                  <div>
                    <p className="text-xs uppercase tracking-widest text-white/35">
                      Email
                    </p>

                    <p className="mt-1 font-semibold">
                      {data.email}
                    </p>
                  </div>
                </a>

                {data.instagram && (
                  <a
                    href={data.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-4 rounded-2xl bg-white/5 p-4"
                  >
                    <Instagram size={20} />

                    <span>Instagram</span>

                    <ExternalLink
                      size={15}
                      className="ml-auto text-white/30"
                    />
                  </a>
                )}
              </div>
            </div>

            <form
              onSubmit={submit}
              className="glass rounded-[2rem] p-7 sm:p-9"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="text-sm text-white/55">
                  Name

                  <input
                    name="name"
                    required
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-white outline-none transition focus:border-violet-400"
                    placeholder="Your name"
                  />
                </label>

                <label className="text-sm text-white/55">
                  Email

                  <input
                    name="email"
                    type="email"
                    required
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-white outline-none transition focus:border-violet-400"
                    placeholder="you@company.com"
                  />
                </label>
              </div>

              <label className="mt-4 block text-sm text-white/55">
                Company / Brand

                <input
                  name="company"
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-white outline-none transition focus:border-violet-400"
                  placeholder="Brand name"
                />
              </label>

              <label className="mt-4 block text-sm text-white/55">
                What are you trying to grow?

                <textarea
                  name="message"
                  required
                  rows="5"
                  className="mt-2 w-full resize-none rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-white outline-none transition focus:border-violet-400"
                  placeholder="Tell me about the offer, audience, current numbers and goal..."
                />
              </label>

              <div className="mt-5 flex flex-wrap items-center gap-4">
                <button
                  disabled={formState === "sending"}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-bold text-black transition hover:scale-[1.02] disabled:opacity-60"
                >
                  {formState === "sending"
                    ? "Sending..."
                    : "Send enquiry"}

                  <Send size={16} />
                </button>

                <a
                  href={`https://wa.me/${data.whatsapp}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 font-semibold hover:bg-white/10"
                >
                  Or WhatsApp

                  <MessageCircle size={16} />
                </a>
              </div>

              {formState === "sent" && (
                <p className="mt-4 text-sm text-emerald-300">
                  Thanks — your enquiry is ready. I’ll get
                  back to you soon.
                </p>
              )}

              {formState === "error" && (
                <p className="mt-4 text-sm text-red-300">
                  The form endpoint rejected the message.
                  You can use WhatsApp or email below.
                </p>
              )}

              {!data.formspreeEndpoint && (
                <p className="mt-4 text-xs text-white/25">
                  Form is configured with a mailto fallback.
                  Add a Formspree endpoint in{" "}
                  <code>siteData.js</code> for server-side
                  submissions.
                </p>
              )}
            </form>
          </div>
        </Section>
      </main>

      {/* =========================
          FOOTER
      ========================== */}

      <footer className="border-t border-white/8 py-10">
        <div className="mx-auto flex w-[min(1180px,92%)] flex-col justify-between gap-5 text-sm text-white/35 sm:flex-row">
          <div>
            <span className="font-bold text-white/75">
              {data.name}
            </span>

            <span className="mx-2">·</span>

            Growth & Performance Marketing
          </div>

          <div className="flex gap-5">
            <a
              href="#home"
              className="hover:text-white"
            >
              Back to top ↑
            </a>

            <a
              href={`mailto:${data.email}`}
              className="hover:text-white"
            >
              Email
            </a>

            <a
              href={`https://wa.me/${data.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="hover:text-white"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </footer>

      {/* =========================
          LIGHTBOX
      ========================== */}

      <Lightbox
        items={data.reviewImages}
        index={lightbox}
        onClose={() => setLightbox(-1)}
        onPrev={() =>
          setLightbox(
            (index) =>
              (index -
                1 +
                data.reviewImages.length) %
              data.reviewImages.length
          )
        }
        onNext={() =>
          setLightbox(
            (index) =>
              (index + 1) %
              data.reviewImages.length
          )
        }
      />
    </div>
  );
}

export default App;