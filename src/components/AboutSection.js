import Image from "next/image";
import Link from "next/link";
import Icon from "./Icons";
import SectionHeading from "./SectionHeading";
import site from "../../data/site";
import { banners } from "../../data/images";
import styles from "./AboutSection.module.css";

// Company introduction (home + about page). Set showCta={false} on the about page.
const AboutSection = ({
  title = "Engineering, manufacturing and construction under one roof",
  image = banners.workshop.src,
  imageAlt = banners.workshop.alt,
  showCta = true,
  id = "about",
}) => {
  return (
    <section id={id} className="section" aria-labelledby={`${id}-title`}>
      <div className="wrap">
        <div className="row g-5 align-items-center">
          <div className="col-12 col-lg-6">
            <div className={styles.media}>
              <Image
                src={image}
                alt={imageAlt}
                width={1200}
                height={900}
                sizes="(min-width: 992px) 50vw, 100vw"
                className={styles.image}
              />
              <div className={styles.plate}>
                <span className={styles.year}>{site.established}</span>
                <span className={styles.yearLabel}>Established</span>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-6">
            <SectionHeading id={`${id}-title`} title={title} />
            <div className={styles.body}>
              <p>
                Beget Engineering was established in {site.established}. We provide engineering,
                manufacturing and contracting services for large and medium-sized enterprises,
                working as a single-window provider for industrial and civil construction
                requirements.
              </p>
              <p>
                Our capabilities span electrical, fabrication, structural fabrication, automation
                and civil construction, delivered with a focus on quality, safety, operational
                efficiency and sustainable growth.
              </p>
            </div>

            <ul className={styles.points}>
              {site.aboutPoints.map((point) => (
                <li key={point}>
                  <Icon name="check" size={22} />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            {showCta && (
              <Link href="/about" className="bt bt-dark">
                Learn More About Us
                <Icon name="arrowRight" size={20} />
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
