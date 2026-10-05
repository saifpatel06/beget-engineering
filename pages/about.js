import Seo from "../src/components/Seo";
import { banners } from "../data/images";
import Layout from "../src/components/Layout";
import PageHero from "../src/components/PageHero";
import AboutSection from "../src/components/AboutSection";
import InfoPanels from "../src/components/InfoPanels";
import ProcessSection from "../src/components/ProcessSection";
import CTASection from "../src/components/CTASection";
import site from "../data/site";
import { getServices } from "../src/lib/api";

const About = ({ services }) => {
  const capabilities = site.capabilityGroups.map((group) => ({
    icon: group.icon,
    title: group.title,
    text: group.text,
    links: group.slugs
      .map((slug) => services.find((service) => service.slug === slug))
      .filter(Boolean)
      .map((service) => ({ label: service.name, href: `/services/${service.slug}` })),
  }));

  return (
    <>
      <Seo
        title="About Us"
        description="Established in 1999, Beget Engineering is a single-window provider of engineering, manufacturing and contracting services for industrial and civil construction."
        image={banners.about.src}
        path="/about"
      />
      <Layout services={services}>
        <PageHero
          title="About Beget Engineering"
          description="Engineering, manufacturing and contracting for large and medium-sized enterprises, since 1999."
          image={banners.about.src}
          imageAlt={banners.about.alt}
          breadcrumb={[{ label: "Home", href: "/" }, { label: "About Us" }]}
        />

        <AboutSection
          id="company"
          title="A single-window provider for industrial and civil construction"
          showCta={false}
        />

        <InfoPanels
          id="vision-mission"
          title="Vision and mission"
          items={site.visionMission}
          columns={2}
          paper
        />

        <InfoPanels
          id="quality-safety"
          title="Quality and safety"
          intro="Our focus on quality, safety and operational efficiency shows in how we plan, build and hand over every project."
          items={site.qualitySafety}
          columns={3}
        />

        <InfoPanels
          id="capabilities"
          title="Engineering capabilities"
          intro="Electrical, fabrication, structural fabrication, automation and civil construction, delivered by one team."
          items={capabilities}
          columns={4}
          paper
        />

        <ProcessSection
          id="turnkey"
          title="Turnkey execution"
          intro="We manage the whole project, so you deal with one accountable team from consultation to handover."
        />

        <InfoPanels
          id="sectors"
          title="Industries we serve"
          intro="Our services support enterprises that build, store, process and move things at scale."
          items={site.sectors}
          columns={3}
        />

        <CTASection />
      </Layout>
    </>
  );
};

export const getStaticProps = async () => {
  return { props: { services: await getServices() }, revalidate: 60 };
};

export default About;
