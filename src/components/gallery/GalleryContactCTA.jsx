
import { ArrowUpRight } from "lucide-react";
import { galleryConfig } from "../../data/projects";

export default function GalleryContactCTA() {
  const message = encodeURIComponent(
    "Hi! I viewed your creative portfolio and would like to discuss a project."
  );

  const whatsappUrl =
    `https://wa.me/${galleryConfig.whatsappNumber}?text=${message}`;

  return (
    <section className="gallery-contact" id="contact">
      <div className="gallery-contact__inner">
        <span className="gallery-eyebrow">
          LET'S WORK TOGETHER
        </span>

        <h2>{galleryConfig.contactTitle}</h2>

        <p>{galleryConfig.contactDescription}</p>

        <div className="gallery-contact__actions">
          <a
            className="gallery-button gallery-button--primary"
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {galleryConfig.primaryCta}
            <ArrowUpRight size={18} />
          </a>

          <a
            className="gallery-button gallery-button--secondary"
            href={`mailto:${galleryConfig.email}`}
          >
            {galleryConfig.secondaryCta}
          </a>
        </div>
      </div>
    </section>
  );
}
