import { getPosterBySlug } from '@/sanity/queries';
import { urlFor } from '@/sanity/image';
import { notFound } from 'next/navigation';
import PosterDetail from '@/components/PosterDetail';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const poster = await getPosterBySlug(params.slug);
  if (!poster) return { title: 'Poster Not Found' };
  return {
    title: `${poster.title} | Belagraph`,
    description: poster.description || `${poster.title} poster by Belagraph`,
  };
}

export default async function PosterPage({ params }) {
  const poster = await getPosterBySlug(params.slug);
  if (!poster) notFound();

  const imageUrl = urlFor(poster.image)?.width(900).url();
  const hoverUrl = urlFor(poster.hoverImage)?.width(900).url();

  return (
    <PosterDetail
      poster={poster}
      imageUrl={imageUrl}
      hoverUrl={hoverUrl}
    />
  );
}
