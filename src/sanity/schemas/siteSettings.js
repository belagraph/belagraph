export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    {
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
    },
    {
      name: 'heroBadge',
      title: 'Hero Badge Text',
      type: 'string',
    },
    {
      name: 'heroCtaText',
      title: 'Hero CTA Text',
      type: 'string',
    },
    {
      name: 'heroImages',
      title: 'Hero Slideshow Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    },
    {
      name: 'aboutBadge',
      title: 'About Badge',
      type: 'string',
    },
    {
      name: 'aboutName',
      title: 'About Name',
      type: 'string',
    },
    {
      name: 'aboutDescription1',
      title: 'About Bio (Paragraph 1)',
      type: 'text',
    },
    {
      name: 'aboutDescription2',
      title: 'About Bio (Paragraph 2)',
      type: 'text',
    },
    {
      name: 'aboutCtaText',
      title: 'About CTA Text',
      type: 'string',
    },
    {
      name: 'aboutImage',
      title: 'About Photo',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'contactTitle',
      title: 'Contact Title',
      type: 'string',
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
    },
    {
      name: 'footerTagline',
      title: 'Footer Tagline',
      type: 'text',
    },
    {
      name: 'copyright',
      title: 'Copyright Text',
      type: 'string',
    },
    {
      name: 'socialInstagram',
      title: 'Instagram URL',
      type: 'url',
    },
    {
      name: 'socialLinkedin',
      title: 'LinkedIn URL',
      type: 'url',
    },
    {
      name: 'socialTelegram',
      title: 'Telegram URL',
      type: 'url',
    },
    {
      name: 'socialTiktok',
      title: 'TikTok URL',
      type: 'url',
    },
  ],
};
