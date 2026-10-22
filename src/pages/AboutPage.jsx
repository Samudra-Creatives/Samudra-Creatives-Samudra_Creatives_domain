import { Link } from "react-router-dom";

export default function AboutPage() {
  return (
    <main className="categories-page">
      <section className="categories-hero">
        <div className="categories-hero__content">
          <p className="categories-eyebrow">SAMUDRA CREATIVES</p>
          <h1>Ideas Made <span>Tangible</span></h1>
          <p className="categories-hero__description">
            We bring printing, branding and personalized products together for
            businesses, celebrations and everyday moments.
          </p>
          <Link className="category-detail__button" to="/contact">
            Start a project
          </Link>
        </div>
      </section>
    </main>
  );
}
