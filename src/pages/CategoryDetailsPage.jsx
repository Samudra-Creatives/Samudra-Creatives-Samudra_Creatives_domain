
import { useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";

import { categories } from "../data/categories";
import "../styles/category-details.css";

export default function CategoryDetailsPage() {
  const { slug } = useParams();

  const category = useMemo(
    () => categories.find((item) => item.slug === slug),
    [slug]
  );

  useEffect(() => {
    if (!category) return;

    const previousTitle = document.title;
    document.title = `${category.title} | Samudra Creatives`;

    let description = document.querySelector(
      'meta[name="description"]'
    );

    const createdDescription = !description;

    if (!description) {
      description = document.createElement("meta");
      description.name = "description";
      document.head.appendChild(description);
    }

    const previousDescription = description.content;
    description.content = category.description;

    return () => {
      document.title = previousTitle;

      if (createdDescription) {
        description.remove();
      } else {
        description.content = previousDescription;
      }
    };
  }, [category]);

  if (!category) {
    return (
      <main className="category-detail category-detail--not-found">
        <div>
          <p className="category-detail__eyebrow">
            SAMUDRA CREATIVES
          </p>
          <h1>Category not found</h1>
          <p>
            This category may have moved or may no longer be available.
          </p>
          <Link
            className="category-detail__button"
            to="/categories"
          >
            <ArrowLeft size={18} />
            Browse all categories
          </Link>
        </div>
      </main>
    );
  }

  const subcategories = category.subcategories || [];
  const hasSubcategories = subcategories.length > 0;
  const items = category.items || [];

  return (
    <main className="category-detail">
      {/* Hero */}
      <section className="category-detail__hero">
        <div
          className="category-detail__hero-image"
          style={{
            backgroundImage: `url("${category.image}")`,
          }}
          aria-hidden="true"
        />

        <div className="category-detail__hero-shade" />

        <div className="category-detail__hero-inner">
          <nav
            className="category-detail__breadcrumbs"
            aria-label="Breadcrumb"
          >
            <Link to="/">Home</Link>
            <span>/</span>
            <Link to="/categories">Categories</Link>
            <span>/</span>
            <span aria-current="page">{category.title}</span>
          </nav>

          <p className="category-detail__eyebrow">
            DISCOVER OUR COLLECTION
          </p>

          <h1>{category.title}</h1>

          <p className="category-detail__hero-description">
            {category.description}
          </p>

          <a
            className="category-detail__button"
            href="#category-products"
          >
            Explore collection
            <ArrowRight size={18} />
          </a>
        </div>
      </section>

      {/* Intro */}
      <section className="category-detail__intro">
        <div>
          <p className="category-detail__eyebrow">
            MADE FOR YOUR IDEAS
          </p>

          <h2>
            Discover what you can
            <span> create with us.</span>
          </h2>
        </div>

        <p>
          Explore our range of {category.title.toLowerCase()}.
          Choose a design, personalize your order, or contact us
          for a custom solution made to your requirements.
        </p>
      </section>

      {/* Collection */}
      <section
        className="category-detail__collection"
        id="category-products"
      >
        <div className="category-detail__section-heading">
          <div>
            <p className="category-detail__eyebrow">
              THE COLLECTION
            </p>

            <h2>
              {hasSubcategories
                ? "Explore by category"
                : "Explore our products"}
            </h2>
          </div>

          <span>
            {hasSubcategories
              ? `${subcategories.length} collections`
              : `${items.length} products`}
          </span>
        </div>

        {hasSubcategories ? (
          <div className="category-detail__grid">
            {subcategories.map((subcategory) => (
              <article
                className="detail-product-card"
                key={subcategory.id}
              >
                <div className="detail-product-card__image-wrap">
                  <img
                    src={
                      subcategory.image || category.image
                    }
                    alt={
                      subcategory.alt ||
                      `${subcategory.title} by Samudra Creatives`
                    }
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                <div className="detail-product-card__body">
                  <h3>{subcategory.title}</h3>

                  {subcategory.description && (
                    <p>{subcategory.description}</p>
                  )}

                  {subcategory.items?.length > 0 && (
                    <ul className="detail-product-card__items">
                      {subcategory.items.map((item) => (
                        <li key={item}>
                          <CheckCircle2 size={15} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  <Link
                    to="/contact"
                    className="detail-product-card__link"
                  >
                    Enquire about this
                    <ArrowUpRight size={17} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="category-detail__items-grid">
            {items.map((item) => (
              <article
                className="detail-item"
                key={item}
              >
                <span className="detail-item__check">
                  <CheckCircle2 size={17} />
                </span>

                <span>{item}</span>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Custom order CTA */}
      <section className="category-detail__cta">
        <div>
          <p className="category-detail__eyebrow">
            HAVE SOMETHING SPECIFIC IN MIND?
          </p>

          <h2>
            Let's make your
            <span> idea happen.</span>
          </h2>

          <p>
            Need a custom size, design, quantity, or finish?
            Talk to our team about your requirements.
          </p>
        </div>

        <Link
          className="category-detail__button"
          to="/categories"
        >
          Browse other categories
          <ArrowRight size={18} />
        </Link>
      </section>
    </main>
  );
}
