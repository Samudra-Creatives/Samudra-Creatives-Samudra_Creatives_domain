import { Link } from "react-router-dom";
import Icon from "../common/Icon";

function ServiceMegaMenu({ item }) {
  return (
    <div className="mega-menu mega-menu--services">
      <div className="mega-menu__header">
        <div>
          <span className="mega-menu__eyebrow">EXPLORE</span>
          <h3>Our Services</h3>
        </div>

        <p>
          Printing, personalization, branding, awards and creative
          solutions under one roof.
        </p>
      </div>

      <div className="mega-menu__service-grid">
        {item.columns.map((group) => (
          <div
            className="mega-menu__column"
            key={group.id}
          >
            <h4>{group.title}</h4>

            <div className="mega-menu__items">
              {group.items.map((service) => (
                <Link
                  to={service.href}
                  className="mega-menu__item"
                  key={service.slug}
                >
                  <span className="mega-menu__item-icon">
                    <Icon
                      name={service.icon}
                      size={16}
                    />
                  </span>

                  <span>
                    <strong>{service.title}</strong>
                    <small>{service.description}</small>
                  </span>

                  <Icon
                    name="ChevronRight"
                    size={14}
                    className="mega-menu__arrow"
                  />
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <MegaMenuFooter link={item.footerLink} />
    </div>
  );
}

function CategoryMegaMenu({ item }) {
  return (
    <div className="mega-menu">
      <div className="mega-menu__header">
        <div>
          <span className="mega-menu__eyebrow">EXPLORE</span>
          <h3>Shop by Category</h3>
        </div>

        <p>
          Discover printing, gifting, branding, awards and
          customization categories.
        </p>
      </div>

      <div className="mega-menu__category-grid">
        {item.items.map((category) => (
          <Link
            to={`/categories/${category.slug}`}
            className="category-mega-card"
            key={category.id}
          >
            <div className="category-mega-card__image">
              <img
                src={category.image}
                alt={category.title}
                loading="lazy"
              />
            </div>

            <div className="category-mega-card__content">
              <div className="category-mega-card__icon">
                <Icon
                  name={category.icon}
                  size={17}
                />
              </div>

              <div>
                <strong>{category.title}</strong>
                <p>{category.description}</p>
              </div>

              <Icon
                name="ChevronRight"
                size={15}
              />
            </div>
          </Link>
        ))}
      </div>

      <MegaMenuFooter link={item.footerLink} />
    </div>
  );
}

function PackageMegaMenu({ item }) {
  return (
    <div className="mega-menu mega-menu--packages">
      <div className="mega-menu__header">
        <div>
          <span className="mega-menu__eyebrow">SPECIAL COMBOS</span>
          <h3>Popular Packages</h3>
        </div>

        <p>
          Ready-made combinations for events, businesses and
          personalized gifting.
        </p>
      </div>

      <div className="package-mega-grid">
        {item.items.map((pkg) => (
          <Link
            to={`/packages/${pkg.id}`}
            className={`package-mega-card ${
              pkg.featured
                ? "package-mega-card--featured"
                : ""
            }`}
            key={pkg.id}
          >
            {pkg.featured && (
              <span className="package-mega-card__badge">
                MOST POPULAR
              </span>
            )}

            <div className="package-mega-card__icon">
              <Icon
                name="Package"
                size={21}
              />
            </div>

            <h4>{pkg.name}</h4>

            <p>{pkg.description}</p>

            <ul>
              {pkg.items.slice(0, 4).map((feature) => (
                <li key={feature}>
                  <Icon
                    name="BadgeCheck"
                    size={14}
                  />
                  {feature}
                </li>
              ))}
            </ul>

            <span className="package-mega-card__link">
              Explore Package
              <Icon
                name="ChevronRight"
                size={15}
              />
            </span>
          </Link>
        ))}
      </div>

      <MegaMenuFooter link={item.footerLink} />
    </div>
  );
}

function MegaMenuFooter({ link }) {
  return (
    <div className="mega-menu__footer">
      <Link to={link.href}>
        {link.label}
        <Icon
          name="ChevronRight"
          size={16}
        />
      </Link>
    </div>
  );
}

export default function MegaMenu({ item }) {
  if (item.megaType === "services") {
    return <ServiceMegaMenu item={item} />;
  }

  if (item.megaType === "categories") {
    return <CategoryMegaMenu item={item} />;
  }

  if (item.megaType === "packages") {
    return <PackageMegaMenu item={item} />;
  }

  return null;
}