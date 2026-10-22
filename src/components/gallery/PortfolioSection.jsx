

import { galleryConfig } from "../../data/projects";
import PortfolioGrid from "./PortfolioGrid";

export default function PortfolioSection() {
  return (
    <section className="gallery-portfolio" id="portfolio">
      <div className="gallery-container">
        <header className="gallery-section-heading">
          <span className="gallery-eyebrow">
            {galleryConfig.eyebrow}
          </span>

          <h1>{galleryConfig.title}</h1>

          <p>{galleryConfig.description}</p>
        </header>

        <PortfolioGrid />
      </div>
    </section>
  );
}
