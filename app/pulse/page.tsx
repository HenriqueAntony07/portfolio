"use client";
import React, { useEffect, useMemo, useRef } from "react";
import "./pulse.css";
import { LayoutTemplate, ShoppingBag, Wrench, PencilRuler, Search, Gauge, ArrowUpRight, Images } from "lucide-react";
import { Navbar } from "../components/Navbar";

type Tool = {
  label: string;
  Icon: React.ComponentType<{ size?: number; className?: string }>;
};

type Section = {
  id: string;
  title: string;
  subtitle?: string;
  bullets?: string[];
  imageSrc: string;
  imageAlt: string;
};

const LIVE_URL = "https://pulsesexshop.com.br/"; // <-- coloque o link do projeto (ou remova o botão)

const SECTIONS: Section[] = [
  {
    id: "s1",
    title: "Home — identidade e posicionamento",
    subtitle: "Hero premium, tipografia limpa e foco em conversão.",
    bullets: ["Layout Dior-like", "Header refinado", "Mobile-first"],
    imageSrc: "/pulse/home.png",
    imageAlt: "Pulse - Home",
  },
  {
    id: "s2",
    title: "Loja — navegação e destaque visual",
    subtitle: "Categorias com hierarquia clara e estética elegante.",
    bullets: ["Grid consistente", "Filtros", "UX otimizada"],
    imageSrc: "/pulse/loja.png",
    imageAlt: "Pulse - Loja",
  },
];

export default function PulsePage() {
  const heroRef = useRef<HTMLElement | null>(null);

  const tools: Tool[] = useMemo(
    () => [
      { label: "Figma", Icon: PencilRuler },
      { label: "Elementor", Icon: LayoutTemplate },
      { label: "WooCommerce", Icon: ShoppingBag },
      { label: "JetPlugins", Icon: Wrench },
      { label: "SEO", Icon: Search },
      { label: "Performance", Icon: Gauge },
    ],
    []
  );

  // Fade on scroll (mesmo esquema do seu projeto)
  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll<HTMLElement>(".reveal-on-scroll")
    );

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.12 }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Parallax sutil no hero (via CSS variable)
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) return;

    let raf = 0;

    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;

        const rect = hero.getBoundingClientRect();
        const vh = window.innerHeight || 1;

        // progresso dentro do viewport (-1 a 1 aprox)
        const progress = (rect.top + rect.height * 0.2) / vh;
        const px = Math.max(-18, Math.min(18, (progress - 0.5) * 28)); // bem sutil

        hero.style.setProperty("--hero-parallax", `${px}px`);
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  return (
    
    <main className="pulse-page"> <Navbar />
      
      {/* HERO FULL IMAGE */}
      <header ref={heroRef} className="pulse-heroImage reveal-on-scroll">
        <img
          className="pulse-heroImage__bg"
          src="/pulse/hero.png"
          alt="Preview do projeto Pulse"
        />

        <div className="pulse-heroImage__overlay" aria-hidden="true" />

        <div className="pulse-heroImage__content">
          <div className="pulse-heroImage__wrap">
            <h1 className="pulse-heroTitle">Pulse — Sex Shop</h1>
            <p className="pulse-heroSubtitle">
              Projeto premium com foco em conversão, UX e performance.
            </p>

            <div className="pulse-chips" aria-label="Ferramentas usadas">
              {tools.map(({ label, Icon }) => (
                <span key={label} className="pulse-chip">
                  <Icon size={14} className="pulse-chip__icon" />
                  {label}
                </span>
              ))}
            </div>

            <div className="pulse-heroCtas">
              {LIVE_URL && (
                <a
                  href={LIVE_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="pulse-cta pulse-cta--primary"
                >
                  Ver ao vivo <ArrowUpRight size={16} />
                </a>
              )}

              <a href="#pulse-sections" className="pulse-cta pulse-cta--ghost">
                Ver telas <Images size={16} />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* CONTEÚDO */}
      <section id="pulse-sections" className="pulse-stack">
        {SECTIONS.map((s, idx) => (
          <article
            key={s.id}
            className={`pulse-section reveal-on-scroll ${
              idx % 2 === 1 ? "pulse-section--flip" : ""
            }`}
          >
            <div className="pulse-section__content">
              <h2 className="pulse-h2">{s.title}</h2>
              {s.subtitle && <p className="pulse-p">{s.subtitle}</p>}

              {s.bullets?.length ? (
                <ul className="pulse-list">
                  {s.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              ) : null}
            </div>

            <div className="pulse-section__media">
              <div className="pulse-mediaCard">
                <img src={s.imageSrc} alt={s.imageAlt} className="pulse-img" />
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
