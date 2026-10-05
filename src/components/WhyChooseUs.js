import Icon from "./Icons";
import SectionHeading from "./SectionHeading";
import site from "../../data/site";
import styles from "./WhyChooseUs.module.css";

// items: [{ icon, title, text }]. Defaults to the company-wide reasons; a service
// page can pass its own heading (and items) for "Why choose Beget for X".
const WhyChooseUs = ({
  items = site.whyBeget,
  title = "Why Beget Engineering",
  intro = "A dependable engineering partner since 1999, with one team accountable for your project from start to finish.",
  id = "why-beget",
}) => {
  return (
    <section id={id} className="section section-paper" aria-labelledby={`${id}-title`}>
      <div className="wrap">
        <SectionHeading id={`${id}-title`} title={title} intro={intro} />
        <ul className={styles.grid}>
          {items.map((item) => (
            <li key={item.title} className={styles.card}>
              <span className={styles.icon}>
                <Icon name={item.icon} size={28} />
              </span>
              <h3 className={styles.title}>{item.title}</h3>
              <p className={styles.text}>{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default WhyChooseUs;
