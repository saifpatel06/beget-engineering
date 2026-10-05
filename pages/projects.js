import Seo from "../src/components/Seo";
import { banners } from "../data/images";
import Layout from "../src/components/Layout";
import PageHero from "../src/components/PageHero";
import ProjectsFilter from "../src/components/ProjectsFilter";
import CTASection from "../src/components/CTASection";
import { getServices, getProjects } from "../src/lib/api";

const Projects = ({ services, projects }) => {
  return (
    <>
      <Seo
        title="Projects"
        description="Selected engineering, fabrication, automation and civil construction projects delivered by Beget Engineering."
        image={banners.projects.src}
        path="/projects"
      />
      <Layout services={services}>
        <PageHero
          title="Our work"
          description="Filter our projects by service to see what we build."
          image={banners.projects.src}
          imageAlt={banners.projects.alt}
          breadcrumb={[{ label: "Home", href: "/" }, { label: "Projects" }]}
        />
        <ProjectsFilter projects={projects} services={services} />
        <CTASection />
      </Layout>
    </>
  );
};

export const getStaticProps = async () => {
  const [services, projects] = await Promise.all([getServices(), getProjects()]);
  return { props: { services, projects }, revalidate: 60 };
};

export default Projects;
