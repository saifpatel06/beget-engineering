
import { useRouter } from "next/router";
import Seo from "../src/components/Seo";
import { banners } from "../data/images";
import Layout from "../src/components/Layout";
import PageHero from "../src/components/PageHero";
import EnquiryForm from "../src/components/EnquiryForm";
import SectionHeading from "../src/components/SectionHeading";
import Icon from "../src/components/Icons";
import { getServices } from "../src/lib/api";
import styles from "../src/components/ContactSection.module.css";

const expectations = [
  "Tell us what you need built, fabricated or installed.",
  "Our engineers review your requirement and may ask follow-up questions.",
  "You receive a clear proposal for your project.",
];

const RequestQuote = ({ services }) => {
  const router = useRouter();

  // /request-quote?service=industrial-sheds pre-selects the service
  const preselected =
    router.isReady && typeof router.query.service === "string"
      ? router.query.service
      : "";

  const quoteFields = [
    {
      name: "name",
      label: "Name",
      type: "text",
      required: true,
      autoComplete: "name",
      half: true,
    },
    {
      name: "company",
      label: "Company",
      type: "text",
      autoComplete: "organization",
      half: true,
    },
    {
      name: "phone",
      label: "Phone",
      type: "tel",
      required: true,
      autoComplete: "tel",
      half: true,
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      required: true,
      autoComplete: "email",
      half: true,
    },
    {
      name: "service",
      label: "Service required",
      type: "select",
      required: true,
      half: true,
      options: services.map((service) => ({
        value: service.slug,
        label: service.name,
      })),
    },
    {
      name: "location",
      label: "Project location",
      type: "text",
      half: true,
      placeholder: "City or site",
    },
    {
      name: "details",
      label: "Project details",
      type: "textarea",
      required: true,
      rows: 6,
      placeholder:
        "Size, scope, timeline or anything else that helps us quote accurately.",
    },
    {
      name: "attachment",
      label: "Attachment",
      type: "file",
      hint: "Drawings or specifications. PDF, Word, Excel, JPG, PNG or DWG, up to 5 MB.",
    },
  ];

  return (
    <>
      <Seo
        title="Request a Quote"
        description="Request a quote from Beget Engineering for industrial, fabrication, automation or civil construction projects."
        image={banners.quote.src}
        path="/request-quote"
      />

      <Layout services={services}>
        <PageHero
          title="Request a quote"
          description="Share your project details and our team will respond with a proposal."
          image={banners.quote.src}
          imageAlt={banners.quote.alt}
          breadcrumb={[
            { label: "Home", href: "/" },
            { label: "Request a Quote" },
          ]}
        />

        <section className="section" aria-labelledby="quote-title">
          <div className="wrap">
            <div className="row g-5">
              <div className="col-12 col-lg-4">
                <SectionHeading
                  id="quote-title"
                  title="What happens next"
                />

                <ol className={styles.details}>
                  {expectations.map((text, index) => (
                    <li key={text}>
                      <span className={styles.icon}>
                        <Icon name="check" size={22} />
                      </span>
                      <div>
                        <h3 className={styles.label}>
                          Step {index + 1}
                        </h3>
                        <p>{text}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="col-12 col-lg-8">
                <div className={styles.formCard}>
                  <h2 className={styles.formTitle}>
                    Project enquiry
                  </h2>

                  <EnquiryForm
                    key={`${router.isReady}-${preselected}`}
                    fields={quoteFields}
                    initialValues={{ service: preselected }}
                    submissionMethod="email"
                    submitLabel="Request a quote"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export const getStaticProps = async () => {
  return {
    props: {
      services: await getServices(),
    },
    revalidate: 60,
  };
};

export default RequestQuote;
