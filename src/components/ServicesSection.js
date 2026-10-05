import Link from "next/link";
import Icon from "./Icons";
import SectionHeading from "./SectionHeading";
import ServiceCard from "./ServiceCard";
import styles from "./ServicesSection.module.css";

// Grid of ServiceCards (3 / 2 / 1 columns). Reused on the home page and for related services.
// `services` comes in as a prop, so it works with static data or API data alike.
const ServicesSection = ({
  services = [],
  id = "services",
  title = "Our engineering services",
  intro = "One accountable team across engineering, fabrication, automation and civil work. Choose a service to see our work and capabilities.",
  showEnquiryCard = true,
  paper = true,
}) => {
  return (
    <section id={id} className={`section ${paper ? "section-paper" : ""}`} aria-labelledby={`${id}-title`}>
      <div className="wrap">
        <SectionHeading id={`${id}-title`} title={title} intro={intro} />
        <div className="row g-4">
          {services.map((service, index) => (
            <div key={service.slug} className="col-12 col-md-6 col-xl-4">
              <ServiceCard service={service} priority={index < 3} />
            </div>
          ))}
          {showEnquiryCard && (
            <div className="col-12 col-md-6 col-xl-4">
              <div className={styles.enquiry}>
                <h3>Not sure which service you need?</h3>
                <p>Describe your requirement and our team will recommend the right approach.</p>
                <Link href="/request-quote" className="bt bt-primary">
                  Request a Quote
                  <Icon name="arrowRight" size={20} />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
