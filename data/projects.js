import { clientPhotos } from "./images";

// Static project showcase data (placeholder titles/descriptions to replace with
// real project details). `serviceSlug` links a project to a service, so its
// category label is taken from that service (see src/lib/api.js) and its image
// is a real client photo for that service, picked by `photoIndex`.
const photoFor = (slug, photoIndex = 0) => {
  const photos = clientPhotos[slug] || [];
  return photos[photoIndex % Math.max(photos.length, 1)]?.src;
};

const projects = [
  { id: 1, serviceSlug: "industrial-sheds", featured: true, title: "Steel-framed factory shed", description: "Wide-span industrial shed with roofing and cladding, delivered turnkey.", image: photoFor("industrial-sheds", 0) },
  { id: 2, serviceSlug: "control-panels", featured: false, title: "Control panel package", description: "Panels built, wired and tested for a new plant.", image: photoFor("control-panels", 0) },
  { id: 3, serviceSlug: "civil-construction", featured: true, title: "Reinforced deck slab", description: "Foundations and slab work for a production facility.", image: photoFor("civil-construction", 0) },
  { id: 4, serviceSlug: "jumbo-gates", featured: true, title: "Automated jumbo gate", description: "Heavy-duty entrance gate for a large industrial yard.", image: photoFor("jumbo-gates", 0) },
  { id: 5, serviceSlug: "structural-fabrication", featured: true, title: "Structural steel fabrication", description: "Fabricated steel structures erected on site.", image: photoFor("structural-fabrication", 0) },
  { id: 6, serviceSlug: "crane-works", featured: false, title: "Overhead crane installation", description: "Supporting steelwork and installation for overhead lifting.", image: photoFor("crane-works", 0) },
  { id: 7, serviceSlug: "puf-panels", featured: true, title: "Insulated panel building", description: "PUF panel walls and roofing for a controlled-temperature space.", image: photoFor("puf-panels", 0) },
  { id: 8, serviceSlug: "storage-systems", featured: true, title: "Custom storage and racking", description: "Storage units planned around material flow.", image: photoFor("storage-systems", 0) },
  { id: 9, serviceSlug: "sewage-treatment-plants", featured: false, title: "Sewage treatment plant", description: "Prefabricated treatment enclosure delivered and installed on site.", image: photoFor("sewage-treatment-plants", 0) },
  { id: 10, serviceSlug: "miscellaneous-works", featured: false, title: "Canopy and support works", description: "Canopy structure and supporting site works.", image: photoFor("miscellaneous-works", 0) },
  { id: 11, serviceSlug: "industrial-sheds", featured: false, title: "Warehouse shed extension", description: "Extension of an existing shed with matching structure.", image: photoFor("industrial-sheds", 2) },
  { id: 12, serviceSlug: "structural-fabrication", featured: false, title: "Site fabrication works", description: "Structural components fabricated and erected on site.", image: photoFor("structural-fabrication", 2) },
];

export default projects;
