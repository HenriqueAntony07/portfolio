"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { X, Menu } from "lucide-react";
import { ThemeToggleButton } from "./ThemeToggleButton";
import { usePathname, useRouter } from "next/navigation";
import "./Navbar.css";

const navigation = [
  { name: "Home", id: "home" },
  { name: "Sobre", id: "about" },
  { name: "Habilidades", id: "skills" },
  { name: "Projetos", id: "projects" },
  { name: "Contato", id: "contact" },
];

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick =
    (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();

      setMobileMenuOpen(false);

      if (isHome) {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          history.replaceState(null, "", `#${id}`);
        }
      } else {
        router.push(`/#${id}`);
      }
    };

  return (
    <header className="sticky top-0 z-50 w-full overflow-x-clip transition-transform duration-300">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <nav
          className={`flex items-center justify-between transition-all duration-300 ${
            isScrolled ? "py-6" : "py-4 sm:py-12"
          }`}
        >
          {/* Mobile left */}
          <div className="flex flex-1 lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="inline-flex items-center justify-center rounded-xl border-1 border-neutral-200 bg-background p-3 hover:bg-foreground/5 transition-colors duration-400"
            >
              <span className="sr-only">Open main menu</span>
              <Menu className="size-5" />
            </button>
          </div>

          {/* Mobile right */}
          <div className="flex flex-1 justify-end lg:hidden">
            <ThemeToggleButton />
          </div>

          {/* Desktop */}
          <div className="hidden lg:flex lg:w-full lg:justify-center">
            <div className="inline-flex items-center gap-6 rounded-full border border-border/60 bg-background/75 px-5 py-2 shadow-sm backdrop-blur">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={`#${item.id}`}
                  onClick={handleNavClick(item.id)}
                  className="text-sm font-medium tracking-wide text-foreground/75 transition-colors hover:text-foreground"
                >
                  {item.name}
                </a>
              ))}

              <span className="h-6 w-px bg-border/60" aria-hidden="true" />
              <ThemeToggleButton />
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm dark:bg-black/40" />

        <DialogPanel className="fixed inset-y-0 right-0 z-60 w-full overflow-y-auto bg-background p-4 shadow-lg sm:max-w-sm sm:ring-1 sm:ring-border">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-xl border-1 border-neutral-200 bg-background p-3 hover:bg-foreground/5 transition-colors"
            >
              <span className="sr-only">Close menu</span>
              <X className="size-5" strokeWidth={3} />
            </button>
          </div>

          <div className="mt-6 text-center">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={`#${item.id}`}
                onClick={handleNavClick(item.id)}
                className="block py-3 text-3xl font-semibold"
              >
                {item.name}
              </a>
            ))}
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
};
