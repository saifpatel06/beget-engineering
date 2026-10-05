import Link from "next/link";
import Icon from "./Icons";
import styles from "./CTASection.module.css";

// Closing call-to-action band. All copy can be overridden per page.
const CTASection = ({
  title = "Have an Engineering Requirement?",
  text = "Talk to Beget Engineering about your next industrial, fabrication, automation or civil project.",
  primary = { label: "Request a Quote", href: "/request-quote" },
  secondary = { label: "Contact Us", href: "/contact" },
}) => {
  return (
    <section className={styles.cta} aria-labelledby="cta-title">
      <div className={`wrap ${styles.inner}`}>
        <div className={styles.copy}>
          <h2 id="cta-title" className={styles.title}>
            {title}
          </h2>
          <p className={styles.text}>{text}</p>
        </div>
        <div className={styles.actions}>
          <Link href={primary.href} className="bt bt-dark">
            {primary.label}
            <Icon name="arrowRight" size={20} />
          </Link>
          {secondary && (
            <Link href={secondary.href} className="bt bt-outline-dark">
              {secondary.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default CTASection;
