/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { siteConfig } from "@/app/seo";

export const alt = "Let's Love private couple app landing page preview";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  const appIcon = await readFile(join(process.cwd(), "public", "logo.png"));
  const appIconSrc = `data:image/png;base64,${appIcon.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          position: "relative",
          width: "100%",
          height: "100%",
          overflow: "hidden",
          background:
            "linear-gradient(135deg, #fff7fb 0%, #f5fbff 46%, #f8f7ff 100%)",
          color: "#0f172a",
          fontFamily: "Arial, sans-serif",
          padding: "54px",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: "-70px",
            top: "70px",
            width: "320px",
            height: "320px",
            borderRadius: "999px",
            background: "rgba(255, 79, 123, 0.18)",
            filter: "blur(8px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: "-90px",
            bottom: "-80px",
            width: "390px",
            height: "390px",
            borderRadius: "999px",
            background: "rgba(44, 174, 186, 0.2)",
            filter: "blur(10px)",
          }}
        />
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "46px",
            width: "100%",
            height: "100%",
            border: "1px solid rgba(255, 255, 255, 0.86)",
            borderRadius: "48px",
            background: "rgba(255, 255, 255, 0.84)",
            boxShadow: "0 34px 90px rgba(15, 23, 42, 0.14)",
            padding: "54px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%", flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "78px",
                  height: "78px",
                  borderRadius: "24px",
                  background: "#ffffff",
                  boxShadow: "0 18px 38px rgba(255, 79, 123, 0.24)",
                  overflow: "hidden",
                }}
              >
                <img
                  src={appIconSrc}
                  alt=""
                  width="104"
                  height="104"
                  style={{
                    width: "104px",
                    height: "104px",
                    objectFit: "cover",
                  }}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ fontSize: "34px", fontWeight: 900 }}>{siteConfig.name}</div>
                <div style={{ color: "#64748b", fontSize: "21px", fontWeight: 700 }}>
                  Private couple space
                </div>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "18px", maxWidth: "690px" }}>
              <div
                style={{
                  display: "flex",
                  alignSelf: "flex-start",
                  border: "1px solid rgba(255, 79, 123, 0.24)",
                  borderRadius: "999px",
                  background: "#ffffff",
                  color: "#be123c",
                  fontSize: "20px",
                  fontWeight: 900,
                  padding: "11px 16px",
                }}
              >
                Built for exactly two people
              </div>
              <div style={{ fontSize: "70px", fontWeight: 900, lineHeight: 0.98 }}>
                Your private home for daily love.
              </div>
              <div style={{ color: "#475569", fontSize: "28px", fontWeight: 700, lineHeight: 1.35 }}>
                Chat, memories, goals, date plans, love letters, and daily rituals in one intimate app.
              </div>
            </div>

            <div style={{ display: "flex", gap: "12px" }}>
              {["Private chat", "Shared gallery", "Date plans"].map((item) => (
                <div
                  key={item}
                  style={{
                    border: "1px solid rgba(203, 213, 225, 0.86)",
                    borderRadius: "999px",
                    background: "#ffffff",
                    color: "#334155",
                    fontSize: "19px",
                    fontWeight: 800,
                    padding: "12px 18px",
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "350px", height: "100%", position: "relative" }}>
            <div
              style={{
                position: "absolute",
                left: "20px",
                top: "60px",
                display: "flex",
                flexDirection: "column",
                width: "178px",
                height: "330px",
                border: "7px solid #ffffff",
                borderRadius: "34px",
                background: "#fff6f9",
                boxShadow: "0 24px 54px rgba(15, 23, 42, 0.16)",
                padding: "18px",
                transform: "rotate(-7deg)",
              }}
            >
              <div style={{ width: "56px", height: "8px", borderRadius: "999px", background: "#fecdd3", margin: "0 auto 20px" }} />
              <div style={{ display: "flex", gap: "8px", marginBottom: "14px" }}>
                <div style={{ width: "42px", height: "42px", borderRadius: "14px", background: "#ff4f7b" }} />
                <div style={{ display: "flex", flexDirection: "column", gap: "7px", flex: 1 }}>
                  <div style={{ height: "10px", borderRadius: "999px", background: "#0f172a" }} />
                  <div style={{ width: "76px", height: "9px", borderRadius: "999px", background: "#fda4af" }} />
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <div style={{ height: "56px", borderRadius: "18px", background: "#ffffff" }} />
                <div style={{ height: "56px", borderRadius: "18px", background: "#ffe4eb" }} />
                <div style={{ height: "56px", borderRadius: "18px", background: "#ffffff" }} />
              </div>
            </div>
            <div
              style={{
                position: "absolute",
                right: "12px",
                top: "20px",
                display: "flex",
                flexDirection: "column",
                width: "196px",
                height: "370px",
                border: "7px solid #ffffff",
                borderRadius: "36px",
                background: "#f0fdff",
                boxShadow: "0 30px 62px rgba(15, 23, 42, 0.18)",
                padding: "18px",
                transform: "rotate(5deg)",
              }}
            >
              <div style={{ width: "62px", height: "8px", borderRadius: "999px", background: "#bae6fd", margin: "0 auto 22px" }} />
              <div style={{ height: "100px", borderRadius: "24px", background: "linear-gradient(135deg, #ff4f7b, #2caeba)", marginBottom: "14px" }} />
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <div style={{ height: "14px", borderRadius: "999px", background: "#0f172a" }} />
                <div style={{ width: "128px", height: "10px", borderRadius: "999px", background: "#67e8f9" }} />
                <div style={{ width: "92px", height: "10px", borderRadius: "999px", background: "#fda4af" }} />
                <div style={{ height: "70px", borderRadius: "20px", background: "#ffffff" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
