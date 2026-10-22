import { ArrowUpRight } from "lucide-react";
import { services } from "../../data/services";
import ScrollReveal from "../common/ScrollReveal";
import { Link } from "react-router-dom";

export default function ServicesShowcase() {
  const featuredServices = services.filter(
    (service) => service.featured
  );

  return (
    <section
      className="services-showcase"
      aria-labelledby="services-showcase-title"
    >
      <div className="container services-showcase__container">

        {/* Section Header */}
        <ScrollReveal className="services-showcase__header">
          <div className="services-showcase__heading">

            <span className="services-showcase__eyebrow">
              WHAT WE CREATE
            </span>

            <h2
              id="services-showcase-title"
              className="services-showcase__title"
            >
              From Ideas
              <br />
              <span>To Something Real.</span>
            </h2>

          </div>

          <div className="services-showcase__intro">

            <p>
              From everyday printing to premium personalization,
              we bring your ideas to life with quality, creativity
              and attention to detail.
            </p>

            <Link
              to="/services"
              className="services-showcase__all-link"
            >
              <span>View All Services</span>

              <ArrowUpRight
                size={18}
                strokeWidth={1.8}
              />
            </Link>

          </div>
        </ScrollReveal>


        {/* Service Grid */}
        <div className="services-grid">

          {featuredServices.map((service, index) => (
            <Link
              key={service.id}
              to={service.href}
              className={`service-card service-card--${service.size}`}
            >

              <div className="service-card__image-wrapper">

                <img
                  src={service.image}
                  alt={
                    service.alt ||
                    `${service.title} services by Samudra Creatives`
                  }
                  className="service-card__image"
                  loading="lazy"
                  decoding="async"
                />

                <div className="service-card__overlay" />

                <div className="service-card__top">

                  <span className="service-card__category">
                    {service.category}
                  </span>

                  <span className="service-card__icon">
                    <ArrowUpRight
                      size={19}
                      strokeWidth={1.8}
                    />
                  </span>

                </div>

                <div className="service-card__content">

                  <h3>
                    {service.title}
                  </h3>

                  <p>
                    {service.description}
                  </p>

                  <span className="service-card__explore">
                    Explore Service
                    <span>→</span>
                  </span>

                </div>

              </div>

            </Link>
          ))}

        </div>


        {/* Bottom CTA */}
        <div className="services-showcase__footer">

          <div className="services-showcase__line" />

          <Link
            to="/services"
            className="services-showcase__button"
          >
            Explore All Services

            <ArrowUpRight
              size={18}
              strokeWidth={1.8}
            />
          </Link>

        </div>

      </div>
    </section>
  );
}