import { Link, useParams } from "react-router-dom";
import { packages } from "../data/packages";

export default function PackageDetailsPage() {
  const { id } = useParams();
  const item = packages.find((pkg) => pkg.id === id);

  if (!item) {
    return (
      <main className="category-detail category-detail--not-found">
        <div>
          <h1>Package not found</h1>
          <Link className="category-detail__button" to="/packages">
            Browse all packages
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="category-detail">
      <section className="category-detail__hero">
        <div
          className="category-detail__hero-image"
          style={{ backgroundImage: `url("${item.image}")` }}
          aria-hidden="true"
        />
        <div className="category-detail__hero-shade" />
        <div className="category-detail__hero-inner">
          <p className="category-detail__eyebrow">{item.subtitle}</p>
          <h1>{item.name} Package</h1>
          <p className="category-detail__hero-description">{item.description}</p>
          <Link className="category-detail__button" to="/contact">
            Get a package quote
          </Link>
        </div>
      </section>
      <section className="category-detail__items-grid">
        {item.items.map((product) => (
          <article className="detail-item" key={product}>
            <span>{product}</span>
          </article>
        ))}
      </section>
    </main>
  );
}
