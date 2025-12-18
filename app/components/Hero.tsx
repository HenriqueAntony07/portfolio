import { PhoneOutgoing } from "lucide-react";
import "./Hero.css";

export const Hero = () => {
  return (
    <section
      id="home"
      aria-labelledby="home-heading"
      className="relative isolate"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="hero-surface relative overflow-hidden rounded-3xl bg-[var(--background)]/80 px-6 py-16 text-center backdrop-blur-sm sm:px-12 sm:py-20 lg:px-16 lg:py-24">
          <div className="hero-glow" aria-hidden="true" />
          <header className="flex flex-col items-center gap-8">
            <span className="hero-status inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium text-muted-foreground">
              <span aria-hidden="true" className="status-indicator h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="inline-flex items-center gap-1">
                Available for new projects
              </span>
            </span>

            <div className="space-y-4">
              <h1
                id="home-heading"
                className="text-balance text-4xl font-semibold tracking-tight sm:text-6xl lg:text-7xl"
              >
                Chad Probert
              </h1>
              <p className="text-balance text-xl text-muted-foreground sm:text-2xl">
                Web Developer
              </p>
            </div>

            <div className="mt-10 hero-actions flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <a
                href="#contact"
                className="call-to-action inline-flex items-center gap-2 rounded-2xl border px-6 py-3 text-base font-medium transition-colors duration-300 hover:bg-foreground/5"
              >
                <PhoneOutgoing className="mr-1 h-5 w-5" strokeWidth={2} />
                Get in Touch
              </a>
            </div>
          </header>
        </div>
      </div>
    </section>
  );
};
