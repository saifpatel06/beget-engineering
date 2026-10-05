import Image from "next/image";
import Link from "next/link";
import Icon from "./Icons";
import site from "../../data/site";
import { banners } from "../../data/images";
import styles from "./HeroSection.module.css";

// Home hero. Pass `videoSrc` (mp4) later to use a background video instead of the image.
const HeroSection = ({
  image = banners.home.src,
  videoSrc = "",
  imageAlt = banners.home.alt,
}) => {
  return (
    <section className={`${styles.hero} dark`} aria-labelledby="hero-title">
      <div className={styles.media}>
        {videoSrc ? (
          <video
            className={styles.video}
            src={videoSrc}
            poster={image}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
          />
        ) : (
          <Image src={image} alt={imageAlt} fill priority sizes="100vw" className={styles.image} />
        )}
      </div>
      <div className={styles.overlay} aria-hidden="true" />

      <div className={`wrap ${styles.content}`}>
        <h1 id="hero-title" className={styles.title}>
          <span className={styles.line}>
            <span>WE TAKE UP </span>
          </span>
          <span className={styles.line}>
            <span>WHERE OTHERS GIVE UP.</span>
          </span>
        </h1>
        <p className={styles.text}>
          Delivering innovative engineering fabrication, industrial, construction and maintenance solutions with uncompromising quality, safety and reliability.
        </p>
        <div className={styles.actions}>
          <Link href="/#services" className="bt bt-primary">
            Explore Our Services
            <Icon name="arrowRight" size={20} />
          </Link>
          <Link href="/request-quote" className="bt bt-outline">
            Request a Quote
          </Link>
        </div>
        <p className={styles.est}>Established in {site.established}</p>
      </div>
    </section>
  );
};

export default HeroSection;
