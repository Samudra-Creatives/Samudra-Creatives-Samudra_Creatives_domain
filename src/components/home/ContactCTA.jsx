import { useState } from "react";
import {
  ArrowUpRight,
  MapPin,
  MessageCircle,
  Phone,
  Mail,
  CheckCircle2,
} from "lucide-react";

import { contactConfig } from "../../data/contact";
import ScrollReveal from "../common/ScrollReveal";

const initialForm = {
  name: "",
  phone: "",
  service: "",
  quantity: "",
  budget: "",
  details: "",
};

const serviceOptions = [
  "Flex Printing",
  "Digital Printing",
  "UV Printing",
  "DTF Printing",
  "Photo Printing",
  "Wedding Printing",
  "Business Branding",
  "Personalized Gifts",
  "Awards & Trophies",
  "Corporate Gifting",
  "Other / Custom Requirement",
];

const budgetOptions = [
  "Under ₹1,000",
  "₹1,000 – ₹5,000",
  "₹5,000 – ₹10,000",
  "₹10,000 – ₹25,000",
  "Above ₹25,000",
  "Need a quotation",
];

export default function ContactCTA() {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    if (error) setError("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    const normalizedPhone = form.phone.replace(/[\s()-]/g, "");

    if (!/^[+]?[0-9]{10,15}$/.test(normalizedPhone)) {
      setError("Enter a valid phone number with 10–15 digits.");
      return;
    }

    if (!form.service) {
      setError("Please select the service you need.");
      return;
    }

    const message = [
      "Hello Samudra Creatives! I'd like to enquire about a project.",
      "",
      `Name: ${form.name.trim()}`,
      `Phone: ${normalizedPhone}`,
      `Service: ${form.service}`,
      `Quantity: ${form.quantity.trim() || "Not specified"}`,
      `Budget: ${form.budget || "Not specified"}`,
      `Project details: ${form.details.trim() || "I'd like to discuss my requirements."}`,
    ].join("\n");

    const whatsappUrl =
      `https://wa.me/${contactConfig.whatsappNumber}` +
      `?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <section
      className="contact-cta"
      id="contact"
      aria-labelledby="contact-cta-title"
    >
      <div className="container contact-cta__container">
        <ScrollReveal className="contact-cta__intro">
          <span className="contact-cta__eyebrow">
            <span className="contact-cta__status-dot" />
            LET'S WORK TOGETHER
          </span>

          <h2 id="contact-cta-title" className="contact-cta__title">
            Tell us what
            <span> you have in mind.</span>
          </h2>

          <p className="contact-cta__description">
            Share your idea, requirements or quantity. We'll help you
            explore the right printing, branding or gifting solution.
          </p>

          <div className="contact-cta__details">
            <a
              className="contact-cta__detail"
              href={`tel:${contactConfig.phoneNumber}`}
            >
              <span className="contact-cta__detail-icon">
                <Phone size={18} />
              </span>
              <span>
                <small>CALL OUR TEAM</small>
                <strong>{contactConfig.phoneNumber}</strong>
              </span>
            </a>

            <a
              className="contact-cta__detail"
              href={`mailto:${contactConfig.email}`}
            >
              <span className="contact-cta__detail-icon">
                <Mail size={18} />
              </span>
              <span>
                <small>EMAIL US</small>
                <strong>{contactConfig.email}</strong>
              </span>
            </a>

            <a
              className="contact-cta__detail"
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                contactConfig.address
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="contact-cta__detail-icon">
                <MapPin size={18} />
              </span>
              <span>
                <small>VISIT OUR SHOP</small>
                <strong>{contactConfig.address}</strong>
              </span>
            </a>
          </div>
        </ScrollReveal>

        <ScrollReveal
          className="contact-form-card"
          variant="left"
        >
          <div className="contact-form-card__header">
            <div>
              <span className="contact-form-card__eyebrow">
                PROJECT ENQUIRY
              </span>
              <h3>Let's get started.</h3>
            </div>

            <span className="contact-form-card__icon">
              <MessageCircle size={23} />
            </span>
          </div>

          <p className="contact-form-card__description">
            Fill in a few details to prepare your WhatsApp enquiry.
          </p>

          <form
            className="contact-form"
            onSubmit={handleSubmit}
          >
            <div className="contact-form__row">
              <div className="contact-form__field">
                <label htmlFor="contact-name">Your name *</label>
                <input
                  id="contact-name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  autoComplete="name"
                  maxLength={100}
                  required
                />
              </div>

              <div className="contact-form__field">
                <label htmlFor="contact-phone">Phone number *</label>
                <input
                  id="contact-phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="10-digit mobile number"
                  autoComplete="tel"
                  inputMode="tel"
                  maxLength={20}
                  required
                />
              </div>
            </div>

            <div className="contact-form__field">
              <label htmlFor="contact-service">Service required *</label>
              <select
                id="contact-service"
                name="service"
                value={form.service}
                onChange={handleChange}
                required
              >
                <option value="">Select a service</option>

                {serviceOptions.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </div>

            <div className="contact-form__row">
              <div className="contact-form__field">
                <label htmlFor="contact-quantity">
                  Approximate quantity
                </label>
                <input
                  id="contact-quantity"
                  name="quantity"
                  value={form.quantity}
                  onChange={handleChange}
                  placeholder="e.g. 500 pieces"
                  maxLength={100}
                />
              </div>

              <div className="contact-form__field">
                <label htmlFor="contact-budget">Estimated budget</label>
                <select
                  id="contact-budget"
                  name="budget"
                  value={form.budget}
                  onChange={handleChange}
                >
                  <option value="">Choose a budget</option>

                  {budgetOptions.map((budget) => (
                    <option key={budget} value={budget}>
                      {budget}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="contact-form__field">
              <label htmlFor="contact-details">
                Tell us about your project
              </label>
              <textarea
                id="contact-details"
                name="details"
                value={form.details}
                onChange={handleChange}
                placeholder="Product, size, design, delivery date or any other requirements..."
                rows={4}
                maxLength={2000}
              />
            </div>

            {error && (
              <p className="contact-form__error" role="alert">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="contact-form__submit"
            >
              <MessageCircle size={18} />
              Send Enquiry on WhatsApp
              <ArrowUpRight size={18} />
            </button>

            <p className="contact-form__privacy">
              <CheckCircle2 size={14} />
              Your message will be prepared in WhatsApp for you to send.
            </p>
          </form>
        </ScrollReveal>
      </div>
    </section>
  );
}