// Centralized image definitions for Beget Engineering

// Standard helper function for default .jpg files
// const img = (slug, n, alt) => ({ src: `/images/services/${slug}/${n}.jpg`, alt });

// Custom helper function to handle specific extensions like .png
const img = (slug, filename, alt) => ({ src: `/images/services/${slug}/${filename}`, alt });

// NEW: Standalone Landing Page Hero Banner
export const heroBanner = {
  src: "/images/hero-image-v2.jpeg",
  alt: "Beget Engineering Landing Page Banner",
};

// Client project photos organized by service
export const clientPhotos = {
  "industrial-sheds": [
    img("industrial-sheds", "industrial-sheds.png", "Industrial shed exterior overview"),
    // img("industrial-sheds", 2, "Industrial shed exterior in overcast weather"),
    // img("industrial-sheds", 3, "Industrial shed structure nearing completion"),
    // img("industrial-sheds", 4, "Industrial shed with green cladding"),
    // img("industrial-sheds", 5, "Crane loading a fabricated unit at a shed site"),
    // img("industrial-sheds", 6, "Industrial shed under construction"),
    // img("industrial-sheds", 7, "Industrial shed exterior view"),
    // img("industrial-sheds", 8, "Industrial shed compound wall and boundary"),
    // img("industrial-sheds", 9, "Industrial shed site progress"),
    // img("industrial-sheds", 10, "Industrial shed exterior with landscaping"),
    // img("industrial-sheds", 11, "Industrial shed with perimeter fencing"),
    // img("industrial-sheds", 12, "Industrial shed exterior, wide view"),
    // img("industrial-sheds", 13, "Industrial shed site under a cloudy sky"),
    // img("industrial-sheds", 14, "Industrial shed entrance gate"),
  ],
  "miscellaneous-works": [
    img("miscellaneous-works", "miscellaneous-works.jpeg", "Canopy structure over a building entrance"),
    // img("miscellaneous-works", 2, "Small structures completed on site"),
    // img("miscellaneous-works", 3, "Canopy and gazebo framework under construction"),
    // img("miscellaneous-works", 4, "Steel canopy framework being erected"),
    // img("miscellaneous-works", 5, "Gazebo-style roof structure on site"),
  ],
  "civil-construction": [
    img("civil-construction", "civil-constructions.png", "Civil construction project site"),
    // img("civil-construction", 2, "Rooftop deck slab with rebar mesh, wide view"),
    // img("civil-construction", 3, "Civil building under construction"),
    // img("civil-construction", 4, "Building shell under construction"),
    // img("civil-construction", 5, "Building exterior with staircase"),
    // img("civil-construction", 6, "Building facade, completed"),
    // img("civil-construction", 7, "Concrete mixer truck pouring a slab on site"),
  ],
  "crane-works": [
    img("crane-works", "crane-works.jpeg", "Overhead jib crane installed inside a shed"),
    // img("crane-works", 2, "Crane structure and supporting steelwork"),
    // img("crane-works", 3, "Crane installation, wide site view"),
    // img("crane-works", 4, "Crane girder and runway beam detail"),
  ],
  "control-panels": [
    img("control-panels", "control-panels.jpeg", "Row of custom-built electrical control panels"),
    img("control-panels", "client1-control-panels.png", "Control panel assembly inside the workshop"),
    img("control-panels", "client2-control-panels.png", "Control panel assembly inside the workshop"),
    img("control-panels", "client3-control-panels.png", "Control panel assembly inside the workshop"),
    img("control-panels", "client4-control-panels.png", "Control panel assembly inside the workshop"),
  ],
  "storage-systems": [
    img("storage-systems", "storage-systems.jpg", "Custom industrial storage system"),
    // img("storage-systems", 2, "Storage and trolley fabrication in progress"),
    // img("storage-systems", 3, "Fabricated storage unit, close view"),
  ],
  "jumbo-gates": [
    img("jumbo-gates", "jumbo-gates.png", "Automated jumbo gate installation"),
    // img("jumbo-gates", 2, "Jumbo gate structural frame under fabrication"),
    // img("jumbo-gates", 3, "Steel gate frame being erected on site"),
    // img("jumbo-gates", 4, "Timber-finish sliding gate, completed"),
    // img("jumbo-gates", 5, "Fabricated steel gate, workshop view"),
    // img("jumbo-gates", 6, "Gate structure under assembly"),
    // img("jumbo-gates", 7, "Overhead gate installation with crane support"),
    // img("jumbo-gates", 8, "Perimeter gate and fencing, completed"),
    // img("jumbo-gates", 9, "Gate and boundary fencing at a facility entrance"),
  ],
  "puf-panels": [
    img("puf-panels", "puff-panal.png", "Insulated PUF panel installation"),
    // img("puf-panels", 2, "Building exterior with terrace, PUF panel structure"),
    // img("puf-panels", 3, "Building exterior with parking area"),
    // img("puf-panels", 4, "Building exterior with entrance canopy"),
    // img("puf-panels", 5, "Insulated panel wall exterior, close view"),
    // img("puf-panels", 6, "Building exterior with covered walkway"),
    // img("puf-panels", 7, "Interior of a clean room with insulated panel walls"),
  ],
  "sewage-treatment-plants": [
    img("sewage-treatment-plants", "sewerage-treatment.png", "Sewage treatment plant installation"),
    // img("sewage-treatment-plants", 2, "Workers finishing a treatment plant enclosure"),
    // img("sewage-treatment-plants", 3, "Treatment plant enclosure, exterior view"),
    // img("sewage-treatment-plants", 4, "Treatment plant enclosure being painted on site"),
  ],
  "structural-fabrication": [
    img("structural-fabrication", "structural-fabrications.png", "Structural steel fabrication project"),
    // img("structural-fabrication", 2, "Warehouse interior structural fabrication, multiple views"),
    // img("structural-fabrication", 3, "Small structures completed on site, multiple views"),
    // img("structural-fabrication", 4, "Scaffolding and ceiling structural work, multiple views"),
    // img("structural-fabrication", 5, "Fabricated structural components, workshop view"),
    // img("structural-fabrication", 6, "Structural steel framework under fabrication"),
  ],
  "automation": [
    img("automation", "gate-automation.png", "Automated gate and control system"),
  ],
};

// Page banners
export const banners = {
  home: heroBanner,
  about: clientPhotos["industrial-sheds"][0],
  workshop: clientPhotos["industrial-sheds"][0],
  projects: clientPhotos["structural-fabrication"][0],
  contact: clientPhotos["control-panels"][0],
  quote: clientPhotos["jumbo-gates"][0],
};