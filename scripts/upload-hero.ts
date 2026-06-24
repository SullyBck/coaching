/**
 * One-time: uploads public/images/hero-coaching.jpg to Sanity and sets it
 * as the homePage document's ambiancePhoto field.
 * Usage: SANITY_WRITE_TOKEN=... npx tsx scripts/upload-hero.ts
 */
import fs from "node:fs";
import path from "node:path";
import { createClient } from "next-sanity";

const token = process.env.SANITY_WRITE_TOKEN;
if (!token) {
  console.error("Missing SANITY_WRITE_TOKEN env var.");
  process.exit(1);
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2026-06-24",
  token,
  useCdn: false,
});

async function main() {
  const filePath = path.join(process.cwd(), "public/images/hero-coaching.jpg");
  console.log("Uploading hero-coaching.jpg...");
  const asset = await client.assets.upload("image", fs.readFileSync(filePath), {
    filename: "hero-coaching.jpg",
    contentType: "image/jpeg",
  });
  console.log("Uploaded. Patching homePage...");

  await client
    .patch("homePage")
    .set({
      ambiancePhoto: {
        _type: "image",
        asset: { _type: "reference", _ref: asset._id },
      },
    })
    .commit();

  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
