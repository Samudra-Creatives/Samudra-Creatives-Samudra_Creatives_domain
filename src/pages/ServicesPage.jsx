import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { services } from "../data/services";
import "../styles/categories.css";

export default function ServicesPage() {
  return (
    <main className="categories-page">
      <section className="categories-hero">
        <div className="categories-hero__content">
          <p className="categories-eyebrow">PRINTING · BRANDING · PERSONALIZATION</p>
          <h1>Explore Our <span>Services</span></h1>
          <p className="categories-hero__description">
            From everyday printing to premium personalization, choose the right
            service for your next idea.
          </p>
        </div>
      </section>

      <section className="categories-results" aria-labelledby="services-heading">
        <div className="categories-section-heading">
          <div>
            <p className="categories-eyebrow">WHAT WE CREATE</p>
            <h2 id="services-heading">Our Services</h2>
          </div>
          <span className="categories-count">{services.length} services</span>
        </div>

        <div className="categories-grid">
          {services.map((service) => (
            <Link
              className="category-card__link"
              to={service.href}
              key={service.id}
            >
              <article className="category-card">
                <div className="category-card__image-wrap">
                  <img
                    className="category-card__image"
                    src={service.image}
                    alt={service.alt}
                    loading="lazy"
                  />
                  <span className="category-card__arrow">
                    <ArrowUpRight size={19} />
                  </span>
                </div>
                <div className="category-card__content">
                  <p className="category-card__eyebrow">{service.category}</p>
                  <h3>{service.title}</h3>
                  <p className="category-card__description">{service.description}</p>
                  <span className="category-card__action">
                    Explore service <ArrowUpRight size={16} />
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
