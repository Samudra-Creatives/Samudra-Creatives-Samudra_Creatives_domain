
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search, ArrowUpRight, PackageOpen } from "lucide-react";
import { categories } from "../data/categories";
import "../styles/categories.css";

export default function CategoriesPage() {
  const [search, setSearch] = useState("");

  const filteredCategories = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return categories;

    return categories.filter((category) => {
      const searchableText = [
        category.title,
        category.description,
        ...(category.items || []),
      ]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(query);
    });
  }, [search]);

  useEffect(() => {
    const previousTitle = document.title;
    document.title =
      "Printing & Gifting Categories | Samudra Creatives";

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

    description.content =
      "Explore printing, wedding cards, personalized gifts, photo frames, trophies, apparel, signage and custom products from Samudra Creatives.";

    return () => {
      document.title = previousTitle;

      if (createdDescription) {
        description.remove();
      } else {
        description.content = previousDescription;
      }
    };
  }, []);

  return (
    <main className="categories-page">
      <section className="categories-hero">
        <div className="categories-hero__image" aria-hidden="true" />

        <div className="categories-hero__content">
          <p className="categories-eyebrow">
            PRINTING · BRANDING · PERSONALIZATION
          </p>

          <h1>
            Explore Our
            <span> Categories</span>
          </h1>

          <p className="categories-hero__description">
            Discover thoughtful printing and customized products
            for your business, celebrations, and everyday moments.
          </p>

          <form
            className="categories-search"
            role="search"
            onSubmit={(event) => {
              event.preventDefault();
              document
                .getElementById("category-results")
                ?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
            }}
          >
            <Search size={21} aria-hidden="true" />

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search products and categories..."
              aria-label="Search products and categories"
            />

            <button type="submit">
              Search
              <ArrowUpRight size={17} aria-hidden="true" />
            </button>
          </form>

          <div className="categories-trust">
            <span>Premium Quality</span>
            <span>Custom Designs</span>
            <span>Made for You</span>
          </div>
        </div>
      </section>

      <section
        className="categories-results"
        id="category-results"
        aria-labelledby="categories-heading"
      >
        <div className="categories-section-heading">
          <div>
            <p className="categories-eyebrow">FIND WHAT YOU NEED</p>
            <h2 id="categories-heading">Browse Categories</h2>
            <p>
              From everyday printing to personalized gifts, explore
              the possibilities.
            </p>
          </div>

          <span className="categories-count">
            {filteredCategories.length}{" "}
            {filteredCategories.length === 1
              ? "category"
              : "categories"}
          </span>
        </div>

        {filteredCategories.length > 0 ? (
          <div className="categories-grid">
            {filteredCategories.map((category) => (
              <article
                className="category-card"
                key={category.id}
              >
                <Link
                  className="category-card__link"
                  to={`/categories/${category.slug}`}
                  aria-label={`Explore ${category.title}`}
                >
                  <div className="category-card__image-wrap">
                    <img
                      className="category-card__image"
                      src={category.image}
                      alt={
                        category.alt ||
                        `${category.title} by Samudra Creatives`
                      }
                      loading="lazy"
                      decoding="async"
                    />

                    <span className="category-card__arrow">
                      <ArrowUpRight size={19} />
                    </span>
                  </div>

                  <div className="category-card__content">
                    <p className="category-card__eyebrow">
                      SAMUDRA CREATIVES
                    </p>

                    <h3>{category.title}</h3>

                    <p className="category-card__description">
                      {category.description}
                    </p>

                    <span className="category-card__action">
                      Explore category
                      <ArrowUpRight size={16} />
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="categories-empty">
            <PackageOpen size={34} aria-hidden="true" />
            <h3>No matching categories</h3>
            <p>
              Try a different product name or clear your search.
            </p>
            <button
              type="button"
              onClick={() => setSearch("")}
            >
              Clear search
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
