"use client";

import { useEffect, useRef } from "react";
import { ChartNoAxesCombined, Sparkles, SearchCheck } from "lucide-react";
import "./About.css";

/* Nested card content */
const highlights = [
  {
    title: "Scalability mindset",
    description:
      "From database storage to reusable front-end components, I build foundations that scale with the founder's ambitions.",
    Icon: ChartNoAxesCombined,
  },
  {
    title: "10x Your web presence",
    description:
      "From semantic UI to topic-cluster blogs, I focus on accessibility and SEO that outperforms your competitors.",
    Icon: SearchCheck,
  },
  {
    title: "Strategic iterations",
    description:
      "Whether it's a simple button-color change, or a psychology-driven feature to boost conversions, I optimize with intention.",
    Icon: Sparkles,
  },
];

export const About = () => {
  const cardRef = useRef<HTMLDivElement>(null);

  /* For reveal-on-scroll animation */
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { root: null, rootMargin: "0px", threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="about-section mb-30 lg:mb-50"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div
          ref={cardRef}
          className="about-card reveal-on-scroll rounded-3xl bg-[var(--background)]/80 px-6 py-12 text-center backdrop-blur-sm sm:px-12 sm:py-16"
        >
          <header className="flex flex-col items-center gap-4">
            <span className="about-chip inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium text-muted-foreground">
              <span aria-hidden className="about-chip__dot" />
              About Me
            </span>
            <h2
              id="about-heading"
              className="text-balance text-3xl font-semibold tracking-tight sm:text-5xl"
            >
              Shipping immersive digital experiences to users.
            </h2>
            <p className="max-w-3xl text-balance text-base text-muted-foreground sm:text-lg">
              I design and ship React/Next.js products that are blazing fast, rank well in search, and are intuitive to use.
            </p>
          </header>

          <div className="about-grid mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {highlights.map(({ title, description, Icon }) => (
              <article
                key={title}
                className="about-highlight flex h-full flex-col gap-3 rounded-2xl border border-border/60 bg-[var(--background)]/70 p-6 text-left shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-foreground/40 hover:shadow-lg hover:shadow-black/10"
              >
                <span className="about-highlight__icon inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-foreground/10 text-foreground">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="text-base font-semibold text-foreground">
                  {title}
                </h3>
                <p className="text-sm text-muted-foreground">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
