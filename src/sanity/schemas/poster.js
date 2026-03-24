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
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: ['Abstract', 'Song', 'Golden', 'Minimal', 'Word'],
      },
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'hoverImage',
      title: 'Hover Image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'year',
      title: 'Year',
      type: 'string',
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
    },
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
};
