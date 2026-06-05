/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = {
  width: 256,
  height: 256,
};

export const contentType = "image/png";

export default async function Icon() {
  const appIcon = await readFile(join(process.cwd(), "public", "logo.png"));
  const appIconSrc = `data:image/png;base64,${appIcon.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          background: "#ffffff",
          overflow: "hidden",
        }}
      >
        <img
          src={appIconSrc}
          alt=""
          width="340"
          height="340"
          style={{
            width: "340px",
            height: "340px",
            objectFit: "cover",
          }}
        />
      </div>
    ),
    size,
  );
}
