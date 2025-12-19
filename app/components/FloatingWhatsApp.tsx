"use client";

type Props = {
  phoneE164: string; // ex: "5511999999999"
  message?: string;
};

export default function FloatingWhatsApp({
  phoneE164,
  message = "Olá! Vim pelo seu site e quero um orçamento 😊",
}: Props) {
  const href = `https://wa.me/${phoneE164}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Falar no WhatsApp"
      className="floating-wa"
      onClick={() => {
        // (opcional) tracking futuro:
        // window.gtag?.("event", "whatsapp_click");
        // window.fbq?.("trackCustom", "WhatsAppClick");
      }}
    >
      {/* ícone simples em SVG (leve e rápido) */}
      <svg viewBox="0 0 32 32" width="22" height="22" aria-hidden="true">
        <path
          fill="currentColor"
          d="M19.11 17.53c-.28-.14-1.64-.81-1.9-.9-.26-.09-.45-.14-.64.14-.19.28-.73.9-.9 1.09-.17.19-.33.21-.61.07-.28-.14-1.2-.44-2.28-1.4-.84-.75-1.41-1.68-1.58-1.96-.17-.28-.02-.43.13-.57.13-.13.28-.33.43-.49.14-.17.19-.28.28-.47.09-.19.05-.35-.02-.49-.07-.14-.64-1.54-.88-2.11-.23-.55-.47-.48-.64-.49h-.55c-.19 0-.49.07-.74.35-.26.28-.98.96-.98 2.35s1.01 2.74 1.15 2.93c.14.19 1.99 3.03 4.82 4.25.67.29 1.19.46 1.6.59.67.21 1.28.18 1.76.11.54-.08 1.64-.67 1.87-1.31.23-.64.23-1.19.16-1.31-.07-.12-.26-.19-.54-.33ZM16 3C8.82 3 3 8.82 3 16c0 2.53.73 5 2.12 7.12L4 29l6.05-1.98A12.9 12.9 0 0 0 16 29c7.18 0 13-5.82 13-13S23.18 3 16 3Zm0 23.5c-2.08 0-4.12-.56-5.9-1.63l-.42-.25-3.59 1.18 1.17-3.49-.27-.45A10.44 10.44 0 0 1 5.5 16C5.5 10.31 10.14 5.5 16 5.5S26.5 10.31 26.5 16 21.86 26.5 16 26.5Z"
        />
      </svg>
      <span className="floating-wa__text">WhatsApp</span>
    </a>
  );
}
