

import { ArrowUpRight } from "lucide-react";

export default function PortfolioCard({ project, index }) {
  const isContactLink =
    !project.href ||
    project.href === "#contact" ||
    project.href.startsWith("mailto:") ||
    project.href.startsWith("https://") ||
    project.href.startsWith("http://");

  return (
    <article
      className={`portfolio-card portfolio-card--${project.size || "normal"}`}
      style={{ "--card-index": index }}
    >
      <a
        className="portfolio-card__link"
        href={project.href || "#contact"}
        aria-label={`View ${project.title}, ${project.category}`}
        target={
          project.href?.startsWith("https://") ||
          project.href?.startsWith("http://")
            ? "_blank"
            : undefined
        }
        rel={
          project.href?.startsWith("https://") ||
          project.href?.startsWith("http://")
            ? "noopener noreferrer"
            : undefined
        }
        onClick={(event) => {
          if (isContactLink && project.href === "#contact") {
            event.preventDefault();
            document.getElementById("contact")?.scrollIntoView({
              behavior: window.matchMedia(
                "(prefers-reduced-motion: reduce)"
              ).matches
                ? "auto"
                : "smooth",
              block: "start",
            });
          }
        }}
      >
        
<img
  className="portfolio-card__image"
  src={project.image}
  alt={project.alt || `${project.title} by Samudra Creatives`}
  loading="lazy"
  decoding="async"
/>


        <div className="portfolio-card__overlay">
          <div className="portfolio-card__meta">
            <span>{project.category}</span>
            <ArrowUpRight size={19} aria-hidden="true" />
          </div>

          <div className="portfolio-card__details">
            <h3>{project.title}</h3>
            {project.description && <p>{project.description}</p>}

            <span className="portfolio-card__cta">
              View Project <ArrowUpRight size={15} aria-hidden="true" />
            </span>
          </div>
        </div>
      </a>
    </article>
  );
}