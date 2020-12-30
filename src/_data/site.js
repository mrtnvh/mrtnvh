const pkg = require("../../package.json");

module.exports = {
  titleAffix: "Maarten Van Hoof \\\\ Front End Developer",
  baseURL: pkg.homepage,
  twitter: {
    card: "summary_large_image",
    creator: "@mrtnvh",
  },
  jsonLd: {
    "@context": "http://schema.org/",
    "@type": "Person",
    name: "Maarten Van Hoof",
    image:
      "https://res.cloudinary.com/mrtnvh/image/upload/c_scale,dpr_1.0,f_auto,q_auto,w_1200/v1570871092/mrtnvh.com/portrait",
    jobTitle: "Front-end Developer",
    url: "https://mrtnvh.com",
    sameAs: "https://mrtnvh.com",
    memberOf: {
      "@context": "http://schema.org",
      "@type": "Organization",
      name: "ISAAC",
      url: "https://isaac.nl",
      sameAs: "https://isaac.nl",
      slogan: "Turning .complexity into profitability",
      description: "Digital Agency specialized in Commerce en Finance",
      image: "https://www.isaac.nl/global/images/logo.svg",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Eindhoven, The Netherlands",
        postalCode: "5621 AA",
        streetAddress: "Marconilaan 16",
      },
      email: "welkom@isaac.nl",
    },
  },
};
