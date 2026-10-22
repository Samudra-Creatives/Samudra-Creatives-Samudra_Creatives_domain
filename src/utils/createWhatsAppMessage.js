import { siteConfig } from "../data/site";

export function createWhatsAppMessage(message = "") {
  const phone = siteConfig.whatsapp.replace(/\D/g, "");

  const encodedMessage = encodeURIComponent(message);

  return `https://wa.me/${phone}?text=${encodedMessage}`;
}

export function createDefaultWhatsAppMessage() {
  return createWhatsAppMessage(
    `Hello ${siteConfig.name},

I would like to know more about your printing, branding and personalized services.

Please share the available options and quotation.

Thank you.`,
  );
}