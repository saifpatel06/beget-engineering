import Seo from "../src/components/Seo";
import Layout from "../src/components/Layout";
import HeroSection from "../src/components/HeroSection";
import TrustStats from "../src/components/TrustStats";
import AboutSection from "../src/components/AboutSection";
import ServicesSection from "../src/components/ServicesSection";
import ProjectsSection from "../src/components/ProjectsSection";
import VideoSection from "../src/components/VideoSection";
import WhyChooseUs from "../src/components/WhyChooseUs";
import ProcessSection from "../src/components/ProcessSection";
import CTASection from "../src/components/CTASection";
import { getServices, getFeaturedProjects, getFeaturedVideos } from "../src/lib/api";

// Layout renders <Header /> + <main> + <Footer />; this page only composes sections.
const Home = ({ services, projects, videos }) => {
  return (
    <>
      <Seo
        description="Beget Engineering: engineering, manufacturing and turnkey contracting for industrial and civil projects, established in 1999."
        path="/"
      />
      <Layout services={services}>
        <HeroSection />
        <TrustStats />
        <AboutSection />
        <ServicesSection services={services} />
        <ProjectsSection projects={projects} />
        <VideoSection videos={videos} />
        <WhyChooseUs />
        <ProcessSection />
        <CTASection />
      </Layout>
    </>
  );
};

export const getStaticProps = async () => {
  const [services, projects, videos] = await Promise.all([
    getServices(),
    getFeaturedProjects(5),
    getFeaturedVideos(6),
  ]);

  return { props: { services, projects, videos }, revalidate: 60 };
};

export default Home;
