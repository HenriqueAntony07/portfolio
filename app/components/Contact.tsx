"use client";

import React, { useState } from "react";
import { Mail, ArrowUpRight } from "lucide-react";

const CONTACT_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contato Henrique Antony",
  mainEntity: {
    "@type": "Person",
    name: "Henrique Antony",
    email: "mailto:henriqueantonydev@gmail.com",
    sameAs: [
      "https://www.linkedin.com/in/henrique-antony-8574a3171/",
      "https://github.com/HenriqueAntony07",
    ],
    worksFor: {
      "@type": "Organization",
      name: "Natmed Medical Defence",
    },
  },
};

type ApiResponse = {
  ok: boolean;
  error?: string;
};

export const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  // Envia para /api/contact (server) -> EmailJS (plano free sem domínio)
  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = (formData.get("name")?.toString() ?? "").trim();
    const email = (formData.get("email")?.toString() ?? "").trim();
    const message = (formData.get("message")?.toString() ?? "").trim();

    if (!name || !email || !message) {
      setStatus("Por favor, preencha todos os campos do formulário.");
      setLoading(false);
      return;
    }

    // Limites mais realistas
    if (name.length > 100 || email.length > 120 || message.length > 2000) {
      setStatus(
        "Limite excedido: nome até 100, email até 120 e mensagem até 2000 caracteres."
      );
      setLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus("Por favor, insira um endereço de e-mail válido.");
      setLoading(false);
      return;
    }

    // Honeypot anti-spam (campo escondido no form)
    const website = (formData.get("website")?.toString() ?? "").trim();

    try {
      const resp = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, website }),
      });

      const data = (await resp.json()) as ApiResponse;

      if (!resp.ok || !data.ok) {
        setStatus(data.error || "Falha ao enviar a mensagem. Tente novamente mais tarde.");
        setLoading(false);
        return;
      }

      setStatus("Enviado com sucesso 🚀");
      form.reset();
    } catch (err: unknown) {
      console.error(err);
      setStatus("Falha ao enviar a mensagem. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="mb-24">
      <div className="mx-auto max-w-4xl lg:max-w-5xl px-4 sm:px-6">
        <h2 className="text-3xl sm:text-5xl font-bold tracking-wide text-center mb-6">
          Entre em contato
        </h2>
        <p className="text-center text-lg sm:text-3xl mb-6">
          Vamos construir experiências digitais impactantes.
        </p>

        <div className="mt-10 rounded-2xl border p-6 sm:p-16 bg-card shadow-lg">
          <form onSubmit={sendEmail} className="space-y-5">
            {/* Honeypot (anti-bot) */}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
            />

            <div>
              <label htmlFor="name" className="mb-1 block text-md font-medium">
                Nome*
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Seu nome"
                maxLength={100}
                className="w-full rounded border px-3 py-2 outline-none transition placeholder:text-muted-foreground/70 focus:ring-1 focus:ring-foreground/100 bg-[var(--input-background)]"
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-1 block text-md font-medium">
                Email*
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="você@dominio.com"
                maxLength={120}
                className="w-full rounded border px-3 py-2 outline-none transition placeholder:text-muted-foreground/70 focus:ring-1 focus:ring-foreground/100 bg-[var(--input-background)]"
              />
            </div>

            <div>
              <label htmlFor="message" className="mb-1 block text-md font-medium">
                Mensagem*
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="Diga como posso ajudar você?"
                maxLength={2000}
                className="w-full resize-y rounded border px-3 py-2 outline-none transition placeholder:text-muted-foreground/70 focus:ring-1 focus:ring-foreground/100 bg-[var(--input-background)]"
              />
            </div>

            {status && (
              <div
                className={`justify-center flex mt-2 p-3 rounded-sm mb-5 text-lg border ${
                  status === "Enviado com sucesso 🚀"
                    ? "bg-green-200 border-green-600 text-green-600"
                    : "bg-red-200 border-red-600 text-red-600"
                } transition-all`}
              >
                {status}
              </div>
            )}

            <div className="flex flex-col space-y-4 pt-2">
              <div className="flex items-center justify-end gap-3 flex-wrap max-[500px]:justify-center max-[405px]:gap-2">
                <a
                  href="https://www.linkedin.com/in/henrique-antony-8574a3171/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Conectar no LinkedIn"
                  className="inline-flex items-center rounded-xl border px-4 py-2.5 text-md transition hover:bg-foreground/5 max-[405px]:px-2 max-[405px]:py-2 max-[405px]:text-sm"
                >
                  <ArrowUpRight className="mr-2 h-5 w-5 text-[var(--foreground)] max-[405px]:mr-1.5 max-[405px]:h-4 max-[405px]:w-4" />
                  LinkedIn
                </a>

                <a
                  href="mailto:henriqueantonydev@gmail.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Enviar um email para Henrique Antony"
                  className="inline-flex items-center rounded-xl border px-4 py-2.5 text-md transition hover:bg-foreground/5 max-[405px]:px-2 max-[405px]:py-2 max-[405px]:text-sm"
                >
                  <Mail className="mr-2 h-5 w-5 max-[405px]:mr-1.5 max-[405px]:h-4 max-[405px]:w-4" />
                  Email
                </a>

                <button
                  type="submit"
                  disabled={loading}
                  className="call-to-action cursor-pointer inline-flex items-center rounded-xl px-8 py-2.5 text-md transition-all duration-400 max-[405px]:px-5 border max-[405px]:py-2 max-[405px]:text-sm disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? "Enviando..." : "Enviar"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(CONTACT_SCHEMA).replace(/</g, "\\u003c"),
        }}
      />
    </section>
  );
};
