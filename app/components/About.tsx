"use client";

import { useEffect, useRef } from "react";
import { ChartNoAxesCombined, Sparkles, SearchCheck } from "lucide-react";
import "./About.css";

/* Nested card content */
const highlights = [
  {
    title: "Mentalidade de escalabilidade",
    description:
      "Desde o armazenamento de banco de dados até componentes de front-end reutilizáveis, construo bases que se adaptam às ambições do fundador.",
    Icon: ChartNoAxesCombined,
  },
  {
    title: "Multiplique por 10 a sua presença online",
    description:
      "Desde interfaces de usuário semânticas até blogs organizados por tópicos, meu foco é em acessibilidade e SEO que superam seus concorrentes.",
    Icon: SearchCheck,
  },
  {
    title: "Interações estratégicas",
    description:
      "Seja uma simples mudança na cor de um botão ou um recurso baseado em psicologia para aumentar as conversões, eu otimizo com intenção.",
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
              Sobre mim
            </span>
            <h2
              id="about-heading"
              className="text-balance text-3xl font-semibold tracking-tight sm:text-5xl"
            >
              Oferecer experiências digitais imersivas aos usuários.
            </h2>
            <p className="max-w-3xl text-balance text-base text-muted-foreground sm:text-lg">
              Crio e desenvolvo produtos React/Next.js que são extremamente rápidos, têm bom posicionamento nos resultados de busca e são intuitivos de usar.
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
