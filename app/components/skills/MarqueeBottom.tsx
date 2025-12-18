"use client";
import { useContext } from "react";
import {
  Marquee,
  MarqueeContent,
  MarqueeFade,
  MarqueeItem,
} from "../../../components/ui/shadcn-io/marquee";
import Image from "next/image";
import { ThemeContext } from "@/context/ThemeContext";

const SKILLS_LIGHT = [
  {
    name: "Git",
    icon: "/skill-icons/light/Git.svg",
    width: 80,
    height: 90,
  },
  {
    name: "Bash",
    icon: "/skill-icons/light/Bash.svg",
    width: 80,
    height: 80,
  },
  {
    name: "Docker",
    icon: "/skill-icons/light/Docker.svg",
    width: 80,
    height: 90,
  },
  {
    name: "Figma",
    icon: "/skill-icons/light/Figma.svg",
    width: 80,
    height: 90,
  },
  {
    name: "Linux",
    icon: "/skill-icons/light/Linux.svg",
    width: 80,
    height: 90,
  },
  {
    name: "Material UI",
    icon: "/skill-icons/light/Material.svg",
    width: 80,
    height: 90,
  },
  {
    name: "Tailwind CSS",
    icon: "/skill-icons/light/Tailwind.svg",
    width: 80,
    height: 90,
  },
  {
    name: "Postman",
    icon: "/skill-icons/light/Postman.svg",
    width: 80,
    height: 90,
  },
  {
    name: "Shadcn UI",
    icon: "/skill-icons/light/Shadcn.svg",
    width: 80,
    height: 90,
  },
  {
    name: "Bootstrap",
    icon: "/skill-icons/light/Bootstrap.svg",
    width: 80,
    height: 90,
  },
];

const SKILLS_DARK = [
  {
    name: "Git",
    icon: "/skill-icons/dark/Git.svg",
    width: 80,
    height: 90,
  },
  {
    name: "Bash",
    icon: "/skill-icons/dark/Bash.svg",
    width: 80,
    height: 80,
  },
  {
    name: "Docker",
    icon: "/skill-icons/dark/Docker.svg",
    width: 80,
    height: 90,
  },
  {
    name: "Figma",
    icon: "/skill-icons/dark/Figma.svg",
    width: 80,
    height: 90,
  },
  {
    name: "Linux",
    icon: "/skill-icons/dark/Linux.svg",
    width: 80,
    height: 90,
  },
  {
    name: "Material UI",
    icon: "/skill-icons/dark/Material.svg",
    width: 80,
    height: 90,
  },
  {
    name: "Tailwind CSS",
    icon: "/skill-icons/dark/Tailwind.svg",
    width: 80,
    height: 90,
  },
  {
    name: "Postman",
    icon: "/skill-icons/dark/Postman.svg",
    width: 80,
    height: 90,
  },
  {
    name: "Shadcn UI",
    icon: "/skill-icons/dark/Shadcn.svg",
    width: 80,
    height: 90,
  },
  {
    name: "Bootstrap",
    icon: "/skill-icons/dark/Bootstrap.svg",
    width: 80,
    height: 90,
  },
];

// If on mobile remove height and width from skill icons
if (typeof window !== "undefined") {
  const { width } = window.screen;
  if (width < 768) {
    SKILLS_LIGHT.forEach((skill) => {
      skill.width = 30;
      skill.height = 30;
    });
    SKILLS_DARK.forEach((skill) => {
      skill.width = 30;
      skill.height = 30;
    });
  }
}

export const MarqueeBottom = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div>
      <Marquee className="flex items-center mx-auto justify-center w-[78%]">
        <MarqueeFade side="left" />
        <MarqueeFade side="right" />
        <MarqueeContent direction="right" speed={100}>
          {theme === "light"
            ? SKILLS_LIGHT.map((skill, index) => (
                <MarqueeItem className="h-16 w-16 lg:h-32 lg:w-32" key={index}>
                  <Image
                    alt={`${skill.name} Icon`}
                    className="overflow-hidden"
                    src={skill.icon}
                    width={skill.width}
                    height={skill.height}
                  />
                </MarqueeItem>
              ))
            : SKILLS_DARK.map((skill, index) => (
                <MarqueeItem className="h-16 w-16 lg:h-32 lg:w-32" key={index}>
                  <Image
                    alt={`${skill.name} Icon`}
                    className="overflow-hidden"
                    src={skill.icon}
                    width={skill.width}
                    height={skill.height}
                  />
                </MarqueeItem>
              ))}
        </MarqueeContent>
      </Marquee>
    </div>
  );
};
