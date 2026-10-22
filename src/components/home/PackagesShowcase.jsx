
import { ArrowUpRight, Check, Sparkles } from "lucide-react";
import { packages, packagesConfig } from "../../data/packages";
import "../../styles/packages.css";
import ScrollReveal from "../common/ScrollReveal";

const WHATSAPP_NUMBER = "919000154939";

function createPackageLink(item) {
  const message = [
    `Hi Samudra Creatives!`,
    ``,
    `I'm interested in the ${item.name} Package.`,
    ``,
    `Please share the available options, pricing and customization details.`,
  ].join("\n");

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function createCustomPackageLink() {
  const message =
    "Hi Samudra Creatives! I would like to discuss a custom package. Please help me with the available options and quotation.";

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export default function PackagesShowcase() {
  return (
    <section className="packages-section" id="packages">
      <div className="packages-shell">
        <ScrollReveal as="header" className="packages-header">
          <div className="packages-heading-copy">
            <span className="packages-eyebrow">
              <span className="packages-eyebrow-line" />
              {packagesConfig.eyebrow}
            </span>

            <h2 className="packages-heading">
              {packagesConfig.title}
              <span>{packagesConfig.highlightedTitle}</span>
            </h2>

            <p className="packages-intro">
              {packagesConfig.description}
            </p>
          </div>

          <div className="packages-header-note">
            <Sparkles size={18} />
            <span>One place. Every detail. Your vision.</span>
          </div>
        </ScrollReveal>

        <div className="packages-grid">
          {packages.map((item, index) => (
            <ScrollReveal
              as="article"
              className={`package-card package-card--${item.theme} ${
                item.featured ? "package-card--featured" : ""
              }`}
              key={item.id}
              delay={Math.min(index * 75, 300)}
            >
              <div className="package-card-image">
                <img
                  src={item.image}
                  alt={`${item.name} package by Samudra Creatives`}
                  loading="lazy"
                />

                <div className="package-image-overlay" />

                <span className="package-number">{item.number}</span>

                {item.featured && (
                  <span className="package-popular">
                    <Sparkles size={12} />
                    CUSTOMER FAVOURITE
                  </span>
                )}

                <div className="package-image-title">
                  <span>{item.subtitle}</span>
                  <h3>{item.name}</h3>
                </div>
              </div>

              <div className="package-card-content">
                <p className="package-description">
                  {item.description}
                </p>

                <div className="package-includes-heading">
                  <span>THE PACKAGE INCLUDES</span>
                  <span className="package-includes-count">
                    {String(item.items.length).padStart(2, "0")} ITEMS
                  </span>
                </div>

                <ul className="package-items">
                  {item.items.map((product) => (
                    <li key={product}>
                      <span className="package-check">
                        <Check size={12} strokeWidth={3} />
                      </span>
                      {product}
                    </li>
                  ))}
                </ul>

                <a
                  className="package-cta"
                  href={createPackageLink(item)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Request a quote for the ${item.name} package on WhatsApp`}
                >
                  <span>Get Package Quote</span>
                  <span className="package-cta-icon">
                    <ArrowUpRight size={17} />
                  </span>
                </a>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="packages-custom" delay={260}>
          <div className="packages-custom-mark">
            <Sparkles size={23} />
          </div>

          <div className="packages-custom-copy">
            <span className="packages-custom-label">
              YOUR IDEA, YOUR COMBINATION
            </span>
            <h3>{packagesConfig.footerTitle}</h3>
            <p>{packagesConfig.footerDescription}</p>
          </div>

          <a
            className="packages-custom-cta"
            href={createCustomPackageLink()}
            target="_blank"
            rel="noopener noreferrer"
          >
            {packagesConfig.ctaLabel}
            <ArrowUpRight size={18} />
          </a>
        </ScrollReveal>

        <p className="packages-disclaimer">
          Package contents can be customized. Final pricing depends on
          product selection, quantity and specifications.
        </p>
      </div>
    </section>
  );
}
