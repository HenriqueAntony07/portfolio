import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import { Moon, Sun } from "lucide-react";
import "./ThemeToggleButton.css";

export const ThemeToggleButton = () => {
  const { toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      className="theme-toggle-button rounded-4xl text-foreground/80 hover:cursor-pointer focus:outline-none hover:bg-foreground/5 transition-colors duration-400"
    >
      <Sun className="sun-icon" size={18} strokeWidth={2.5} />
      <Moon className="moon-icon" size={18} strokeWidth={2.5} />
    </button>
  );
};
