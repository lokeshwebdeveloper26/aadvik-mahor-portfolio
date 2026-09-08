import type { CompanyData } from "./types"

/**
 * ============================================================
 *  EDIT THIS FILE WHEN CREATING A NEW MODEL / CLIENT
 * ============================================================
 *
 * Company / agency information. All bookings and enquiries route
 * to the company details below — never directly to the model.
 *
 * The `logo` is used prominently in the navbar and about section,
 * so use a high-quality transparent PNG/SVG.
 */
export const companyData: CompanyData = {
  name: "PITAMBRA FILMS & PRODUCTIONS",
  logo: "/portfolio/company-logo.png",
  tagline: "Junior Model Management & Productions",

  description:
    "Pitambra Films & Productions is a talent management and production house specialising in junior fashion and commercial modeling. We represent, coordinate and support young talent across fashion, editorial, commercial and catalogue projects, with a professional and family-first approach on every production.",

  services: [
    { title: "Junior Modeling", description: "Professional representation and career development for young talent." },
    { title: "Fashion Shoots", description: "Editorial fashion stories for magazines and design houses." },
    { title: "Commercial Shoots", description: "Product, lifestyle and retail photography for global brands." },
    { title: "Brand Campaigns", description: "Full creative direction for multi-channel advertising campaigns." },
    { title: "Catalogue Shoots", description: "High-volume, consistent catalogue and lookbook production." },
    { title: "Advertisement & Production", description: "End-to-end video, reel and advertisement production." },
  ],

  // Contact details — bookings route here, not to the model.
  email: "jabalpur@Pitambarafilms.com",
  phone: "+917477073917",
  // WhatsApp: international format, digits only.
  whatsapp: "+917477073917",
  instagram: "pitambrafilmandproduction",
  location: "IT park Techno B, Jabalpur, Madhya Pradesh, India",
  website: "https://www.pitambarafilms.com/",
}
