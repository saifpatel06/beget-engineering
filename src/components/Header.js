import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import Icon from "./Icons";
import site from "../../data/site";
import styles from "./Header.module.css";

const DESKTOP_QUERY = "(min-width: 1100px)";

const Header = ({ services = [] }) => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef(null);

  const path = router.asPath.split("?")[0].split("#")[0];
  const isActive = (href) => (href === "/" ? path === "/" : path.startsWith(href));

  // Sticky header gets a shadow once the page is scrolled
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus after navigating
  useEffect(() => {
    const close = () => {
      setMenuOpen(false);
      setServicesOpen(false);
    };
    router.events.on("routeChangeStart", close);
    return () => router.events.off("routeChangeStart", close);
  }, [router.events]);

  // Close on outside click / Escape
  useEffect(() => {
    const onClick = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setServicesOpen(false);
        setMenuOpen(false);
      }
    };
    const onKey = (event) => {
      if (event.key === "Escape") {
        setServicesOpen(false);
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const isDesktop = () => typeof window !== "undefined" && window.matchMedia(DESKTOP_QUERY).matches;

  return (
    <header ref={headerRef} className={`${styles.header} ${scrolled ? styles.scrolled : ""} dark`}>
      <div className={`wrap ${styles.bar}`}>
        <Link href="/" className={styles.logo} aria-label={`${site.name}, home`}>
          <Image src="/images/logo.png" alt="" width={44} height={44} priority className={styles.logoMark} />
          <span className={styles.logoText}>
            <span className={styles.logoName}>BEGET</span>
            <span className={styles.logoSub}>ENGINEERING</span>
          </span>
        </Link>

        <button
          type="button"
          className={styles.toggle}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <Icon name={menuOpen ? "close" : "menu"} size={26} />
          <span className="visually-hidden">{menuOpen ? "Close menu" : "Open menu"}</span>
        </button>

        <nav
          id="primary-navigation"
          aria-label="Primary"
          className={`${styles.nav} ${menuOpen ? styles.navOpen : ""}`}
        >
          <ul className={styles.list}>
            <li>
              <Link
                href="/"
                className={`${styles.link} ${isActive("/") ? styles.active : ""}`}
                aria-current={isActive("/") ? "page" : undefined}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className={`${styles.link} ${isActive("/about") ? styles.active : ""}`}
                aria-current={isActive("/about") ? "page" : undefined}
              >
                About Us
              </Link>
            </li>

            <li
              className={styles.hasDropdown}
              onMouseEnter={() => isDesktop() && setServicesOpen(true)}
              onMouseLeave={() => isDesktop() && setServicesOpen(false)}
            >
              <button
                type="button"
                className={`${styles.link} ${styles.dropButton} ${isActive("/services") ? styles.active : ""}`}
                aria-expanded={servicesOpen}
                aria-controls="services-menu"
                onClick={() => setServicesOpen((open) => !open)}
              >
                Services
                <Icon name="chevronDown" size={16} className={servicesOpen ? styles.flip : ""} />
              </button>
              <ul
                id="services-menu"
                className={`${styles.dropdown} ${servicesOpen ? styles.dropdownOpen : ""}`}
              >
                {services.map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={`/services/${service.slug}`}
                      className={styles.dropLink}
                      aria-current={path === `/services/${service.slug}` ? "page" : undefined}
                      tabIndex={servicesOpen ? 0 : -1}
                    >
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>

            <li>
              <Link
                href="/projects"
                className={`${styles.link} ${isActive("/projects") ? styles.active : ""}`}
                aria-current={isActive("/projects") ? "page" : undefined}
              >
                Projects
              </Link>
            </li>
            <li>
              <Link href="/#why-beget" className={styles.link}>
                Why Beget
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className={`${styles.link} ${isActive("/contact") ? styles.active : ""}`}
                aria-current={isActive("/contact") ? "page" : undefined}
              >
                Contact
              </Link>
            </li>
            <li className={styles.ctaItem}>
              <Link href="/request-quote" className={`bt bt-primary ${styles.cta}`}>
                Request a Quote
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
