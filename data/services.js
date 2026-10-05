// Static service data.
// Later this file is replaced by the CodeIgniter API (see src/lib/api.js). The
// shape below is what the API should return, so no component needs to change.
//
// Fields the CMS can control:
//   enabled  -> show / hide a service
//   order    -> ordering of services
//   images   -> gallery [{ src, alt }] (array order = display order)
//   videos   -> [{ title, src, poster }]

import { clientPhotos } from "./images";

// Video thumbnails reuse gallery photos until real videos are uploaded.
const buildVideos = (slug, images, count = 5) =>
  Array.from({ length: count }, (_, i) => ({
    title: `Project video ${i + 1}`,
    src: `/videos/services/${slug}/${i + 1}.mp4`,
    poster: images[i % images.length].src,
  }));

const definitions = [
  {
    name: "Automation",
    slug: "automation",
    shortDescription:
      "Control systems that make industrial processes faster, safer and more consistent.",
    description:
      "We design and install automation systems that reduce manual effort and keep production running consistently. From single-machine control to plant-wide integration, our engineers handle programming, wiring, testing and commissioning.\n\nEvery system is built around how your plant actually works, with clear documentation so your team can operate and maintain it with confidence.",
    capabilities: [
      "PLC and SCADA based control systems",
      "Motor and drive control",
      "Sensor and instrumentation integration",
      "Process and machine automation",
      "Upgrade of existing control systems",
      "Testing, commissioning and handover",
    ],
  },
  {
    name: "Control Panels",
    slug: "control-panels",
    shortDescription:
      "Custom-built electrical and control panels, wired, tested and ready to install.",
    description:
      "Our control panels are designed and assembled to suit your equipment, power requirements and site conditions. Each panel is wired neatly, labelled clearly and tested before it leaves our workshop.\n\nWhether you need a single panel or a complete set for a new plant, we deliver reliable panels that are easy to operate and simple to service.",
    capabilities: [
      "PLC and automation control panels",
      "Motor control centre (MCC) panels",
      "Power distribution panels",
      "VFD and starter panels",
      "Custom enclosures and control desks",
      "Wiring, labelling and pre-dispatch testing",
    ],
  },
  {
    name: "Miscellaneous Works",
    slug: "miscellaneous-works",
    shortDescription:
      "Supporting engineering, repair and site works that keep your facility running.",
    description:
      "Not every requirement fits a single category. Our miscellaneous works team handles the repairs, modifications and supporting jobs that industrial facilities need throughout the year.\n\nBecause we work across fabrication, electrical and civil disciplines, we can take on mixed-scope jobs without you coordinating several contractors.",
    capabilities: [
      "Maintenance and repair works",
      "Custom fabrication jobs",
      "Plant modifications and extensions",
      "Equipment installation support",
      "Small-scale civil and finishing works",
      "On-site support for shutdown jobs",
    ],
  },
  {
    name: "Civil Construction",
    slug: "civil-construction",
    shortDescription:
      "Industrial and commercial civil works, from foundations to finished structures.",
    description:
      "We carry out civil construction for factories, warehouses and industrial facilities, working closely with our fabrication and electrical teams so every trade fits together on site.\n\nAs a single-window provider, we plan, build and hand over the complete civil scope on schedule, with quality and safety checked throughout.",
    capabilities: [
      "Foundations and RCC works",
      "Industrial buildings and workshops",
      "Industrial flooring",
      "Boundary walls, roads and drainage",
      "Equipment foundations and plinths",
      "Complete turnkey civil packages",
    ],
  },
  {
    name: "Jumbo Gates",
    slug: "jumbo-gates",
    shortDescription:
      "Heavy-duty gates for factories, yards and large industrial entrances.",
    description:
      "Large industrial entrances need gates that are strong, stable and easy to operate every day. We fabricate jumbo gates to suit your opening size, traffic and site layout.\n\nEach gate is built with a rigid structural frame and finished for long outdoor life, and can be supplied with manual or motorised operation.",
    capabilities: [
      "Sliding and swing gates",
      "Custom sizes for wide openings",
      "Rigid structural steel frames",
      "Manual or motorised operation",
      "Protective coating and finishing",
      "Installation and on-site alignment",
    ],
  },
  {
    name: "Industrial Sheds",
    slug: "industrial-sheds",
    shortDescription:
      "Strong, durable and customised industrial shed solutions for every scale.",
    description:
      "We design, fabricate and erect steel-framed industrial sheds for manufacturing, storage and workshop use. Span, height, crane provision and ventilation are planned around your operation.\n\nOur turnkey approach covers foundations, structure, roofing and cladding, so one team is responsible from start to finish.",
    capabilities: [
      "Factory, workshop and warehouse sheds",
      "Structural steel framing",
      "Roofing and wall cladding",
      "Custom spans and heights",
      "Mezzanine floors and platforms",
      "Turnkey civil and structural delivery",
    ],
  },
  {
    name: "Structural Fabrication",
    slug: "structural-fabrication",
    shortDescription:
      "Precision-fabricated steel structures for industrial and infrastructure projects.",
    description:
      "Our workshop fabricates structural steel to your drawings or to our own engineered designs. Cutting, fitting, welding and finishing are carried out under close supervision to keep dimensions accurate and joints sound.\n\nFabricated members are delivered and erected on site by our own teams, which keeps quality and schedule under one roof.",
    capabilities: [
      "Columns, beams and trusses",
      "Platforms, staircases and walkways",
      "Pipe racks and equipment supports",
      "Welding and fit-up inspection",
      "Surface preparation and painting",
      "Site erection and alignment",
    ],
  },
  {
    name: "PUF Panels",
    slug: "puf-panels",
    shortDescription:
      "Insulated PUF panel solutions for roofs, walls and temperature-controlled spaces.",
    description:
      "Polyurethane foam (PUF) panels give fast, clean and well-insulated enclosures. We supply and install panel systems for roofs, walls, partitions and temperature-controlled rooms.\n\nPanels are cut to size for your project, keeping on-site work quick and tidy.",
    capabilities: [
      "Insulated wall and roof panels",
      "Cold rooms and controlled enclosures",
      "Partitions and false ceilings",
      "Panel doors and fittings",
      "Custom sizes and finishes",
      "Supply and installation",
    ],
  },
  {
    name: "Storage Systems",
    slug: "storage-systems",
    shortDescription:
      "Heavy-duty racking and storage structures that organise space and protect stock.",
    description:
      "Good storage saves floor area, time and handling effort. We design and build storage systems around your material, load and layout, from racking to raised storage platforms.\n\nSystems are fabricated to be sturdy and safe, and can be extended as your storage needs grow.",
    capabilities: [
      "Heavy-duty racking",
      "Mezzanine floors and storage platforms",
      "Custom shelving and bins",
      "Layouts planned around your material flow",
      "Load-rated fabrication",
      "Installation and future expansion",
    ],
  },
  {
    name: "Sewage Treatment Plants",
    slug: "sewage-treatment-plants",
    shortDescription:
      "Civil, mechanical and electrical works for reliable sewage treatment plants.",
    description:
      "We build sewage treatment plants that combine civil tanks, mechanical equipment, piping and electrical control in a single turnkey package.\n\nOur multi-disciplinary team coordinates every part of the plant, so installation, testing and commissioning stay on schedule.",
    capabilities: [
      "Civil tanks and structures",
      "Mechanical equipment installation",
      "Process piping and fittings",
      "Electrical and control panels",
      "Testing and commissioning",
      "Turnkey plant delivery",
    ],
  },
  {
    name: "Crane Works",
    slug: "crane-works",
    shortDescription:
      "Crane structures, installation and support works for safe, efficient lifting.",
    description:
      "Lifting equipment depends on strong supporting structures and accurate installation. We fabricate and install crane girders, runway beams and supporting steelwork, and carry out crane-related site works.\n\nOur teams follow safe lifting practices and coordinate closely with your operations to reduce downtime.",
    capabilities: [
      "Crane girders and runway beams",
      "Gantry and overhead crane installation",
      "Supporting columns and brackets",
      "Alignment and rail fitting",
      "Repairs and modifications",
      "Site works with safe lifting practices",
    ],
  },
];

const services = definitions.map((service, index) => {
  const images = clientPhotos[service.slug] || [];
  return {
    id: index + 1,
    order: index + 1,
    enabled: true,
    ...service,
    heroImage: images[0]?.src,
    heroImageAlt: images[0]?.alt || `${service.name} project by Beget Engineering`,
    images, // [{ src, alt }] — real client photos, see data/images.js
    videos: buildVideos(service.slug, images.length ? images : [{ src: "" }]),
  };
});

export default services;
