import Icon from "./Icons";
import SectionHeading from "./SectionHeading";
import styles from "./ServiceOverview.module.css";

// Overview text + capabilities checklist for one service. Data arrives via `service`.
const ServiceOverview = ({ service }) => {
  const paragraphs = (service.description || "").split("\n\n").filter(Boolean);

  return (
    <section id="overview" className="section" aria-labelledby="overview-title">
      <div className="wrap">
        <div className="row g-5">
          <div className="col-12 col-lg-7">
            <SectionHeading id="overview-title" title={`${service.name} overview`} />
            <div className={styles.body}>
              {paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="col-12 col-lg-5">
            <div className={styles.panel}>
              <h2 className={styles.panelTitle}>Capabilities</h2>
              <ul className={styles.list}>
                {(service.capabilities || []).map((capability) => (
                  <li key={capability}>
                    <Icon name="check" size={22} />
                    <span>{capability}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceOverview;
