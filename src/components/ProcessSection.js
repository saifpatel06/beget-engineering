import SectionHeading from "./SectionHeading";
import site from "../../data/site";
import styles from "./ProcessSection.module.css";

// Turnkey process: horizontal on large screens, vertical on tablet/mobile.
// The numbers are real here because the content is a sequence.
const ProcessSection = ({
  steps = site.process,
  title = "Turnkey project process",
  intro = "One team, seven stages. From the first conversation to the day you take over.",
  id = "process",
  dark = true,
}) => {
  return (
    <section id={id} className={`section ${dark ? "section-dark dark" : ""}`} aria-labelledby={`${id}-title`}>
      <div className="wrap">
        <SectionHeading id={`${id}-title`} title={title} intro={intro} dark={dark} />
        <ol className={styles.steps}>
          {steps.map((step, index) => (
            <li key={step.title} className={styles.step}>
              <span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>
              <h3 className={styles.title}>{step.title}</h3>
              <p className={styles.text}>{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default ProcessSection;
