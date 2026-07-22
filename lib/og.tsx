import { siteConfig } from "@/lib/site-config";

/**
 * Shared JSX tree for the generated Open Graph / Twitter card image.
 * Kept out of the app/ metadata-file-convention files so it isn't
 * mistaken for a route segment, and so opengraph-image.tsx and
 * twitter-image.tsx (which Next.js requires as separate files) can't
 * drift from each other.
 */
export function OgImageContent() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0B0A08",
        backgroundImage:
          "radial-gradient(circle at 50% 0%, #4A3D1A 0%, #0B0A08 60%)",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 24,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 84,
            height: 84,
            borderRadius: "50%",
            fontSize: 44,
            fontWeight: 700,
            color: "#0B0A08",
            background: "linear-gradient(135deg, #D4AF37, #B8860B)",
          }}
        >
          H
        </div>
        <div
          style={{
            fontSize: 76,
            fontWeight: 600,
            color: "#F5F1E8",
            letterSpacing: "-0.02em",
          }}
        >
          {siteConfig.name}
        </div>
      </div>
      <div
        style={{
          marginTop: 28,
          fontSize: 30,
          color: "#D4AF37",
          letterSpacing: "0.01em",
        }}
      >
        Creation through Intelligent Orchestration
      </div>
    </div>
  );
}

export const ogImageSize = { width: 1200, height: 630 };
