/**
 * Shared type definitions for the master portfolio template.
 * These describe the shape of the model and company data.
 * You should not need to edit this file when creating a new model —
 * edit `data/model-data.ts` and `data/company-data.ts` instead.
 */

export type GalleryCategory =
  | "Fashion"
  | "Commercial"
  | "Studio"
  | "Outdoor"
  | "Casual"
  | "Campaign"
  | "Editorial"
export interface GalleryImage {
  /** Path to the image (place files in /public) or an absolute URL */
  src: string
  /** Descriptive alt text for accessibility + SEO */
  alt: string
  category: GalleryCategory
  /** Set true to feature this image larger in the editorial grid */
  featured?: boolean
}

export interface VideoItem {
  title: string
  category: string
  /** Poster/thumbnail image */
  thumbnail: string
  /**
   * Either a local/remote MP4 URL (played inline) OR an external embed URL
   * (YouTube/Vimeo). Use `type` to distinguish.
   */
  src: string
  type: "mp4" | "embed"
}

export interface EcommerceItem {
  name: string
  url: string
  description?: string
}

export interface ModelDetails {
  age?: string
  dateOfBirth?: string
  height?: string
  weight?: string
  Bust?: string
  Waist?: string
  Hips?: string
  ShoeSize?: string
  skinTone?: string
  hairColor?: string
  eyeColor?: string
  location?: string
}

export interface ModelParents {
  fatherName?: string
  motherName?: string
}

export interface ModelData {
  name: string
  title: string
  profileImage: string
  heroImage: string
  bio: string
  /** Short one-line intro used in the hero */
  intro: string
  availability: string
  details: ModelDetails
  parents: ModelParents
  /** Instagram handle without the @ */
  instagram: string
  gallery: GalleryImage[]
  videos: VideoItem[]
  ecommerce?: EcommerceItem[]
}

export interface CompanyService {
  title: string
  description: string
}

export interface CompanyData {
  name: string
  logo: string
  tagline: string
  description: string
  services: CompanyService[]
  email: string
  phone: string
  /** WhatsApp number in international format, digits only (e.g. "919999999999") */
  whatsapp: string
  /** Instagram handle without the @ */
  instagram: string
  location: string
  website: string
}
