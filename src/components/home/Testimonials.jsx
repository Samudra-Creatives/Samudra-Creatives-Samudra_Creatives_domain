import { ArrowUpRight, Quote, Star } from "lucide-react";
import { testimonials, testimonialConfig } from "../../data/testimonials";
import ScrollReveal from "../common/ScrollReveal";
import { Link } from "react-router-dom";

export default function Testimonials() {
  return (
    <section
      className="testimonials"
      aria-labelledby="testimonials-title"
    >
      <div className="container testimonials__container">
        <ScrollReveal as="header" className="testimonials__header">
          <div>
            <span className="testimonials__eyebrow">
              {testimonialConfig.eyebrow}
            </span>

            <h2 id="testimonials-title" className="testimonials__title">
              {testimonialConfig.title}
              <span>{testimonialConfig.highlightedTitle}</span>
            </h2>
          </div>

          <p className="testimonials__description">
            {testimonialConfig.description}
          </p>
        </ScrollReveal>

        <div className="testimonials__grid">
          {testimonials.map((item, index) => (
            <ScrollReveal
              as="article"
              className={`testimonial-card testimonial-card--${index + 1}`}
              key={item.id}
              delay={Math.min(index * 70, 280)}
            >
              <div className="testimonial-card__top">
                <span className="testimonial-card__quote">
                  <Quote size={22} />
                </span>

                <div
                  className="testimonial-card__rating"
                  aria-label={`${item.rating} out of 5 stars`}
                >
                  {Array.from({ length: 5 }, (_, starIndex) => (
                    <Star
                      key={starIndex}
                      size={14}
                      fill={
                        starIndex < item.rating
                          ? "currentColor"
                          : "none"
                      }
                    />
                  ))}
                </div>
              </div>

              <blockquote className="testimonial-card__review">
                “{item.review}”
              </blockquote>

              <div className="testimonial-card__customer">
                <div className="testimonial-card__avatar">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={`${item.name} testimonial`}
                      loading="lazy"
                    />
                  ) : (
                    <span aria-hidden="true">
                      {item.name.trim().charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>

                <div>
                  <h3>{item.name}</h3>
                  <p>{item.role}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}

          <Link
            className="testimonial-invite"
            to="/contact"
          >
            <span className="testimonial-invite__icon">
              <ArrowUpRight size={22} />
            </span>

            <span className="testimonial-invite__eyebrow">
              YOUR EXPERIENCE MATTERS
            </span>

            <h3>
              Let's create
              <span> something great.</span>
            </h3>

            <p>
              Have a project in mind? We'd love to hear from you.
            </p>

            <span className="testimonial-invite__link">
              Start Your Project
              <ArrowUpRight size={17} />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}