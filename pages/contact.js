import Seo from "../src/components/Seo";
import { banners } from "../data/images";
import Layout from "../src/components/Layout";
import PageHero from "../src/components/PageHero";
import ContactSection from "../src/components/ContactSection";
import { getServices } from "../src/lib/api";

const Contact = ({ services }) => {
  return (
    <>
      <Seo
        title="Contact Us"
        description="Contact Beget Engineering to discuss your industrial, fabrication, automation or civil construction requirement."
        image={banners.contact.src}
        path="/contact"
      />
      <Layout services={services}>
        <PageHero
          title="Contact us"
          description="Discuss your requirement with our engineering team."
          image={banners.contact.src}
          imageAlt={banners.contact.alt}
          breadcrumb={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        />
        <ContactSection services={services} />
      </Layout>
    </>
  );
};

export const getStaticProps = async () => {
  return { props: { services: await getServices() }, revalidate: 60 };
};

export default Contact;
