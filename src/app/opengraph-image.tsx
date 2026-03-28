import { ImageResponse } from "next/og";
import { SITE } from "@/lib/constants";

export const alt = SITE.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1d5590 0%, #4b9fda 100%)",
          color: "white",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div style={{ fontSize: 64, fontWeight: 700 }}>Viajar Mejor</div>
          <div style={{ fontSize: 32, opacity: 0.95 }}>{SITE.tagline}</div>
          <div
            style={{
              fontSize: 22,
              marginTop: 24,
              opacity: 0.9,
              maxWidth: 800,
              textAlign: "center",
            }}
          >
            {SITE.description}
          </div>
        </div>
      </div>
    ),
    size
  );
}
