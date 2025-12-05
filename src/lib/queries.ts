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
      body,
      publishedAt,
      "category": category->{_id, title, slug}
    }
  `;
  return sanityClient.fetch(query, { slug });
}
