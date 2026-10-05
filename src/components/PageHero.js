import Image from "next/image";
import Breadcrumb from "./Breadcrumb";
import styles from "./PageHero.module.css";

// Hero for inner pages. Renders the page's single <h1>.
// actions: optional React node (buttons)
const PageHero = ({
  title,
  description,
  image,
  imageAlt = "",
  breadcrumb = [],
  actions = null,
  tall = false,
}) => {
  return (
    <section className={`${styles.hero} ${tall ? styles.tall : ""} dark`}>
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        className={styles.image}
      />
      <div className={styles.overlay} aria-hidden="true" />
      <div className={`wrap ${styles.content}`}>
        {breadcrumb.length > 0 && <Breadcrumb items={breadcrumb} />}
        <h1 className={styles.title}>{title}</h1>
        {description && <p className={styles.text}>{description}</p>}
        {actions && <div className={styles.actions}>{actions}</div>}
      </div>
    </section>
  );
};

export default PageHero;
