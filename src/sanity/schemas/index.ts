// sanity/schemas/index.ts
import article from "./article";
import category from "./category";
import siteSettings from "./siteSettings";
import downloadBox from "./objects/downloadBox";
import seo from "./objects/seo";
import imageBlock from "./objects/imageBlock";
import affiliateLink from "./objects/affiliateLink";

export const schemaTypes = [
  category,
  article,
  siteSettings,
  downloadBox,
  seo,
  imageBlock,
  affiliateLink,
];
