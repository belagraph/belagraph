export const metadata = {
  title: 'Belagraph Studio',
  description: 'Sanity Studio for Belagraph CMS',
};

export default function StudioLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}
