import { Link, useParams } from "react-router-dom";
import { services } from "../data/services";

export default function ServiceDetailsPage() {
  const { slug } = useParams();
  const service = services.find((item) => item.id === slug);

  if (!service) {
    return (
      <main className="category-detail category-detail--not-found">
        <div>
          <h1>Service not found</h1>
          <Link className="category-detail__button" to="/services">
            Browse all services
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
          style={{ backgroundImage: `url("${service.image}")` }}
          aria-hidden="true"
        />
        <div className="category-detail__hero-shade" />
        <div className="category-detail__hero-inner">
          <p className="category-detail__eyebrow">{service.category}</p>
          <h1>{service.title}</h1>
          <p className="category-detail__hero-description">{service.description}</p>
          <Link className="category-detail__button" to="/contact">
            Enquire about this service
          </Link>
        </div>
      </section>
    </main>
  );
}
