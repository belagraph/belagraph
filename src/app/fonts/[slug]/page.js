import { getFontBySlug, getFonts } from '@/sanity/queries';
import { urlFor } from '@/sanity/image';
import { notFound } from 'next/navigation';
import FontDetail from '@/components/FontDetail';

export async function generateStaticParams() {
  const fonts = await getFonts();
  return fonts
    .filter((f) => f.slug)
    .map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }) {
  const font = await getFontBySlug(params.slug);
  if (!font) return { title: 'Font Not Found' };
  return {
    title: `${font.title} | Belagraph`,
    description: font.description || `${font.title} typeface by Belagraph`,
  };
}

export default async function FontPage({ params }) {
  const font = await getFontBySlug(params.slug);
  if (!font) notFound();

  const imageUrl = urlFor(font.image)?.width(900).url();
  const hoverUrl = urlFor(font.hoverImage)?.width(900).url();
  const specimenUrl = urlFor(font.specimen)?.width(1200).url();

  return (
    <FontDetail
      font={font}
      imageUrl={imageUrl}
      hoverUrl={hoverUrl}
      specimenUrl={specimenUrl}
    />
  );
}
