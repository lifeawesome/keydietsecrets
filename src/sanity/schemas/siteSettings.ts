// sanity/schemas/siteSettings.ts
import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Site Title",
      type: "string",
      description: "Internal use only - not displayed on site",
      initialValue: "KeyDietSecrets Settings",
      readOnly: true,
    }),
    defineField({
      name: "heroCta",
      title: "Hero CTA Box",
      type: "object",
      fields: [
        defineField({
          name: "badge",
          title: "Badge Text",
          type: "string",
          description: 'e.g., "Free 7-Day Starter Kit"',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "subtitle",
          title: "Subtitle",
          type: "string",
          description: 'e.g., "Get started today"',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "buttonText",
          title: "Button Text",
          type: "string",
          description: 'e.g., "Get Your Free Kit →"',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "description",
          title: "Description",
          type: "text",
          rows: 3,
          description: "Appears below the form",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "file",
          title: "Download File",
          type: "file",
          description: "The file to send to users via email",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "socialProof",
          title: "Social Proof Text",
          type: "string",
          description:
            'e.g., "Join 1,000+ people on their weight loss journey"',
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Site Settings",
        subtitle: "Homepage Hero CTA & More",
      };
    },
  },
});



