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
      name: 'price',
      title: 'Price (ETB)',
      type: 'number',
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
          ],
          preview: {
            select: { title: 'label', subtitle: 'dimensions' },
          },
        },
      ],
      initialValue: [
        { label: 'A2', dimensions: '42×59.4cm' },
        { label: '60×80', dimensions: '60×80cm' },
        { label: '60×90', dimensions: '60×90cm' },
        { label: '50×70', dimensions: '50×70cm' },
        { label: 'Custom', dimensions: 'Custom size' },
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
            { name: 'priceModifier', title: 'Additional Price', type: 'number' },
          ],
          preview: {
            select: { title: 'name', subtitle: 'priceModifier' },
          },
        },
      ],
      initialValue: [
        { name: 'Unframed', priceModifier: 0 },
        { name: 'White Frame', priceModifier: 0 },
        { name: 'Natural Wood Frame', priceModifier: 0 },
        { name: 'Custom', priceModifier: 0 },
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
