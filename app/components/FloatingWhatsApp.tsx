"use client";
import "./FloatingWhatsApp.css";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { X, ArrowUpRight } from "lucide-react";

type Props = {
  phoneE164: string;         // "5511999999999"
  brand?: string;            // "Henrique Antony"
  emailto?: string;          // "mailto:henrique
  contactSectionId?: string; // "contact" (opcional)
};

type Option = {
  label: string;
  desc: string;
  message?: string;          // se tiver message => abre WhatsApp
  action?: "scroll";
};

export default function FloatingWhatsApp({
  phoneE164,
  brand = "Henrique Antony",
  contactSectionId = "contact",
}: Props) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);

  const base = useMemo(() => `https://wa.me/${phoneE164}?text=`, [phoneE164]);

  const options: Option[] = useMemo(
    () => [
      {
        label: "Site institucional",
        desc: "Apresentação + credibilidade",
        message:
          `Olá! Quero um site institucional.\n` +
          `• Segmento/negócio: \n` +
          `• Quantas páginas? (ex: 3, 5, 8): \n` +
          `• Referências (links): \n` +
          `• Prazo ideal: \n` +
          `• Faixa de orçamento: `,
      },
      {
        label: "Landing page",
        desc: "Captação / vendas",
        message:
          `Olá! Quero uma landing page.\n` +
          `• Objetivo (leads/vendas): \n` +
          `• Produto/serviço: \n` +
          `• Precisa de copy? (sim/não): \n` +
          `• Referências (links): \n` +
          `• Prazo + orçamento: `,
      },
      {
        label: "E-commerce",
        desc: "Loja online completa",
        message:
          `Olá! Quero um e-commerce.\n` +
          `• Plataforma (Shopify/Woo/etc): \n` +
          `• Produtos (aprox): \n` +
          `• Pagamento/entrega: \n` +
          `• Referências (links): \n` +
          `• Prazo + orçamento: `,
      },
      {
        label: "Manutenção / melhorias",
        desc: "Ajustes, performance, SEO",
        message:
          `Olá! Preciso de manutenção/melhorias.\n` +
          `• Site atual (link): \n` +
          `• O que precisa ajustar: \n` +
          `• Urgência/prazo: \n` +
          `• Orçamento estimado: `,
      },
      {
        label: "Prefiro enviar por e-mail",
        desc: "Abrir formulário de contato",
        action: "scroll",
      },
    ],
    []
  );
function openWhats(message: string) {
  const href = `${base}${encodeURIComponent(message)}`;

  const w = window as unknown as {
    gtag?: (...args: unknown[]) => void;
  };

  // dispara conversão e depois abre o Whats
  if (typeof w.gtag === "function") {
    w.gtag("event", "conversion", {
      send_to: "AW-17828795650/_XXeCMCXitkbEIKqt7VC",
      event_callback: () => {
        window.open(href, "_blank", "noopener,noreferrer");
      },
    });

    // fallback caso o callback não execute
    window.setTimeout(() => {
      window.open(href, "_blank", "noopener,noreferrer");
    }, 700);

    return;
  }

  // fallback se gtag não existir
  window.open(href, "_blank", "noopener,noreferrer");
}

  function scrollToContact() {
    const el = document.getElementById(contactSectionId);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function onOptionClick(opt: Option) {
    if (opt.message) {
      openWhats(opt.message);
      setOpen(false);
      return;
    }

    if (opt.action === "scroll") {
      scrollToContact();
      setOpen(false);
    }
  }

  // fecha ao clicar fora
  useEffect(() => {
    function onDown(e: MouseEvent) {
      if (!open) return;
      const t = e.target as Node;
      if (panelRef.current && !panelRef.current.contains(t)) setOpen(false);
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  // fecha no ESC
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      {/* Botão flutuante */}
      <button
        type="button"
        aria-label={open ? "Fechar opções" : "Abrir opções do WhatsApp"}
        className="floating-wa"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="floating-wa__icon" aria-hidden="true">
          <FaWhatsapp className="floating-wa__svg h-5 w-5" />
        </span>
        <span className="floating-wa__text">WhatsApp</span>
      </button>

      {/* Popup */}
      {open && (
        <div className="floating-wa__overlay" aria-hidden="true">
          <div
            ref={panelRef}
            className="floating-wa__panel"
            role="dialog"
            aria-label="Opções de orçamento"
          >
            <div className="floating-wa__panelHeader">
              <div className="floating-wa__panelTitle">
                <div className="floating-wa__panelKicker">Contato rápido</div>
                <div className="floating-wa__panelBrand">{brand}</div>
              </div>

              <button
                type="button"
                className="floating-wa__close"
                aria-label="Fechar"
                onClick={() => setOpen(false)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="floating-wa__panelBody">
              {options.map((opt) => (
                <button
                  key={opt.label}
                  type="button"
                  className="floating-wa__option"
                  onClick={() => onOptionClick(opt)}
                >
                  <div className="floating-wa__optionText">
                    <div className="floating-wa__optionLabel">{opt.label}</div>
                    <div className="floating-wa__optionDesc">{opt.desc}</div>
                  </div>

                  <ArrowUpRight size={16} />
                </button>
              ))}
            </div>

            <div className="floating-wa__panelFooter">
              <div className="floating-wa__hint">
                Escolha uma opção para eu te responder com mais rapidez.
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
