// sanity/schemas/article.ts
import { defineField, defineType } from "sanity";

export default defineType({
  name: "article",
  title: "Article",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
    }),
    defineField({
      name: "mainImage",
      title: "Main Image",
      type: "image",
      description: "Optional featured image for the post",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
          description: "Alternative text for accessibility and SEO",
        }),
        defineField({
          name: "caption",
          title: "Caption",
          type: "string",
          description: "Optional caption to display below the image",
        }),
      ],
    }),
    defineField({
      name: "pullQuote",
      title: "Pull Quote",
      type: "text",
      rows: 3,
      description:
        "Optional highlighted quote to make the content more engaging",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [
        { type: "block" },
        { type: "imageBlock" },
        { type: "affiliateLink" },
        { type: "affiliateOfferReference" },
        { type: "downloadBox" },
      ],
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
      description: "Search engine optimization settings",
    }),
  ],
});
