export default {
  name: 'font',
  title: 'Font',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'style',
      title: 'Style',
      type: 'string',
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
};
