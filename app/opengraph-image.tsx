import { ImageResponse } from "next/og";

import { OgImageContent, ogImageSize } from "@/lib/og";

export const runtime = "edge";
export const alt = "Halisako — Transform Ideas into Experiences";
export const size = ogImageSize;
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(<OgImageContent />, { ...size });
}
