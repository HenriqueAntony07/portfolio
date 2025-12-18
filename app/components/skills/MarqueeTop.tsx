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
    name: "HTML",
    icon: "/skill-icons/light/Html.svg",
    width: 80,
    height: 90,
  },
  {
    name: "JavaScript",
    icon: "/skill-icons/light/Javascript.svg",
    width: 80,
    height: 80,
  },
  {
    name: "React",
    icon: "/skill-icons/light/React.svg",
    width: 80,
    height: 90,
  },
  {
    name: "TypeScript",
    icon: "/skill-icons/light/Typescript.svg",
    width: 80,
    height: 90,
  },
  {
    name: "Express.js",
    icon: "/skill-icons/light/Express.svg",
    width: 80,
    height: 90,
  },
  {
    name: "Django",
    icon: "/skill-icons/light/Django.svg",
    width: 80,
    height: 90,
  },
  {
    name: "CSS",
    icon: "/skill-icons/light/Css.svg",
    width: 70,
    height: 80,
  },
  {
    name: "Next.js",
    icon: "/skill-icons/light/Next.svg",
    width: 80,
    height: 90,
  },
  {
    name: "Node.js",
    icon: "/skill-icons/light/Node.svg",
    width: 80,
    height: 90,
  },
  {
    name: "MongoDB",
    icon: "/skill-icons/light/Mongodb.svg",
    width: 80,
    height: 90,
  },
  {
    name: "Python",
    icon: "/skill-icons/light/Python.svg",
    width: 80,
    height: 90,
  },
];

const SKILLS_DARK = [
  {
    name: "HTML",
    icon: "/skill-icons/dark/Html.svg",
    width: 80,
    height: 90,
  },
  {
    name: "JavaScript",
    icon: "/skill-icons/dark/Javascript.svg",
    width: 80,
    height: 80,
  },
  {
    name: "React",
    icon: "/skill-icons/dark/React.svg",
    width: 80,
    height: 90,
  },
  {
    name: "TypeScript",
    icon: "/skill-icons/dark/Typescript.svg",
    width: 80,
    height: 90,
  },
  {
    name: "Express.js",
    icon: "/skill-icons/dark/Express.svg",
    width: 80,
    height: 90,
  },
  {
    name: "Django",
    icon: "/skill-icons/dark/Django.svg",
    width: 80,
    height: 90,
  },
  {
    name: "CSS",
    icon: "/skill-icons/dark/Css.svg",
    width: 70,
    height: 80,
  },
  {
    name: "Next.js",
    icon: "/skill-icons/dark/Next.svg",
    width: 80,
    height: 90,
  },
  {
    name: "Node.js",
    icon: "/skill-icons/dark/Node.svg",
    width: 80,
    height: 90,
  },
  {
    name: "MongoDB",
    icon: "/skill-icons/dark/Mongodb.svg",
    width: 80,
    height: 90,
  },
  {
    name: "Python",
    icon: "/skill-icons/dark/Python.svg",
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

export const MarqueeTop = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className="mb-8">
      <Marquee className="flex items-center mx-auto justify-center w-[78%]">
        <MarqueeFade side="left" />
        <MarqueeFade side="right" />
        <MarqueeContent direction="left" speed={100}>
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
