import Link from "next/link";
import Image from "next/image";
import Icon from "./Icons";
import site from "../../data/site";
import styles from "./Footer.module.css";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Why Beget", href: "/#why-beget" },
  { label: "Contact", href: "/contact" },
  { label: "Request a Quote", href: "/request-quote" },
];

const Footer = ({ services = [] }) => {
  const { contact } = site;

  return (
    <footer className={`${styles.footer} dark`}>
      <div className="wrap">
        <div className="row g-5">
          <div className="col-12 col-lg-4">
            <Link href="/" className={styles.logo} aria-label={`${site.name}, home`}>
              <Image src="/images/logo.png" alt="" width={48} height={48} className={styles.logoMark} />
              <span className={styles.logoText}>
                <span className={styles.logoName}>BEGET</span>
                <span className={styles.logoSub}>ENGINEERING</span>
              </span>
            </Link>
            <p className={styles.about}>{site.description}</p>
            <ul className={styles.social} aria-label="Social media">
              {site.social.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className={styles.socialLink}>
                    <Icon name={item.icon} size={20} />
                    <span className="visually-hidden">{item.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav className="col-6 col-md-4 col-lg-2" aria-label="Quick links">
            <h2 className={styles.title}>Quick links</h2>
            <ul className={styles.list}>
              {quickLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={styles.link}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="col-6 col-md-8 col-lg-3" aria-label="Services">
            <h2 className={styles.title}>Services</h2>
            <ul className={`${styles.list} ${styles.twoCol}`}>
              {services.map((service) => (
                <li key={service.slug}>
                  <Link href={`/services/${service.slug}`} className={styles.link}>
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="col-12 col-md-6 col-lg-3">
            <h2 className={styles.title}>Contact</h2>
            <ul className={styles.contact}>
              <li>
                <Icon name="pin" size={20} />
                <address className={styles.address}>
                  {contact.address.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </address>
              </li>
              <li>
                <Icon name="phone" size={20} />
                <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className={styles.link}>
                  {contact.phone}
                </a>
              </li>
              <li>
                <Icon name="mail" size={20} />
                <a href={`mailto:${contact.email}`} className={styles.link}>
                  {contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>
            &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>Engineering, manufacturing and contracting since {site.established}.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
