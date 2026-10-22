

import { projects } from "../../data/projects";
import MovingImageRow from "./MovingImageRow";

export default function HeroSection() {
  const firstRow = projects.slice(0, 6);
  const secondRow = [...projects.slice(6, 12)].reverse();

  return (
    <section className="gallery-hero" aria-label="Creative work preview">
      <div className="gallery-hero__rows">
        <MovingImageRow
          images={firstRow}
          direction="right"
          duration={38}
          rowLabel="Selected creative projects, moving right"
        />

        <MovingImageRow
          images={secondRow}
          direction="left"
          duration={31}
          rowLabel="More creative projects, moving left"
        />
      </div>

      <div className="gallery-hero__fade gallery-hero__fade--left" />
      <div className="gallery-hero__fade gallery-hero__fade--right" />
    </section>
  );
}
