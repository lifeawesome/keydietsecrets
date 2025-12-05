// sanity/schemas/objects/downloadBox.ts
import { defineField, defineType } from "sanity";

export default defineType({
  name: "downloadBox",
  title: "Download Box",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Small Label (eyebrow)",
      type: "string",
      description: "e.g., Free Resource",
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "buttonLabel",
      title: "Button Label",
      type: "string",
      initialValue: "Download Now",
    }),
    defineField({
      name: "file",
      title: "File (PDF or other)",
      type: "file",
      options: {
        storeOriginalFilename: true,
      },
    }),
    defineField({
      name: "affiliateUrl",
      title: "Optional Affiliate URL",
      type: "url",
      description:
        "If this resource relates to a product, add your affiliate link here.",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "label",
    },
  },
});
