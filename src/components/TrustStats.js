import site from "../../data/site";
import styles from "./TrustStats.module.css";

// Company facts plate that overlaps the bottom of the hero.
// Only real, supplied facts: no invented revenue or client numbers.
const TrustStats = ({ stats = site.stats }) => {
  return (
    <section className={`${styles.wrapper} dark`} aria-label="Company at a glance">
      <div className="wrap">
        <dl className={styles.plate}>
          {stats.map((item) => (
            <div key={item.label} className={styles.item}>
              <dt className={styles.value}>{item.value}</dt>
              <dd className={styles.label}>
                <strong>{item.label}</strong>
                <span>{item.note}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

export default TrustStats;
