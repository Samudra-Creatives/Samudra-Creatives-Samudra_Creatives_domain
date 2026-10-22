import {
  ArrowUpRight,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

import { contactConfig, footerConfig } from "../../data/contact";
import WhatsAppIcon from "../common/WhatsAppIcon";
import ScrollReveal from "../common/ScrollReveal";
import { Link } from "react-router-dom";

export default function Footer() {
  const whatsappUrl = `https://wa.me/${contactConfig.whatsappNumber}?text=${encodeURIComponent(
    "Hi Samudra Creatives! I'd like to enquire about your services."
  )}`;

  return (
    <footer className="site-footer">
      <div className="container site-footer__container">

        {/* Oversized brand statement */}
        <ScrollReveal className="site-footer__hero">
          <div className="site-footer__hero-content">
            <div className="site-footer__hero-top">
              <span className="site-footer__eyebrow">
                YOUR IDEAS, OUR CREATIVITY
              </span>

              <span className="site-footer__asterisk" aria-hidden="true">
                ✳
              </span>
            </div>

            <p className="site-footer__statement">
              MAKE IT
              <span> MEMORABLE.</span>
            </p>

            <div className="site-footer__brand-bottom">
              <Link to="/" className="site-footer__brand">
                <span className="site-footer__brand-mark">S</span>

                <span className="site-footer__brand-copy">
                  <strong>{footerConfig.brandName}</strong>
                  <small>{footerConfig.tagline}</small>
                </span>
              </Link>
            </div>
          </div>

          <section
            className="site-footer__location-card"
            aria-labelledby="footer-location-title"
          >
            <div className="site-footer__location-copy">
              <span className="site-footer__location-label">
                FIND US
              </span>

              <h2 id="footer-location-title">
                Visit Samudra Creatives
              </h2>

              <p>
                Chennai - Kolkata Hwy, Jaggampeta,
                <br />
                Andhra Pradesh 533435, India
              </p>

              <a
                href="https://maps.google.com/maps/search/Chennai%20-%20Kolkata%20Hwy%2C%20Jaggampeta%2C%20Andhra%20Pradesh%20533435%2C%20India/@17.1729,82.0583,17z?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="site-footer__map-link"
              >
                Open in Google Maps
                <ArrowUpRight size={14} />
              </a>
            </div>

            <div className="site-footer__map-frame">
              <iframe
                src="https://www.google.com/maps?q=17.1729,82.0583&z=17&output=embed"
                title="Samudra Creatives location map"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </section>
        </ScrollReveal>

        {/* Main footer information */}
        <ScrollReveal className="site-footer__main" variant="in">
          <div className="site-footer__about">
            <h2>Creativity, made tangible.</h2>

            <p>{footerConfig.description}</p>

            <span className="site-footer__location-label">
              MADE WITH CARE IN
            </span>

            <p className="site-footer__location">
              Jaggampeta, Andhra Pradesh, India
            </p>
          </div>

          <nav
            className="site-footer__column"
            aria-label="Explore Samudra Creatives"
          >
            <h2>Explore</h2>

            <ul>
              {footerConfig.quickLinks.map((link) => (
                <li key={link.href}>
                  <Link to={link.href}>
                    {link.label}
                    <ArrowUpRight size={13} />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav
            className="site-footer__column"
            aria-label="Printing and branding services"
          >
            <h2>What We Do</h2>

            <ul>
              {footerConfig.serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link to={link.href}>
                    {link.label}
                    <ArrowUpRight size={13} />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="site-footer__contact">
            <h2>Say Hello</h2>

            <a
              href={`tel:${contactConfig.phoneNumber}`}
              className="site-footer__contact-link"
            >
              <Phone size={16} />
              <span>{contactConfig.phoneNumber}</span>
            </a>

            <a
              href={`mailto:${contactConfig.email}`}
              className="site-footer__contact-link"
            >
              <Mail size={16} />
              <span>{contactConfig.email}</span>
            </a>

            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                contactConfig.address
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="site-footer__contact-link"
            >
              <MapPin size={16} />
              <span>{contactConfig.address}</span>
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="site-footer__whatsapp"
              aria-label="Chat on WhatsApp"
              title="Chat on WhatsApp"
            >
              <WhatsAppIcon size={28} />
            </a>
          </div>

        </ScrollReveal>

        {/* Bottom strip */}
        <ScrollReveal className="site-footer__bottom" variant="in">
          <p>
            © {new Date().getFullYear()} {footerConfig.copyright}.
            All rights reserved.
          </p>

          <div className="site-footer__socials">
            {footerConfig.socialLinks.map((social) => {
              return (
                <a
                  href={social.href}
                  key={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                >
                <ArrowUpRight size={16} />
                </a>
              );
            })}
          </div>

          <a href="#top" className="site-footer__back-to-top">
            BACK TO TOP ↑
          </a>
        </ScrollReveal>
      </div>
    </footer>
  );
}