// sanity/schemas/index.ts
import article from "./article";
import category from "./category";
import siteSettings from "./siteSettings";
import affiliateOffer from "./affiliateOffer";
import downloadBox from "./objects/downloadBox";
import seo from "./objects/seo";
import imageBlock from "./objects/imageBlock";
import affiliateLink from "./objects/affiliateLink";
import affiliateOfferReference from "./objects/affiliateOfferReference";

export const schemaTypes = [
  category,
  article,
  siteSettings,
  affiliateOffer,
  downloadBox,
  seo,
  imageBlock,
  affiliateLink,
  affiliateOfferReference,
];
