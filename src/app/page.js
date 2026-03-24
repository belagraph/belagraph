import content from '@/data/content.json';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import PosterGallery from '@/components/PosterGallery';
import FontGallery from '@/components/FontGallery';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navbar
        links={content.navigation.links}
        social={content.social}
      />
      <main>
        <Hero data={content.hero} />
        <PosterGallery data={content.posters} />
        <About data={content.about} />
        <FontGallery data={content.fonts} />
        <Contact data={content.contact} />
      </main>
      <Footer
        data={content.footer}
        social={content.social}
      />
    </>
  );
}
