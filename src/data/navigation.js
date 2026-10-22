import { categories } from "./categories";
import { serviceGroups } from "./services";
import { packages } from "./packages";

export const navigation = [
  {
    label: "Home",
    href: "/",
  },

  {
    label: "Services",
    type: "mega",
    megaType: "services",
    columns: serviceGroups,
    footerLink: {
      label: "View All Services",
      href: "/services",
    },
  },

  {
    label: "Categories",
    type: "mega",
    megaType: "categories",
    items: categories,
    footerLink: {
      label: "View All Categories",
      href: "/categories",
    },
  },

  {
    label: "Packages",
    type: "mega",
    megaType: "packages",
    items: packages,
    footerLink: {
      label: "View All Packages",
      href: "/packages",
    },
  },

  {
    label: "Gallery",
    href: "/gallery",
  },

  {
    label: "About",
    href: "/about",
  },

  {
    label: "Contact",
    href: "/contact",
  },
];