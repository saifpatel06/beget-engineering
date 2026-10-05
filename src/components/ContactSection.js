import Icon from "./Icons";
import EnquiryForm from "./EnquiryForm";
import SectionHeading from "./SectionHeading";
import site from "../../data/site";
import styles from "./ContactSection.module.css";

const contactFields = (services) => [
  { name: "name", label: "Name", type: "text", required: true, autoComplete: "name", half: true },
  { name: "company", label: "Company", type: "text", autoComplete: "organization", half: true },
  { name: "phone", label: "Phone", type: "tel", required: true, autoComplete: "tel", half: true },
  { name: "email", label: "Email", type: "email", required: true, autoComplete: "email", half: true },
  {
    name: "service",
    label: "Service",
    type: "select",
    options: services.map((service) => ({ value: service.name, label: service.name })),
  },
  {
    name: "message",
    label: "Message",
    type: "textarea",
    required: true,
    rows: 6,
    placeholder: "Tell us what you need and where.",
  },
];

// Contact details, map placeholder and contact form.
const ContactSection = ({ services = [] }) => {
  const { contact } = site;

  return (
    <section className="section" aria-labelledby="contact-title">
      <div className="wrap">
        <div className="row g-5">
          <div className="col-12 col-lg-5">
            <SectionHeading
              id="contact-title"
              title="Talk to our team"
              intro="Tell us about your requirement. We usually reply with next steps within one working day."
            />

            <ul className={styles.details}>
              <li>
                <span className={styles.icon}>
                  <Icon name="pin" size={22} />
                </span>
                <div>
                  <h3 className={styles.label}>Address</h3>
                  <address className={styles.address}>
                    {contact.address.map((line) => (
                      <span key={line}>{line}</span>
                    ))}
                  </address>
                </div>
              </li>
              <li>
                <span className={styles.icon}>
                  <Icon name="phone" size={22} />
                </span>
                <div>
                  <h3 className={styles.label}>Phone</h3>
                  <a href={`tel:${contact.phone.replace(/\s/g, "")}`}>{contact.phone}</a>
                </div>
              </li>
              <li>
                <span className={styles.icon}>
                  <Icon name="mail" size={22} />
                </span>
                <div>
                  <h3 className={styles.label}>Email</h3>
                  <a href={`mailto:${contact.email}`}>{contact.email}</a>
                </div>
              </li>
              <li>
                <span className={styles.icon}>
                  <Icon name="clock" size={22} />
                </span>
                <div>
                  <h3 className={styles.label}>Working hours</h3>
                  <p>{contact.hours}</p>
                </div>
              </li>
            </ul>

            <div className={styles.map}>
              <iframe
                title={`${site.name} location on Google Maps`}
                src={contact.mapEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
            <a
              href={contact.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mapLink}
            >
              Get directions
              <Icon name="arrowRight" size={18} />
            </a>
          </div>

          <div className="col-12 col-lg-7">
            <div className={styles.formCard}>
              <h2 className={styles.formTitle}>Send us a message</h2>
              <EnquiryForm
                fields={contactFields(services)}
                submitLabel="Send message"
                successTitle="Thank you. Your message has been received."
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
