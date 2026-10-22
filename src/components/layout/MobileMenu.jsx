import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../common/Icon";
import WhatsAppIcon from "../common/WhatsAppIcon";
import { navigation } from "../../data/navigation";
import { createDefaultWhatsAppMessage } from "../../utils/createWhatsAppMessage";

export default function MobileMenu({
  open,
  onClose,
}) {
  const [expanded, setExpanded] = useState(null);

  if (!open) {
    return null;
  }

  const toggle = (label) => {
    setExpanded((current) =>
      current === label ? null : label,
    );
  };

  return (
    <div className="mobile-menu">
      <div className="mobile-menu__inner">
        {navigation.map((item) => {
          if (item.type !== "mega") {
            return (
              <Link
                key={item.label}
                to={item.href}
                className="mobile-menu__link"
                onClick={onClose}
              >
                {item.label}
              </Link>
            );
          }

          const isExpanded =
            expanded === item.label;

          return (
            <div
              className="mobile-menu__group"
              key={item.label}
            >
              <button
                type="button"
                className="mobile-menu__group-button"
                onClick={() => toggle(item.label)}
                aria-expanded={isExpanded}
              >
                <span>{item.label}</span>

                <Icon
                  name="ChevronDown"
                  size={17}
                  className={
                    isExpanded
                      ? "mobile-menu__rotated"
                      : ""
                  }
                />
              </button>

              <div
                className={`mobile-menu__submenu ${
                  isExpanded
                    ? "mobile-menu__submenu--open"
                    : ""
                }`}
              >
                {item.megaType === "services" &&
                  item.columns.map((group) => (
                    <div
                      className="mobile-menu__column"
                      key={group.id}
                    >
                      <span className="mobile-menu__column-title">
                        {group.title}
                      </span>

                      {group.items.map((service) => (
                        <Link
                          to={service.href}
                          key={service.slug}
                          onClick={onClose}
                        >
                          {service.title}
                        </Link>
                      ))}
                    </div>
                  ))}

                {item.megaType === "categories" &&
                  item.items.map((category) => (
                    <Link
                      to={`/categories/${category.slug}`}
                      key={category.id}
                      onClick={onClose}
                    >
                      <Icon
                        name={category.icon}
                        size={16}
                      />

                      {category.title}
                    </Link>
                  ))}

                {item.megaType === "packages" &&
                  item.items.map((pkg) => (
                    <Link
                      to={`/packages/${pkg.id}`}
                      key={pkg.id}
                      onClick={onClose}
                    >
                      <Icon
                        name="Package"
                        size={16}
                      />

                      {pkg.name}
                    </Link>
                  ))}

                <Link
                  to={item.footerLink.href}
                  className="mobile-menu__view-all"
                  onClick={onClose}
                >
                  {item.footerLink.label}
                  <Icon
                    name="ChevronRight"
                    size={15}
                  />
                </Link>
              </div>
            </div>
          );
        })}

        <div className="mobile-menu__actions">
          <a
            href={createDefaultWhatsAppMessage()}
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-menu__whatsapp"
            aria-label="WhatsApp order"
            title="WhatsApp order"
          >
            <WhatsAppIcon size={30} />
          </a>

          <Link
            to="/contact"
            className="mobile-menu__quote"
            onClick={onClose}
          >
            Get a Quote
          </Link>
        </div>
      </div>
    </div>
  );
}