"use client";

import { FaWhatsapp } from "react-icons/fa";

type Props = {
  phoneE164: string;
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
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="floating-wa"
    >
      <span className="floating-wa__icon" aria-hidden="true">
        <FaWhatsapp className="floating-wa__svg h-5 w-5" />
      </span>

      <span className="floating-wa__text">WhatsApp</span>
    </a>
  );
}
