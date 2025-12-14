// sanity/schemas/affiliateOffer.ts
import { defineField, defineType } from "sanity";

export default defineType({
  name: "affiliateOffer",
  title: "Affiliate Offer",
  type: "document",
  fields: [
    // Metadata Fields
    defineField({
      name: "offerName",
      title: "Offer Name",
      type: "string",
      description: "Internal name for this offer (not shown to users)",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "internalNotes",
      title: "Internal Notes",
      type: "text",
      rows: 3,
      description: "Private notes for staff use only",
    }),
    defineField({
      name: "productCategory",
      title: "Product Category",
      type: "string",
      options: {
        list: [
          { title: "Supplements", value: "supplements" },
          { title: "Meal Plans", value: "meal-plans" },
          { title: "Tools & Tech", value: "tools" },
          { title: "Books", value: "books" },
          { title: "Courses", value: "courses" },
          { title: "Other", value: "other" },
        ],
      },
    }),
    defineField({
      name: "merchantName",
      title: "Merchant Name",
      type: "string",
      description: 'e.g., "Amazon", "MyProtein", "iHerb"',
    }),
    defineField({
      name: "commissionRate",
      title: "Commission Rate",
      type: "string",
      description: 'e.g., "5%", "$10 per sale"',
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
      description: "Tags for filtering and organization",
    }),
    defineField({
      name: "featured",
      title: "Featured Offer",
      type: "boolean",
      description: "Mark as a high-priority or featured offer",
      initialValue: false,
    }),
    defineField({
      name: "expirationDate",
      title: "Expiration Date",
      type: "datetime",
      description: "Optional expiration date for limited-time offers",
    }),

    // Core Link Fields
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
      initialValue: "button",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "linkText",
      title: "Link Text / Button Label",
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
      offerName: "offerName",
      merchantName: "merchantName",
      commissionRate: "commissionRate",
      linkType: "linkType",
      featured: "featured",
      media: "image",
    },
    prepare({
      offerName,
      merchantName,
      commissionRate,
      linkType,
      featured,
      media,
    }) {
      const parts = [];
      if (merchantName) parts.push(merchantName);
      if (commissionRate) parts.push(commissionRate);

      const subtitle = parts.length > 0 ? parts.join(" • ") : linkType;

      return {
        title: `${featured ? "⭐ " : ""}${offerName}`,
        subtitle,
        media: linkType === "image" ? media : undefined,
      };
    },
  },
});



