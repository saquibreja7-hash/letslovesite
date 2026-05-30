import { ImageResponse } from "next/og";

import { siteConfig } from "@/app/seo";

export const alt = "Let's Love private couple app landing page preview";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          background: "#fbfdff",
          color: "#0f172a",
          fontFamily: "Arial, sans-serif",
          padding: "58px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            height: "100%",
            border: "2px solid #e2e8f0",
            borderRadius: "42px",
            background: "#ffffff",
            padding: "56px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "74px",
                height: "74px",
                borderRadius: "22px",
                background: "#ff4f7b",
                color: "#ffffff",
                fontSize: "34px",
                fontWeight: 900,
              }}
            >
              LL
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: "34px", fontWeight: 900 }}>{siteConfig.name}</div>
              <div style={{ color: "#64748b", fontSize: "21px", fontWeight: 700 }}>
                Private couple space
              </div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "860px" }}>
            <div
              style={{
                color: "#ff4f7b",
                fontSize: "24px",
                fontWeight: 900,
                textTransform: "uppercase",
                letterSpacing: "2px",
              }}
            >
              Android-first relationship app
            </div>
            <div style={{ fontSize: "72px", fontWeight: 900, lineHeight: 1.04 }}>
              Chat, memories, goals, dates, and daily connection.
            </div>
            <div style={{ color: "#475569", fontSize: "28px", fontWeight: 700, lineHeight: 1.35 }}>
              A private app built for exactly two people to stay close from anywhere.
            </div>
          </div>

          <div style={{ display: "flex", gap: "14px" }}>
            {["Private chat", "Shared gallery", "Date plans", "Daily questions"].map((item) => (
              <div
                key={item}
                style={{
                  border: "1px solid #e2e8f0",
                  borderRadius: "999px",
                  color: "#334155",
                  fontSize: "20px",
                  fontWeight: 800,
                  padding: "14px 20px",
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
