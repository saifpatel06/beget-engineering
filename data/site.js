// Company-wide content. Replace the [placeholders] with real details.
// Later this can also come from the CMS (e.g. GET /api/settings).

const site = {
  name: "Beget Engineering",
  established: 1999,
  tagline: "WE TAKE UP WHERE OTHERS GIVE UP",
  description:
    "Engineering, manufacturing and contracting services for large and medium-sized enterprises, from electrical and automation to structural fabrication and civil construction.",
  contact: {
    address: ["152/2, Shanker Math,", "Pune - Solapur Rd, Hadapsar,", "Pune, Maharashtra 411013"],
    street: "152/2, Shanker Math, Pune - Solapur Rd, Hadapsar",
    city: "Pune",
    region: "Maharashtra",
    postalCode: "411013",
    country: "IN",
    phone: "+91 97655 51959",
    email: "info@begetengineering.com", // placeholder: replace with the real company email
    hours: "Mon - Sat, 9:30 AM - 6:30 PM", // placeholder: confirm working hours
    mapEmbedUrl:
      "https://maps.google.com/maps?q=152%2F2%2C%20Shanker%20Math%2C%20Pune%20-%20Solapur%20Rd%2C%20Hadapsar%2C%20Pune%20411013&output=embed",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Beget+Engineering+Hadapsar+Pune",
  },
  social: [
    { name: "LinkedIn", icon: "linkedin", href: "#" },
    { name: "Facebook", icon: "facebook", href: "#" },
    { name: "Instagram", icon: "instagram", href: "#" },
    { name: "YouTube", icon: "youtube", href: "#" },
  ],

  stats: [
    { value: "25+", label: "Years", note: "Established in 1999" },
    { value: "11+", label: "Engineering services", note: "Under one roof" },
    { value: "Turnkey", label: "Project execution", note: "From brief to handover" },
    { value: "Quality", label: "Focused", note: "Checked at every stage" },
  ],

  aboutPoints: [
    "Established in 1999",
    "Engineering and manufacturing under one roof",
    "Industrial and civil construction",
    "Customer-oriented approach",
    "Quality and safety on every project",
    "Turnkey project execution",
  ],

  whyBeget: [
    {
      icon: "calendar",
      title: "Established since 1999",
      text: "More than two decades of engineering, manufacturing and contracting experience.",
    },
    {
      icon: "check",
      title: "Quality focused",
      text: "Work is checked at every stage, from drawings to final handover.",
    },
    {
      icon: "users",
      title: "Customer oriented",
      text: "We work around your requirements, timelines and budget with fair, affordable pricing.",
    },
    {
      icon: "key",
      title: "Turnkey execution",
      text: "One team takes your project from first consultation to commissioning.",
    },
    {
      icon: "layers",
      title: "Multi-disciplinary expertise",
      text: "Electrical, fabrication, automation and civil work handled by a single provider.",
    },
    {
      icon: "shield",
      title: "Safety and reliability",
      text: "Safe site practices and dependable workmanship that lasts in demanding conditions.",
    },
  ],

  process: [
    { title: "Consultation", text: "We listen to your requirement, site conditions and budget." },
    { title: "Planning", text: "Scope, schedule and resources are agreed before work starts." },
    { title: "Engineering", text: "Drawings, calculations and specifications are prepared." },
    { title: "Fabrication", text: "Components are manufactured and quality-checked." },
    { title: "Installation", text: "Our teams install and integrate on site, safely." },
    { title: "Commissioning", text: "Systems are tested under real working conditions." },
    { title: "Handover", text: "Documentation and guidance so your team can take over." },
  ],

  // About page content (draft wording. Confirm with the client before launch)
  visionMission: [
    {
      icon: "target",
      title: "Our vision",
      text: "To be the single-window partner that enterprises trust for engineering, manufacturing and construction.",
    },
    {
      icon: "flag",
      title: "Our mission",
      text: "To deliver safe, high-quality and affordable turnkey projects with a customer-first approach, supporting our clients' operational efficiency and sustainable growth.",
    },
  ],

  qualitySafety: [
    {
      icon: "check",
      title: "Quality",
      text: "Quality is built into each stage of a project: engineering, fabrication, installation and commissioning.",
    },
    {
      icon: "shield",
      title: "Safety",
      text: "Safe working practices protect our teams, your people and your site, on every job.",
    },
    {
      icon: "gauge",
      title: "Operational efficiency",
      text: "We design and build for systems that run reliably, cost less to operate and last longer.",
    },
  ],

  capabilityGroups: [
    {
      icon: "bolt",
      title: "Electrical and automation",
      text: "Control systems and panels that power and manage your operations.",
      slugs: ["automation", "control-panels"],
    },
    {
      icon: "hammer",
      title: "Fabrication and structural fabrication",
      text: "Steel structures, enclosures, gates and storage built in our workshop.",
      slugs: [
        "structural-fabrication",
        "industrial-sheds",
        "jumbo-gates",
        "puf-panels",
        "storage-systems",
      ],
    },
    {
      icon: "building",
      title: "Civil construction",
      text: "Foundations, buildings and treatment plants for industrial sites.",
      slugs: ["civil-construction", "sewage-treatment-plants"],
    },
    {
      icon: "wrench",
      title: "Lifting and support works",
      text: "Cranes, repairs and site works that keep facilities productive.",
      slugs: ["crane-works", "miscellaneous-works"],
    },
  ],

  sectors: [
    { icon: "factory", title: "Manufacturing plants", text: "Production lines, sheds and utilities." },
    { icon: "gauge", title: "Process industries", text: "Automation, panels and process structures." },
    { icon: "box", title: "Warehousing and logistics", text: "Sheds, storage systems and gates." },
    { icon: "building", title: "Infrastructure and utilities", text: "Civil works and support structures." },
    { icon: "layers", title: "Commercial projects", text: "Buildings, roofing and cladding." },
    { icon: "drop", title: "Water and wastewater", text: "Sewage treatment plants." },
  ],
};

export default site;
