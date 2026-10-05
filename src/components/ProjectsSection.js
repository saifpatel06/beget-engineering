import Link from "next/link";
import Icon from "./Icons";
import SectionHeading from "./SectionHeading";
import ProjectCard from "./ProjectCard";
import styles from "./ProjectsSection.module.css";

// Featured projects mosaic for the home page: 1 large card + smaller cards.
const ProjectsSection = ({
  projects = [],
  title = "Featured projects",
  intro = "A selection of work delivered across our engineering, fabrication and construction services.",
}) => {
  const [lead, ...rest] = projects;

  return (
    <section id="projects" className="section" aria-labelledby="projects-title">
      <div className="wrap">
        <SectionHeading id="projects-title" title={title} intro={intro} />

        {lead && (
          <div className={styles.mosaic}>
            <div className={styles.lead}>
              <ProjectCard project={lead} large />
            </div>
            {rest.map((project) => (
              <div key={project.id} className={styles.item}>
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        )}

        <div className={styles.footer}>
          <Link href="/projects" className="bt bt-dark">
            View Our Work
            <Icon name="arrowRight" size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
