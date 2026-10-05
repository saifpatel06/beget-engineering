import styles from "./SectionHeading.module.css";

// Shared heading block: orange "weld line", title, optional intro.
const SectionHeading = ({ title, intro, id, dark = false, align = "left", as: Tag = "h2" }) => {
  return (
    <div className={`${styles.heading} ${align === "center" ? styles.center : ""} ${dark ? styles.dark : ""}`}>
      <span className={styles.rule} aria-hidden="true" />
      <Tag id={id} className={styles.title}>
        {title}
      </Tag>
      {intro && <p className={styles.intro}>{intro}</p>}
    </div>
  );
};

export default SectionHeading;
