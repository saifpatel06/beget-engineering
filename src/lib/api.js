// Single "seam" between the UI and the data source.
//
// TODAY:  data comes from the static files in /data.
// LATER:  swap the bodies below for fetch() calls to the CodeIgniter REST API
//         (MySQL/CMS behind it). Pages and components stay unchanged because
//         they only ever call these functions and receive plain props.

import services from "../../data/services";
import projects from "../../data/projects";

// const API_BASE = process.env.API_BASE_URL; // e.g. https://api.your-domain.com

const byOrder = (a, b) => a.order - b.order;

// GET /services  (only enabled services, in CMS order)
export const getServices = async () => {
  // const res = await fetch(`${API_BASE}/services`);
  // return res.json();
  return services.filter((service) => service.enabled).sort(byOrder);
};

// GET /services/:slug
export const getServiceBySlug = async (slug) => {
  // const res = await fetch(`${API_BASE}/services/${slug}`);
  // if (!res.ok) return null;
  // return res.json();
  const all = await getServices();
  return all.find((service) => service.slug === slug) || null;
};

// GET /projects  (each project gets its category name from its service)
export const getProjects = async () => {
  const all = await getServices();
  const nameBySlug = Object.fromEntries(all.map((s) => [s.slug, s.name]));

  return projects
    .filter((project) => nameBySlug[project.serviceSlug])
    .map((project) => ({ ...project, category: nameBySlug[project.serviceSlug] }));
};

export const getFeaturedProjects = async (limit = 6) => {
  const all = await getProjects();
  return all.filter((project) => project.featured).slice(0, limit);
};

// One video per service for the homepage showcase
export const getFeaturedVideos = async (limit = 6) => {
  const all = await getServices();
  return all
    .filter((service) => service.videos && service.videos.length > 0)
    .slice(0, limit)
    .map((service) => ({
      ...service.videos[0],
      serviceName: service.name,
      serviceSlug: service.slug,
    }));
};

// POST /enquiries  (contact and quote forms send FormData, so attachments work)
export const submitEnquiry = async (formData) => {
  // const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/enquiries`, {
  //   method: "POST",
  //   body: formData,
  // });
  // if (!res.ok) throw new Error("Enquiry failed");
  // return res.json();
  await new Promise((resolve) => setTimeout(resolve, 900));
  return { ok: true };
};
