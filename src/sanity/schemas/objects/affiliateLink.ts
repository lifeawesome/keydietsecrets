// sanity/schemas/objects/affiliateLink.ts
import { defineField, defineType } from "sanity";

export default defineType({
  name: "affiliateLink",
  title: "Affiliate Link",
  type: "object",
  fields: [
    defineField({
      name: "linkType",
      title: "Link Type",
      type: "string",
      options: {
        list: [
          { title: "Text Link", value: "text" },
          { title: "Image Link", value: "image" },
          { title: "Button", value: "button" },
        ],
        layout: "radio",
      },
      initialValue: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "linkText",
      title: "Link Text",
      type: "string",
      description: "The text or button label to display",
      hidden: ({ parent }) => parent?.linkType === "image",
      validation: (Rule) =>
        Rule.custom((text, context) => {
          const linkType = (context.parent as any)?.linkType;
          if (linkType !== "image" && !text) {
            return "Link text is required for text and button links";
          }
          return true;
        }),
    }),
    defineField({
      name: "image",
      title: "Upload Image",
      type: "image",
      options: {
        hotspot: true,
      },
      description: "Upload an image from your computer",
      hidden: ({ parent }) => parent?.linkType !== "image",
    }),
    defineField({
      name: "imageUrl",
      title: "Or Use Image URL",
      type: "url",
      description: "External image URL (e.g., from Amazon, CDN, etc.)",
      hidden: ({ parent }) => parent?.linkType !== "image",
      validation: (Rule) =>
        Rule.uri({
          scheme: ["http", "https"],
        }),
    }),
    defineField({
      name: "alt",
      title: "Image Alt Text",
      type: "string",
      description: "Alternative text for the image",
      hidden: ({ parent }) => parent?.linkType !== "image",
      validation: (Rule) =>
        Rule.custom((alt, context) => {
          const linkType = (context.parent as any)?.linkType;
          const image = (context.parent as any)?.image;
          const imageUrl = (context.parent as any)?.imageUrl;

          if (linkType === "image") {
            if (!image && !imageUrl) {
              return "Either upload an image or provide an image URL";
            }
            if (!alt) {
              return "Alt text is required for image links";
            }
          }
          return true;
        }),
    }),
    defineField({
      name: "url",
      title: "Affiliate URL",
      type: "url",
      description: "The affiliate link URL",
      validation: (Rule) =>
        Rule.required().uri({
          scheme: ["http", "https"],
        }),
    }),
    defineField({
      name: "openInNewTab",
      title: "Open in New Tab",
      type: "boolean",
      description: "Open this link in a new tab/window",
      initialValue: true,
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
      description: "Optional description shown below the link",
    }),
  ],
  preview: {
    select: {
      linkType: "linkType",
      text: "linkText",
      url: "url",
      media: "image",
    },
    prepare({ linkType, text, url, media }) {
      const typeLabel =
        linkType === "text"
          ? "Text"
          : linkType === "image"
            ? "Image"
            : "Button";
      return {
        title: text || `${typeLabel} Link`,
        subtitle: url || "No URL",
        media: linkType === "image" ? media : undefined,
      };
    },
  },
});
