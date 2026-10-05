import Image from "next/image";
import Link from "next/link";
import Icon from "./Icons";
import styles from "./ServiceCard.module.css";

// One service card. Data arrives through the `service` prop (static file now, API later).
// The "View Service" link is stretched over the whole card, so there is one tab stop per card.
const ServiceCard = ({ service, priority = false }) => {
  return (
    <article className={styles.card}>
      <div className={styles.imageWrap}>
        <Image
          src={service.heroImage}
          alt={service.heroImageAlt || `${service.name} work by Beget Engineering`}
          fill
          priority={priority}
          sizes="(min-width: 1200px) 33vw, (min-width: 768px) 50vw, 100vw"
          className={styles.image}
        />
      </div>
      <div className={styles.body}>
        <h3 className={styles.title}>{service.name}</h3>
        <p className={styles.text}>{service.shortDescription}</p>
        <Link href={`/services/${service.slug}`} className={styles.link}>
          View Service
          <span className="visually-hidden">: {service.name}</span>
          <Icon name="arrowRight" size={20} />
        </Link>
      </div>
    </article>
  );
};

export default ServiceCard;
