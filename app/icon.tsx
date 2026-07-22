import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          fontSize: 20,
          fontWeight: 700,
          color: "#0B0A08",
          background: "linear-gradient(135deg, #D4AF37, #B8860B)",
        }}
      >
        H
      </div>
    ),
    { ...size }
  );
}
