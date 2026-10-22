

export default function MovingImageRow({
  images,
  direction = "left",
  duration = 34,
  rowLabel,
}) {
  return (
    <div
      className={`gallery-marquee gallery-marquee--${direction}`}
      style={{ "--marquee-duration": `${duration}s` }}
      aria-label={rowLabel}
    >
      <div className="gallery-marquee__track">
        {[0, 1].map((copy) => (
          <div
            className="gallery-marquee__group"
            key={copy}
            aria-hidden={copy === 1 ? "true" : undefined}
          >
            {images.map((project, index) => (
              <div
                className="gallery-marquee__item"
                key={`${copy}-${project.id}`}
              >
                <img
                  src={project.image}
                  alt={
                    copy === 0
                      ? project.alt || `${project.title} by Samudra Creatives`
                      : `${project.title} by Samudra Creatives`
                  }
                  loading="eager"
                  fetchPriority={index < 2 && copy === 0 ? "high" : "auto"}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
