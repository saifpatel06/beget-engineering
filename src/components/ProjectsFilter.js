import { useState } from "react";
import ProjectCard from "./ProjectCard";
import styles from "./ProjectsFilter.module.css";

// Portfolio grid with category filter buttons (static data now, API data later).
// `services` gives the category list and order; `projects` are filtered by category name.
const ProjectsFilter = ({ projects = [], services = [] }) => {
  const [active, setActive] = useState("All");

  // Only show categories that actually have projects
  const categories = ["All", ...services.map((s) => s.name).filter((name) => projects.some((p) => p.category === name))];
  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <section className="section" aria-labelledby="portfolio-title">
      <div className="wrap">
        <h2 id="portfolio-title" className="visually-hidden">
          Project portfolio
        </h2>

        <div className={styles.filters} role="group" aria-label="Filter projects by service">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={`${styles.filter} ${active === category ? styles.selected : ""}`}
              aria-pressed={active === category}
              onClick={() => setActive(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <p className={styles.count} role="status" aria-live="polite">
          Showing {filtered.length} {filtered.length === 1 ? "project" : "projects"}
          {active !== "All" ? ` in ${active}` : ""}
        </p>

        {filtered.length > 0 ? (
          <div className="row g-4">
            {filtered.map((project) => (
              <div key={project.id} className="col-12 col-sm-6 col-xl-4">
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        ) : (
          <p className={styles.empty}>No projects in this category yet. Try another service.</p>
        )}
      </div>
    </section>
  );
};

export default ProjectsFilter;
