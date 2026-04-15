export default {
  name: 'poster',
  title: 'Poster',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'hoverImage',
      title: 'Hover Image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'basePrice',
      title: 'Base Price (ETB)',
      type: 'number',
      description: 'Starting price shown on the card',
    },
    {
      name: 'sizes',
      title: 'Available Sizes',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Label', type: 'string' },
            { name: 'dimensions', title: 'Dimensions', type: 'string' },
            { name: 'price', title: 'Price (ETB)', type: 'number', description: 'Price for this size' },
          ],
          preview: {
            select: { title: 'label', sub1: 'dimensions', sub2: 'price' },
            prepare: ({ title, sub1, sub2 }) => ({
              title,
              subtitle: `${sub1 || ''}${sub2 ? ` — ${sub2} ETB` : ''}`,
            }),
          },
        },
      ],
    },
    {
      name: 'frameOptions',
      title: 'Frame Options',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Frame Name', type: 'string' },
            { name: 'price', title: 'Additional Price (ETB)', type: 'number', description: 'Extra cost for this frame' },
          ],
          preview: {
            select: { title: 'name', price: 'price' },
            prepare: ({ title, price }) => ({
              title,
              subtitle: price ? `+${price} ETB` : 'Included',
            }),
          },
        },
      ],
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    },
    {
      name: 'printAndFrameDetails',
      title: 'Print & Frame Details',
      type: 'text',
      rows: 4,
    },
    {
      name: 'isTopPick',
      title: 'Top Pick',
      type: 'boolean',
      initialValue: false,
      description: 'Feature this poster in the Top Picks section',
    },
    {
      name: 'year',
      title: 'Year',
      type: 'string',
    },
  ],
  orderings: [
    {
      title: 'Newest First',
      name: 'createdDesc',
      by: [{ field: '_createdAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: { title: 'title', media: 'image', subtitle: 'year' },
  },
};
