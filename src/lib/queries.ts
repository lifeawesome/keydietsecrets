// lib/queries.ts
import { sanityClient } from "./sanity.client";
import type { PortableTextBlock } from "@portabletext/react";

export type Article = {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  body?: PortableTextBlock[];
  category?: {
    _id: string;
    title: string;
    slug: { current: string };
  };
  publishedAt?: string;
};

export type SiteSettings = {
  heroCta?: {
    badge: string;
    subtitle: string;
    buttonText: string;
    description: string;
    fileUrl?: string;
    socialProof?: string;
  };
};

export async function getArticlesByCategorySlug(
  categorySlug: string
): Promise<Article[]> {
  const query = `
    *[_type == "article" && category->slug.current == $categorySlug]|
      order(publishedAt desc){
        _id,
        title,
        slug,
        excerpt,
        publishedAt,
        "category": category->{_id, title, slug}
      }
  `;
  return sanityClient.fetch(query, { categorySlug });
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const query = `
    *[_type == "article" && slug.current == $slug][0]{
      _id,
      title,
      slug,
      excerpt,
      body[]{
        ...,
        _type == "downloadBox" => {
          ...,
          "fileUrl": file.asset->url,
        },
        _type == "affiliateOfferReference" => {
          ...,
          "offer": offer->{
            offerName,
            linkType,
            linkText,
            image,
            imageUrl,
            alt,
            url,
            openInNewTab,
            description,
            merchantName
          }
        }
      },
      publishedAt,
      "category": category->{_id, title, slug}
    }
  `;
  return sanityClient.fetch(query, { slug });
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  const query = `
    *[_type == "siteSettings"][0]{
      heroCta{
        badge,
        subtitle,
        buttonText,
        description,
        "fileUrl": file.asset->url,
        socialProof
      }
    }
  `;
  return sanityClient.fetch(query);
}
