import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

type ConstructMetadataArgs = {
  title?: string;
  description?: string;
  path?: string;
  noIndex?: boolean;
};

/**
 * Builds a Metadata object with Halisako's defaults already applied, so
 * every route (home + the four placeholder routes) gets consistent
 * Open Graph / Twitter / canonical behaviour by only specifying what's
 * different about that page.
 */
export function constructMetadata({
  title,
  description = siteConfig.description,
  path = "/",
  noIndex = false,
}: ConstructMetadataArgs = {}): Metadata {
  const fullTitle = title ? `${title} — ${siteConfig.name}` : siteConfig.title;
  const url = `${siteConfig.url}${path === "/" ? "" : path}`;

  return {
    title: fullTitle,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteConfig.name,
      type: "website",
      images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: fullTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [siteConfig.ogImage],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}
