// sanity/schemas/objects/seo.ts
import { defineField, defineType } from "sanity";

export default defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({
      name: "metaTitle",
      title: "Meta Title",
      type: "string",
      description: "Title for search engines (50-60 characters recommended)",
      validation: (Rule) =>
        Rule.max(60).warning("Titles over 60 characters may be truncated"),
    }),
    defineField({
      name: "metaDescription",
      title: "Meta Description",
      type: "text",
      rows: 3,
      description: "Description for search engines (150-160 characters)",
      validation: (Rule) =>
        Rule.max(160).warning(
          "Descriptions over 160 characters may be truncated"
        ),
    }),
    defineField({
      name: "metaKeywords",
      title: "Meta Keywords",
      type: "array",
      of: [{ type: "string" }],
      description:
        "Keywords for this page. You can paste a comma-separated list and it will be split automatically. Example: weight loss, diet tips, healthy eating",
      options: {
        layout: "tags",
      },
    }),
    defineField({
      name: "ogImage",
      title: "Open Graph Image",
      type: "image",
      description: "Image for social media sharing (1200x630px recommended)",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "twitterImage",
      title: "Twitter Image",
      type: "image",
      description: "Specific image for Twitter (1200x600px recommended)",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
        }),
      ],
    }),
  ],
});
