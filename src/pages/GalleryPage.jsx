

import { useEffect } from "react";
import HeroSection from "../components/gallery/HeroSection";
import PortfolioSection from "../components/gallery/PortfolioSection";
import GalleryContactCTA from "../components/gallery/GalleryContactCTA";
import "../styles/gallery.css";

export default function GalleryPage() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Gallery | Samudra Creatives";

    let description = document.querySelector(
      'meta[name="description"]'
    );

    const createdDescription = !description;

    if (!description) {
      description = document.createElement("meta");
      description.name = "description";
      document.head.appendChild(description);
    }

    const previousDescription = description.content;
    description.content =
      "Explore selected creative designs, branding, advertising campaigns, packaging and print projects by Samudra Creatives.";

    return () => {
      document.title = previousTitle;
      if (createdDescription) {
        description.remove();
      } else {
        description.content = previousDescription;
      }
    };
  }, []);

  return (
    <main className="gallery-page">
      <HeroSection />
      <PortfolioSection />
      <GalleryContactCTA />
    </main>
  );
}
