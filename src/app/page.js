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

export default async function Home() {
  const useSanity = isSanityConfigured();

  let settings = null;
  let topPicks = [];
  let recentPosters = [];
  let fonts = [];

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
  }

  const heroData = useSanity && settings
    ? {
        title: settings.heroTitle || 'Bold<br />Art<br />Works',
        cta_primary: { text: settings.heroCtaText || 'Explore Collection', url: '#posters' },
        images: settings.heroImages
          ? settings.heroImages.map((img) => urlFor(img)?.width(1600).url()).filter(Boolean)
          : [],
      }
    : content.hero;

  const aboutData = useSanity && settings
    ? {
        badge: settings.aboutDesignerHeading || 'The Typography Passion',
        name: settings.aboutName || 'Abel Daniel',
        description_1: settings.aboutDescription1 || '',
        description_2: settings.aboutDescription2 || '',
        cta_text: settings.aboutCtaText || 'Download Resume',
        image: settings.aboutImage
          ? urlFor(settings.aboutImage)?.width(800).url()
          : null,
      }
    : content.about;

  const contactData = useSanity && settings
    ? {
        email: settings.email || 'hello@belagraph.com',
        location: settings.location || 'Addis Ababa, Ethiopia',
      }
    : content.contact;

  const footerData = useSanity && settings
    ? {
        tagline: settings.footerTagline || '',
        copyright: settings.copyright || `© ${new Date().getFullYear()} Abel Daniel. All rights reserved.`,
      }
    : content.footer;

  const social = useSanity && settings
    ? {
        instagram: settings.socialInstagram || '',
        linkedin: settings.socialLinkedin || '',
        telegram: settings.socialTelegram || '',
        tiktok: settings.socialTiktok || '',
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
