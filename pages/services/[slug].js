import Seo from "../../src/components/Seo";
import Layout from "../../src/components/Layout";
import PageHero from "../../src/components/PageHero";
import Link from "next/link";
import ServiceOverview from "../../src/components/ServiceOverview";
import SectionHeading from "../../src/components/SectionHeading";
import ImageGallery from "../../src/components/ImageGallery";
import VideoGallery from "../../src/components/VideoGallery";
import WhyChooseUs from "../../src/components/WhyChooseUs";
import ServicesSection from "../../src/components/ServicesSection";
import CTASection from "../../src/components/CTASection";
import site from "../../data/site";
import { getServices, getServiceBySlug } from "../../src/lib/api";

// ONE template renders every service: /services/automation, /services/industrial-sheds, ...
const ServiceDetail = ({ service, services, related }) => {
  return (
    <>
      <Seo
        title={service.name}
        description={service.shortDescription}
        image={service.heroImage}
        path={`/services/${service.slug}`}
      />
      <Layout services={services}>
        <PageHero
          tall
          title={service.name}
          description={service.shortDescription}
          image={service.heroImage}
          imageAlt={`${service.name} project by Beget Engineering`}
          breadcrumb={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/#services" },
            { label: service.name },
          ]}
          actions={
            <>
              <Link href={`/request-quote?service=${service.slug}`} className="bt bt-primary">
                Request a Quote
              </Link>
              <a href="#gallery" className="bt bt-outline">
                See Our Work
              </a>
            </>
          }
        />

        <ServiceOverview service={service} />

        <section id="gallery" className="section section-paper" aria-labelledby="gallery-title">
          <div className="wrap">
            <SectionHeading
              id="gallery-title"
              title={`${service.name}: our work`}
              intro="Select any photo to view it full size."
            />
            <ImageGallery images={service.images} serviceName={service.name} />
          </div>
        </section>

        <section id="videos" className="section" aria-labelledby="videos-title">
          <div className="wrap">
            <SectionHeading
              id="videos-title"
              title={`${service.name} project videos`}
              intro="Videos load only when you press play."
            />
            <VideoGallery videos={service.videos} />
          </div>
        </section>

        <WhyChooseUs
          id="why-this-service"
          title={`Why choose Beget for ${service.name}`}
          intro={`One accountable team for ${service.name.toLowerCase()}, backed by experience since ${site.established}.`}
          items={site.whyBeget.slice(0, 3)}
        />

        <ServicesSection
          id="related-services"
          title="Related services"
          intro="Other services our team can deliver alongside this work."
          services={related}
          showEnquiryCard={false}
          paper={false}
        />

        <CTASection
          title={`Need ${service.name.toLowerCase()} for your project?`}
          text="Tell us about your requirement and we will come back with the right approach."
        />
      </Layout>
    </>
  );
};

export const getStaticPaths = async () => {
  const services = await getServices();
  return {
    paths: services.map((service) => ({ params: { slug: service.slug } })),
    // New services added in the CMS are generated on first request
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params }) => {
  const [service, services] = await Promise.all([getServiceBySlug(params.slug), getServices()]);

  if (!service) return { notFound: true, revalidate: 60 };

  // Three related services: the ones that follow this one in the list (wrapping around)
  const index = services.findIndex((item) => item.slug === service.slug);
  const related = [1, 2, 3]
    .map((offset) => services[(index + offset) % services.length])
    .filter((item) => item && item.slug !== service.slug);

  return { props: { service, services, related }, revalidate: 60 };
};

export default ServiceDetail;
