import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../common/Icon";
import WhatsAppIcon from "../common/WhatsAppIcon";
import MegaMenu from "./MegaMenu";
import MobileMenu from "./MobileMenu";
import { navigation } from "../../data/navigation";
import { siteConfig } from "../../data/site";
import { createDefaultWhatsAppMessage } from "../../utils/createWhatsAppMessage";

export default function Navbar() {
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setActiveMenu(null);
        setMobileOpen(false);
      }
    };

    const handleOutsideClick = (event) => {
      if (
        navRef.current &&
        !navRef.current.contains(event.target)
      ) {
        setActiveMenu(null);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("keydown", handleEscape);
    document.addEventListener(
      "mousedown",
      handleOutsideClick,
    );

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleEscape);
      document.removeEventListener(
        "mousedown",
        handleOutsideClick,
      );
    };
  }, []);

  const handleMenuToggle = (label) => {
    setActiveMenu((current) =>
      current === label ? null : label,
    );
  };

  const handleMobileToggle = () => {
    setMobileOpen((current) => !current);
    setActiveMenu(null);
  };

  return (
    <header
      ref={navRef}
      className={`site-header ${
        scrolled ? "site-header--scrolled" : ""
      }`}
    >
      <div className="navbar">
        <div className="navbar__container">
          <Link
            to="/"
            className="navbar__brand"
            aria-label={siteConfig.name}
            onClick={() => setMobileOpen(false)}
          >
            <img
              src={siteConfig.logo}
              alt={siteConfig.name}
              className="navbar__logo"
            />

            <span className="navbar__brand-name">
              <strong>Samudra</strong>
              <small>Creatives</small>
            </span>
          </Link>

          <nav className="navbar__navigation">
            {navigation.map((item) => {
              const hasMegaMenu = item.type === "mega";

              if (!hasMegaMenu) {
                return (
                  <Link
                    to={item.href}
                    className="navbar__link"
                    key={item.label}
                  >
                    {item.label}
                  </Link>
                );
              }

              const isActive =
                activeMenu === item.label;

              return (
                <div
                  className={`navbar__dropdown ${
                    isActive
                      ? "navbar__dropdown--active"
                      : ""
                  }`}
                  key={item.label}
                >
                  <button
                    type="button"
                    className="navbar__link navbar__link--dropdown"
                    aria-expanded={isActive}
                    onClick={() =>
                      handleMenuToggle(item.label)
                    }
                    onMouseEnter={() =>
                      setActiveMenu(item.label)
                    }
                  >
                    {item.label}

                    <Icon
                      name="ChevronDown"
                      size={14}
                      className="navbar__chevron"
                    />
                  </button>

                  <div
                    className="navbar__mega-wrapper"
                    onMouseLeave={() =>
                      setActiveMenu(null)
                    }
                  >
                    <MegaMenu item={item} />
                  </div>
                </div>
              );
            })}
          </nav>

          <div className="navbar__actions">
            <a
              href={createDefaultWhatsAppMessage()}
              target="_blank"
              rel="noopener noreferrer"
              className="navbar__whatsapp"
              aria-label="WhatsApp order"
              title="WhatsApp order"
            >
              <WhatsAppIcon size={30} />
            </a>

            <Link
              to={siteConfig.primaryCta.href}
              className="navbar__quote"
            >
              {siteConfig.primaryCta.label}
            </Link>
          </div>

          <button
            type="button"
            className="navbar__mobile-toggle"
            onClick={handleMobileToggle}
            aria-label={
              mobileOpen
                ? "Close navigation"
                : "Open navigation"
            }
            aria-expanded={mobileOpen}
          >
            <Icon
              name={mobileOpen ? "X" : "Menu"}
              size={23}
            />
          </button>
        </div>
      </div>

      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />
    </header>
  );
}