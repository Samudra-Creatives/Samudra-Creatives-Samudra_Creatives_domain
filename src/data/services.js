export const services = [
  {
    id: "digital-printing",
    title: "Digital Printing",
    shortTitle: "Digital Printing",
    description:
      "High-quality digital printing for business, personal and promotional needs.",
    image: "/images/services/digital-printing.webp",
    href: "/services/digital-printing",
    category: "Printing",
    size: "large",
    featured: true,
    alt: "Digital printing services by Samudra Creatives",
  },

  {
    id: "flex-printing",
    title: "Flex Printing",
    shortTitle: "Flex Printing",
    description:
      "Large-format flex printing for banners, backdrops, promotions and events.",
    image: "/images/services/flex-printing.webp",
    href: "/services/flex-printing",
    category: "Printing",
    size: "small",
    featured: true,
    alt: "Flex printing services by Samudra Creatives",
  },

  {
    id: "uv-printing",
    title: "UV Printing",
    shortTitle: "UV Printing",
    description:
      "Premium UV printing on a wide range of materials and surfaces.",
    image: "/images/services/uv-printing.webp",
    href: "/services/uv-printing",
    category: "Printing",
    size: "small",
    featured: true,
    alt: "UV printing services by Samudra Creatives",
  },

  {
    id: "dtf-printing",
    title: "DTF Printing",
    shortTitle: "DTF Printing",
    description:
      "Custom apparel printing for brands, teams, businesses and individuals.",
    image: "/images/services/dtf-printing.webp",
    href: "/services/dtf-printing",
    category: "Apparel",
    size: "wide",
    featured: true,
    alt: "DTF apparel printing by Samudra Creatives",
  },

  {
    id: "photo-printing",
    title: "Photo Printing",
    shortTitle: "Photo Printing",
    description:
      "Professional photo prints, enlargements and personalized memories.",
    image: "/images/services/photo-printing.webp",
    href: "/services/photo-printing",
    category: "Photo",
    size: "small",
    featured: false,
    alt: "Photo printing services by Samudra Creatives",
  },

  {
    id: "laser-marking",
    title: "Laser Marking",
    shortTitle: "Laser Marking",
    description:
      "Precision laser engraving and marking for personalized products.",
    image: "/images/services/laser-marking.webp",
    href: "/services/laser-marking",
    category: "Personalization",
    size: "small",
    featured: false,
    alt: "Laser marking services by Samudra Creatives",
  },

  {
    id: "wedding-printing",
    title: "Wedding Printing",
    shortTitle: "Wedding Printing",
    description:
      "Invitations, wedding stationery and personalized celebration products.",
    image: "/images/services/wedding-printing.webp",
    href: "/services/wedding-printing",
    category: "Wedding",
    size: "wide",
    featured: false,
    alt: "Wedding printing services by Samudra Creatives",
  },

  {
    id: "branding",
    title: "Business Branding",
    shortTitle: "Business Branding",
    description:
      "Professional branding materials that help businesses stand out.",
    image: "/images/services/business-branding.webp",
    href: "/services/business-branding",
    category: "Branding",
    size: "small",
    featured: false,
    alt: "Business branding services by Samudra Creatives",
  },
];

const serviceGroupIcons = {
  Printing: "Printer",
  Apparel: "Shirt",
  Photo: "Image",
  Personalization: "PenTool",
  Wedding: "Heart",
  Branding: "Building2",
};

export const serviceGroups = Object.values(
  services.reduce((groups, service) => {
    const group = groups[service.category] ?? {
      id: service.category.toLowerCase(),
      title: service.category,
      items: [],
    };

    group.items.push({
      ...service,
      slug: service.id,
      icon: serviceGroupIcons[service.category] ?? "Layers",
    });

    groups[service.category] = group;
    return groups;
  }, {}),
);