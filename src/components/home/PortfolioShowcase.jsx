import { useState } from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import {
  portfolioCategories,
  portfolioItems,
  portfolioConfig,
} from "../../data/portfolio";
import ScrollReveal from "../common/ScrollReveal";
import { Link } from "react-router-dom";

export default function PortfolioShowcase() {
  const [activeCategory, setActiveCategory] = useState("All Work");

  const filteredItems =
    activeCategory === "All Work"
      ? portfolioItems
      : portfolioItems.filter(
          (item) => item.category === activeCategory
        );

  return (
    <section
      className="portfolio-showcase"
      aria-labelledby="portfolio-title"
    >
      <div className="container portfolio-showcase__container">
        <ScrollReveal as="header" className="portfolio-header">
          <div className="portfolio-header__main">
            <span className="portfolio-eyebrow">
              {portfolioConfig.eyebrow}
            </span>

            <h2 id="portfolio-title" className="portfolio-title">
              {portfolioConfig.title}
              <span>{portfolioConfig.highlightedTitle}</span>
            </h2>
          </div>

          <div className="portfolio-header__side">
            <p>{portfolioConfig.description}</p>

            <Link
              to="/portfolio"
              className="portfolio-header__link"
            >
              Explore Our Work
              <ArrowUpRight size={17} />
            </Link>
          </div>
        </ScrollReveal>

        <ScrollReveal
          as="div"
          className="portfolio-filters"
          role="group"
          aria-label="Filter portfolio by category"
        >
          {portfolioCategories.map((category) => (
            <button
              key={category}
              type="button"
              className={`portfolio-filter ${
                activeCategory === category
                  ? "portfolio-filter--active"
                  : ""
              }`}
              aria-pressed={activeCategory === category}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </ScrollReveal>

        <div className="portfolio-grid">
          {filteredItems.map((item, index) => (
            <ScrollReveal
              as="a"
              key={item.id}
              href={item.href}
              className={`portfolio-card portfolio-card--${item.size}`}
              delay={Math.min(index * 70, 280)}
            >
              <div className="portfolio-card__image-wrap">
                <img
                  src={item.image}
                  alt={item.alt || `${item.title} by Samudra Creatives`}
                  className="portfolio-card__image"
                  loading="lazy"
                  decoding="async"
                />

                <div className="portfolio-card__overlay" />

                <span className="portfolio-card__number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="portfolio-card__open">
                  <ArrowUpRight size={20} />
                </span>

                <div className="portfolio-card__caption">
                  <span className="portfolio-card__category">
                    {item.category}
                  </span>

                  <h3>{item.title}</h3>

                  <span className="portfolio-card__view">
                    View Project
                    <ArrowUpRight size={15} />
                  </span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="portfolio-footer">
          <div className="portfolio-footer__note">
            <span className="portfolio-footer__symbol">✳</span>
            <p>
              Have an idea? Let's make something worth remembering.
            </p>
          </div>

          <Link to="/contact" className="portfolio-footer__cta">
            {portfolioConfig.ctaLabel}
            <ArrowDownRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}