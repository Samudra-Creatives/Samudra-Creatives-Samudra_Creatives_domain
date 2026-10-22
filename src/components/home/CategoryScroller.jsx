import { categoryScrollerItems } from "../../data/categoriesScroller";
import ScrollReveal from "../common/ScrollReveal";
import { Link } from "react-router-dom";

export default function CategoryScroller() {
  /*
   * Duplicate the items so the CSS animation can create
   * a seamless infinite loop.
   */
  const items = [
    ...categoryScrollerItems,
    ...categoryScrollerItems,
  ];

  return (
    <section
      className="category-scroller"
      aria-labelledby="category-scroller-title"
    >
      <ScrollReveal className="category-scroller__header">
        <span className="category-scroller__eyebrow">
          EXPLORE OUR WORLD
        </span>

        <h2
          id="category-scroller-title"
          className="category-scroller__title"
        >
          Everything You Need. <span>Creatively Made.</span>
        </h2>
      </ScrollReveal>

      <div className="category-scroller__viewport">
        <div className="category-scroller__fade category-scroller__fade--left" />

        <div className="category-scroller__track">
          {items.map((category, index) => (
            <Link
              to={`/categories/${category.slug || category.id}`}
              className="category-card"
              key={`${category.id}-${index}`}
              aria-label={`Explore ${category.name}`}
            >
              <div className="category-card__image-wrapper">
                <div className="category-card__image-glow" />

                <img
                  src={category.image}
                  alt={category.alt || `${category.name} by Samudra Creatives`}
                  className="category-card__image"
                  loading={index < 5 ? "eager" : "lazy"}
                  decoding="async"
                />

                <div className="category-card__overlay" />

                <span className="category-card__arrow">
                  →
                </span>
              </div>

              <span className="category-card__name">
                {category.name}
              </span>
            </Link>
          ))}
        </div>

        <div className="category-scroller__fade category-scroller__fade--right" />
      </div>

      <Link to="/categories" className="category-scroller__all-link">
        See All Categories <span aria-hidden="true">↗</span>
      </Link>
    </section>
  );
}