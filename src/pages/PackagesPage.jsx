import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { packages } from "../data/packages";
import "../styles/categories.css";

export default function PackagesPage() {
  return (
    <main className="categories-page">
      <section className="categories-hero">
        <div className="categories-hero__content">
          <p className="categories-eyebrow">CURATED FOR EVERY OCCASION</p>
          <h1>Choose Your <span>Package</span></h1>
          <p className="categories-hero__description">
            Ready-made combinations for events, businesses and personalized gifting.
          </p>
        </div>
      </section>

      <section className="categories-results" aria-labelledby="packages-heading">
        <div className="categories-section-heading">
          <div>
            <p className="categories-eyebrow">SPECIAL COMBOS</p>
            <h2 id="packages-heading">Popular Packages</h2>
          </div>
          <span className="categories-count">{packages.length} packages</span>
        </div>

        <div className="categories-grid">
          {packages.map((item) => (
            <Link
              className="category-card__link"
              to={`/packages/${item.id}`}
              key={item.id}
            >
              <article className="category-card">
                <div className="category-card__image-wrap">
                  <img
                    className="category-card__image"
                    src={item.image}
                    alt={`${item.name} package by Samudra Creatives`}
                    loading="lazy"
                  />
                  <span className="category-card__arrow">
                    <ArrowUpRight size={19} />
                  </span>
                </div>
                <div className="category-card__content">
                  <p className="category-card__eyebrow">{item.subtitle}</p>
                  <h3>{item.name}</h3>
                  <p className="category-card__description">{item.description}</p>
                  <span className="category-card__action">
                    Explore package <ArrowUpRight size={16} />
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
