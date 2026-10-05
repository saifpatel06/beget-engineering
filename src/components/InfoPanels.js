import Link from "next/link";
import Icon from "./Icons";
import SectionHeading from "./SectionHeading";
import styles from "./InfoPanels.module.css";

// Generic heading + grid of panels (icon, title, text, optional links).
// Used on the About page for vision/mission, quality & safety, capabilities and sectors.
// items: [{ icon, title, text, links?: [{ label, href }] }]
const InfoPanels = ({ id, title, intro, items = [], columns = 3, paper = false, dark = false }) => {
  return (
    <section
      id={id}
      className={`section ${paper ? "section-paper" : ""} ${dark ? "section-dark dark" : ""}`}
      aria-labelledby={`${id}-title`}
    >
      <div className="wrap">
        <SectionHeading id={`${id}-title`} title={title} intro={intro} dark={dark} />
        <ul className={`${styles.grid} ${styles[`cols${columns}`]}`}>
          {items.map((item) => (
            <li key={item.title} className={`${styles.panel} ${dark ? styles.panelDark : ""}`}>
              {item.icon && (
                <span className={styles.icon}>
                  <Icon name={item.icon} size={26} />
                </span>
              )}
              <h3 className={styles.title}>{item.title}</h3>
              <p className={styles.text}>{item.text}</p>
              {item.links && item.links.length > 0 && (
                <ul className={styles.links}>
                  {item.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href}>
                        {link.label}
                        <Icon name="arrowRight" size={16} />
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default InfoPanels;
