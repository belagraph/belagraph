import { client } from './client';

export async function getPosters() {
  return client.fetch(
    `*[_type == "poster"] | order(_createdAt desc) {
      _id,
      title,
      "slug": slug.current,
      image,
      hoverImage,
      price,
      isTopPick,
      year,
      _createdAt
    }`
  );
}

export async function getTopPicks() {
  return client.fetch(
    `*[_type == "poster" && isTopPick == true] | order(_createdAt desc) {
      _id,
      title,
      "slug": slug.current,
      image,
      hoverImage,
      price,
      year
    }`
  );
}

export async function getPosterBySlug(slug) {
  return client.fetch(
    `*[_type == "poster" && slug.current == $slug][0] {
      _id,
      title,
      "slug": slug.current,
      image,
      hoverImage,
      price,
      sizes,
      frameOptions,
      description,
      printAndFrameDetails,
      isTopPick,
      year,
      _createdAt
    }`,
    { slug }
  );
}

export async function getFonts() {
  return client.fetch(
    `*[_type == "font"] | order(_createdAt desc) {
      _id,
      title,
      "slug": slug.current,
      style,
      image,
      hoverImage,
      description,
      specimen,
      downloadUrl,
      year
    }`
  );
}

export async function getFontBySlug(slug) {
  return client.fetch(
    `*[_type == "font" && slug.current == $slug][0] {
      _id,
      title,
      "slug": slug.current,
      style,
      image,
      hoverImage,
      description,
      specimen,
      downloadUrl,
      year
    }`,
    { slug }
  );
}

export async function getSiteSettings() {
  return client.fetch(
    `*[_type == "siteSettings"][0] {
      heroTitle,
      heroCtaText,
      heroImages,
      aboutDesignerHeading,
      aboutName,
      aboutDescription1,
      aboutDescription2,
      aboutCtaText,
      aboutImage,
      contactTitle,
      email,
      location,
      footerTagline,
      copyright,
      socialInstagram,
      socialLinkedin,
      socialTelegram,
      socialTiktok
    }`
  );
}
