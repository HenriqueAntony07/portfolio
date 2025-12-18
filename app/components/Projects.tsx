"use client";

import { useEffect } from "react";
import { ArrowUpRight, Github } from "lucide-react";
import "./Projects.css";
import Image from "next/image";

type Project = {
  title: string;
  description: string;
  demoUrl?: string;
  repoUrl?: string;
  previewSide: "left" | "right";
  previewImage: string;
  previewAlt: string;
};

const projects: Project[] = [
  {
    title: "Celerity — New Tab Page",
    description:
      "Celerity is a customisable new tab page featuring lightning-fast search, developer-inspired themes, and productivity shortcuts.",
    demoUrl: "https://chadprobert.github.io/celerity/",
    repoUrl: "https://github.com/ChadProbert/celerity",
    previewSide: "right",
    previewImage: "/project-images/Celerity.png",
    previewAlt: "Screenshot of the Celerity custom new tab page designed by Chad Probert",
  },
  {
    title: "Dev Trends",
    description:
      "A user-centric web app that consumes the DEV Community API to surface trending development articles with category filters and favourites.",
    repoUrl: "https://github.com/ChadProbert/dev-trends",
    previewSide: "left",
    previewImage: "/project-images/Devtrends.png",
    previewAlt: "Screenshot of the Dev Trends article dashboard built by Chad Probert",
  },
];

const projectSchema = projects.map((project) => {
  const structured: Record<string, unknown> = {
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    url: project.demoUrl ?? project.repoUrl ?? "https://chad-probert-portfolio.vercel.app/",
    image: `https://chad-probert-portfolio.vercel.app${project.previewImage}`,
    creator: {
      "@type": "Person",
      name: "Chad Probert",
    },
  };

  if (project.repoUrl) {
    structured.sameAs = [project.repoUrl];
  }

  return structured;
});

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const ProjectCard = ({
  title,
  description,
  demoUrl,
  repoUrl,
  previewSide,
  previewImage,
  previewAlt,
}: Project) => {
  const headingId = `project-${slugify(title)}`;

  return (
    <article
      className="w-[90%] lg:w-full project-reveal reveal-on-scroll flex flex-col lg:flex-row items-stretch gap-8 lg:gap-20 p-8 lg:p-12 rounded-2xl border bg-card justify-center mx-auto"
      itemScope
      itemType="https://schema.org/CreativeWork"
      aria-labelledby={headingId}
    >
      <div
        className={`w-full max-w-md ${previewSide === "left" ? "lg:order-1" : "lg:order-2"}`}
      >
        <div className="group w-full h-44 sm:h-52 md:h-56 lg:h-48 xl:h-56 rounded-sm bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 relative overflow-hidden transform transition-transform duration-300 ease-out hover:scale-[1.10]">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="grid grid-cols-3 gap-2 opacity-80">
              <a
                href={demoUrl ?? repoUrl ?? "#projects"}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={previewImage}
                  alt={previewAlt}
                  className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-110"
                  sizes="(max-width: 1024px) 100vw, 420px"
                  fill
                  priority={title === "Celerity - New Tab Page"}
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`flex flex-col gap-3 ${previewSide === "left" ? "lg:order-2" : "lg:order-1"}`}
      >
        <span className="text-sm font-medium mb-0">Featured Project</span>
        <h3
          id={headingId}
          className="text-2xl sm:text-3xl font-semibold tracking-wide mb-3"
          itemProp="name"
        >
          {title}
        </h3>
        <p className="text-base mb-2 sm:w-[50%] lg:w-[75%]" itemProp="description">
          {description}
        </p>
        <div className="mt-2 flex items-center gap-2">
          {demoUrl && (
            <a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="demo-button inline-flex items-center font-medium rounded-xl border-1 px-4 py-2 text-base transition-colors duration-400"
              itemProp="url"
            >
              <ArrowUpRight className="mr-1 h-5 w-5" /> Demo
            </a>
          )}
          {repoUrl && (
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-xl border-1 hover:bg-foreground/5 px-4 py-2 text-base transition-colors duration-400"
              itemProp="sameAs"
            >
              <Github className="mr-2 h-4 w-4" /> Repository
            </a>
          )}
        </div>
      </div>
    </article>
  );
};

export const Projects = () => {
  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>(".project-reveal");
    if (!cards.length) return;

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

    cards.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="projects"
      className="mb-30 lg:mb-50"
      aria-labelledby="projects-heading"
    >
      <h2
        id="projects-heading"
        className="text-3xl font-bold sm:text-5xl var(--foreground) mb-10 lg:mb-20 text-center tracking-wide"
      >
        Projects
      </h2>

      <div>
        <div className="mx-auto flex max-w-6xl flex-col gap-10 lg:gap-20">
          {projects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(projectSchema).replace(/</g, "\\u003c"),
        }}
      />
    </section>
  );
};
