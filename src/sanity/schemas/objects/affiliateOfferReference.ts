// sanity/schemas/objects/affiliateOfferReference.ts
import { defineField, defineType } from "sanity";

export default defineType({
  name: "affiliateOfferReference",
  title: "Affiliate Offer (Reusable)",
  type: "object",
  fields: [
    defineField({
      name: "offer",
      title: "Select Offer",
      type: "reference",
      to: [{ type: "affiliateOffer" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "overrideText",
      title: "Override Link Text",
      type: "string",
      description:
        "Optional: Override the default link text/button label for this article",
    }),
    defineField({
      name: "overrideDescription",
      title: "Override Description",
      type: "text",
      rows: 2,
      description:
        "Optional: Override the default description for this article",
    }),
  ],
  preview: {
    select: {
      offerName: "offer.offerName",
      merchantName: "offer.merchantName",
      overrideText: "overrideText",
      overrideDescription: "overrideDescription",
      media: "offer.image",
    },
    prepare({
      offerName,
      merchantName,
      overrideText,
      overrideDescription,
      media,
    }) {
      const hasOverrides = Boolean(overrideText || overrideDescription);
      const badge = hasOverrides ? " (Custom)" : "";

      return {
        title: offerName ? `${offerName}${badge}` : "Affiliate Offer",
        subtitle: merchantName || "Select an offer",
        media,
      };
    },
  },
});
