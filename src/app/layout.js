import './globals.css';

export const metadata = {
  title: 'Belagraph | Bold Art Works',
  description:
    'Bold poster designs and custom Ethiopian typefaces by Abel Daniel. Specializing in typography, logo design, and brand identity.',
  icons: {
    icon: '/belagraph-logo.svg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
