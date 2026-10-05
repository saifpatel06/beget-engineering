import Image from "next/image";
import Link from "next/link";
import styles from "./ProjectCard.module.css";

// project: { title, description, image, category, serviceSlug }
const ProjectCard = ({ project, large = false, priority = false }) => {
  return (
    <article className={`${styles.card} ${large ? styles.large : ""}`}>
      <Image
        src={project.image}
        alt={`${project.title}: ${project.category} project by Beget Engineering`}
        fill
        priority={priority}
        sizes={large ? "(min-width: 992px) 50vw, 100vw" : "(min-width: 992px) 25vw, (min-width: 576px) 50vw, 100vw"}
        className={styles.image}
      />
      <div className={styles.caption}>
        <Link href={`/services/${project.serviceSlug}`} className={styles.category}>
          {project.category}
        </Link>
        <h3 className={styles.title}>{project.title}</h3>
        <p className={styles.text}>{project.description}</p>
      </div>
    </article>
  );
};

export default ProjectCard;
