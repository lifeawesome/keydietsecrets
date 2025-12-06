// lib/queries.ts
import { sanityClient } from "./sanity.client";
import type { PortableTextBlock } from "@portabletext/react";

export type SEO = {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  ogImage?: {
    asset: {
      _ref: string;
      _type: "reference";
    };
    alt?: string;
  };
  ogImageUrl?: string;
  twitterImage?: {
    asset: {
      _ref: string;
      _type: "reference";
    };
    alt?: string;
  };
  twitterImageUrl?: string;
  canonicalUrl?: string;
  noindex?: boolean;
  nofollow?: boolean;
};

export type DownloadBoxData = {
  label?: string | null;
  title: string;
  description?: string | null;
  buttonLabel?: string | null;
  fileUrl?: string | null;
  affiliateUrl?: string | null;
};

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
  downloadBox?: DownloadBoxData;
  seo?: SEO;
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
        }
      },
      publishedAt,
      "category": category->{_id, title, slug},
      downloadBox{
        label,
        title,
        description,
        buttonLabel,
        "fileUrl": file.asset->url,
        affiliateUrl
      },
      seo{
        metaTitle,
        metaDescription,
        keywords,
        ogImage{
          asset,
          alt
        },
        "ogImageUrl": ogImage.asset->url,
        twitterImage{
          asset,
          alt
        },
        "twitterImageUrl": twitterImage.asset->url,
        canonicalUrl,
        noindex,
        nofollow
      }
    }
  `;
  return sanityClient.fetch(query, { slug });
}
