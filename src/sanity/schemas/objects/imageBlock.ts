// sanity/schemas/objects/imageBlock.ts
import { defineField, defineType } from "sanity";

export default defineType({
  name: "imageBlock",
  title: "Image",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "alt",
      title: "Alt Text",
      type: "string",
      description: "Alternative text for accessibility and SEO",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "string",
      description: "Optional caption displayed below the image",
    }),
  ],
  preview: {
    select: {
      title: "alt",
      media: "image",
      caption: "caption",
    },
    prepare({ title, media, caption }) {
      return {
        title: title || "Image",
        subtitle: caption || "No caption",
        media,
      };
    },
  },
});



