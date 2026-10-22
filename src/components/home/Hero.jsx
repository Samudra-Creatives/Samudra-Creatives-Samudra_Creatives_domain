import { Link } from "react-router-dom";
import {
  BadgeCheck,
  Layers,
  Palette,
  Truck,
} from "lucide-react";

import HeroPortalSlider from "./HeroPortalSlider";

import { siteConfig } from "../../data/site";

import { createDefaultWhatsAppMessage } from "../../utils/createWhatsAppMessage";

const trustItems = [
  {
    label: "Premium Quality",
    icon: BadgeCheck,
  },
  {
    label: "Custom Designs",
    icon: Palette,
  },
  {
    label: "Fast Delivery",
    icon: Truck,
  },
  {
    label: "Single & Bulk Orders",
    icon: Layers,
  },
];

export default function Hero() {
  return (
    <section className="hero">
      <div
        className="hero__background-shape hero__background-shape--one"
        aria-hidden="true"
      />

      <div
        className="hero__background-shape hero__background-shape--two"
        aria-hidden="true"
      />

      <div className="container hero__container">
        {/* =================================================
            LEFT SIDE
           ================================================= */}

        <div className="hero__content">
          <span className="hero__eyebrow">
            PRINT • BRAND • PERSONALIZE • CELEBRATE
          </span>

          <h1 className="hero__title">
            Your Ideas.
            <br />

            <span>
              Our Creativity.
            </span>
          </h1>

          <p className="hero__description">
            Premium printing, branding,
            personalized gifting and creative
            solutions for individuals,
            businesses and every special occasion.
          </p>

          <div className="hero__actions">
            <a
              href={
                createDefaultWhatsAppMessage()
              }
              target="_blank"
              rel="noopener noreferrer"
              className="button button--light"
            >
              WhatsApp Order

              <span>
                →
              </span>
            </a>

            <Link
              to="/services"
              className="button button--outline-light"
            >
              Explore Services

              <span>
                →
              </span>
            </Link>
          </div>

          <div className="hero__trust">
            {trustItems.map(
              (item) => {
                const Icon =
                  item.icon;

                return (
                  <div
                    className="hero__trust-item"
                    key={
                      item.label
                    }
                  >
                    <Icon
                      size={15}
                      strokeWidth={
                        2
                      }
                    />

                    <span>
                      {
                        item.label
                      }
                    </span>
                  </div>
                );
              },
            )}
          </div>

          <p className="hero__location">
            {siteConfig.location}
          </p>
        </div>

        {/* =================================================
            RIGHT SIDE — PORTAL EXPERIENCE
           ================================================= */}

        <div className="hero__visual">
          <HeroPortalSlider />
        </div>
      </div>
    </section>
  );
}