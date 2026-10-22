

import { projects } from "../../data/projects";
import PortfolioCard from "./PortfolioCard";

export default function PortfolioGrid() {
  return (
    <div className="portfolio-grid">
      {projects.map((project, index) => (
        <PortfolioCard
          key={project.id}
          project={project}
          index={index}
        />
      ))}
    </div>
  );
}