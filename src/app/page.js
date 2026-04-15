import { getPosters, getTopPicks, getFonts, getSiteSettings } from '@/sanity/queries';
import { urlFor } from '@/sanity/image';
import { isSanityConfigured } from '@/sanity/client';
import content from '@/data/content.json';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import PosterGallery from '@/components/PosterGallery';
import FontGallery from '@/components/FontGallery';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

function addImageUrls(items) {
  return items.map((item) => ({
    ...item,
    imageUrl: urlFor(item.image)?.width(520).url(),
    hoverUrl: urlFor(item.hoverImage)?.width(520).url(),
  }));
}

function jsonPostersAsFallback(items) {
  return items.map((p) => ({
    _id: p.id,
    title: p.title,
    slug: p.title.toLowerCase().replace(/\s+/g, '-'),
    imageUrl: `/${p.image}`,
    hoverUrl: `/${p.hoverImage}`,
    price: null,
    year: p.year,
  }));
}

function jsonFontsAsFallback(items) {
  return items.map((f) => ({
    _id: f.id,
    title: f.title,
    slug: f.title.toLowerCase().replace(/\s+/g, '-'),
    style: f.style,
    imageUrl: `/${f.image}`,
    hoverUrl: `/${f.hoverImage}`,
    year: f.year,
  }));
}

export default async function Home() {
  const useSanity = isSanityConfigured();

  let settings = null;
  let topPicks = [];
  let recentPosters = [];
  let fonts = [];
  let hasSanityPosters = false;
  let hasSanityFonts = false;

  if (useSanity) {
    const [s, tp, all, f] = await Promise.all([
      getSiteSettings(),
      getTopPicks(),
      getPosters(),
      getFonts(),
    ]);
    settings = s;
    topPicks = addImageUrls(tp || []);
    recentPosters = addImageUrls(all || []);
    fonts = addImageUrls(f || []);
    hasSanityPosters = recentPosters.length > 0;
    hasSanityFonts = fonts.length > 0;
  }

  if (!hasSanityPosters) {
    const jsonPosters = jsonPostersAsFallback(content.posters.items);
    recentPosters = jsonPosters;
    topPicks = [];
  }

  if (!hasSanityFonts) {
    fonts = jsonFontsAsFallback(content.fonts.items);
  }

  const hasSettings = useSanity && settings;

  const heroData = hasSettings
    ? {
        title: settings.heroTitle || 'Bold<br />Art<br />Works',
        cta_primary: { text: settings.heroCtaText || 'Explore Collection', url: '#posters' },
        images: settings.heroImages
          ? settings.heroImages.map((img) => urlFor(img)?.width(1600).url()).filter(Boolean)
          : content.hero.images,
      }
    : content.hero;

  if (hasSettings && (!heroData.images || heroData.images.length === 0)) {
    heroData.images = content.hero.images;
  }

  const aboutData = hasSettings
    ? {
        badge: settings.aboutDesignerHeading || content.about.badge,
        name: settings.aboutName || content.about.name,
        description_1: settings.aboutDescription1 || content.about.description_1,
        description_2: settings.aboutDescription2 || content.about.description_2,
        cta_text: settings.aboutCtaText || content.about.cta_text,
        image: settings.aboutImage
          ? urlFor(settings.aboutImage)?.width(800).url()
          : content.about.image,
      }
    : content.about;

  const contactData = hasSettings
    ? {
        email: settings.email || content.contact.email_value,
        location: settings.location || 'Addis Ababa, Ethiopia',
      }
    : { email: content.contact.email_value, location: 'Addis Ababa, Ethiopia' };

  const footerData = hasSettings
    ? {
        tagline: settings.footerTagline || content.footer.tagline,
        copyright: settings.copyright || `© ${new Date().getFullYear()} Abel Daniel. All rights reserved.`,
      }
    : content.footer;

  const social = hasSettings
    ? {
        instagram: settings.socialInstagram || content.social.instagram,
        linkedin: settings.socialLinkedin || content.social.linkedin,
        telegram: settings.socialTelegram || content.social.telegram,
        tiktok: settings.socialTiktok || content.social.tiktok,
      }
    : content.social;

  const navLinks = content.navigation.links;

  return (
    <>
      <Navbar links={navLinks} social={social} />
      <main>
        <Hero data={heroData} />
        <PosterGallery topPicks={topPicks} recentPosters={recentPosters} />
        <About data={aboutData} />
        <FontGallery fonts={fonts} />
        <Contact data={contactData} />
      </main>
      <Footer data={footerData} social={social} />
    </>
  );
}
