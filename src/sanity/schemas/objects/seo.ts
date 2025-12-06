// sanity/schemas/objects/seo.ts
import { defineField, defineType } from "sanity";

export default defineType({
  name: "seo",
  title: "SEO Metadata",
  type: "object",
  fields: [
    defineField({
      name: "metaTitle",
      title: "Meta Title",
      type: "string",
      description: "Title for search engines (50-60 characters recommended)",
      validation: (Rule) =>
        Rule.max(60).warning("Meta titles should be under 60 characters"),
    }),
    defineField({
      name: "metaDescription",
      title: "Meta Description",
      type: "text",
      rows: 3,
      description: "Description for search engines (150-160 characters recommended)",
      validation: (Rule) =>
        Rule.max(160).warning("Meta descriptions should be under 160 characters"),
    }),
    defineField({
      name: "keywords",
      title: "Keywords",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
      description: "Keywords for SEO (comma-separated)",
    }),
    defineField({
      name: "ogImage",
      title: "Open Graph Image",
      type: "image",
      options: {
        hotspot: true,
      },
      description: "Image for social media sharing (1200x630px recommended)",
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
          description: "Important for accessibility and SEO",
        }),
      ],
    }),
    defineField({
      name: "twitterImage",
      title: "Twitter Card Image",
      type: "image",
      options: {
        hotspot: true,
      },
      description: "Optional: Custom image for Twitter (1200x600px). If not set, Open Graph image will be used.",
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "canonicalUrl",
      title: "Canonical URL",
      type: "url",
      description: "Optional: Override the default canonical URL",
    }),
    defineField({
      name: "noindex",
      title: "No Index",
      type: "boolean",
      description: "Prevent search engines from indexing this page",
      initialValue: false,
    }),
    defineField({
      name: "nofollow",
      title: "No Follow",
      type: "boolean",
      description: "Tell search engines not to follow links on this page",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "metaTitle",
      subtitle: "metaDescription",
    },
  },
});

