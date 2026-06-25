import { createClient, type SanityClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

let cachedClient: SanityClient | null = null;

export function getWriteClient(): SanityClient {
  if (cachedClient) return cachedClient;

  const token = process.env.SANITY_WRITE_TOKEN;
  if (!token) {
    throw new Error(
      "Missing SANITY_WRITE_TOKEN env var (server-only, never NEXT_PUBLIC_-prefixed).",
    );
  }

  cachedClient = createClient({
    projectId,
    dataset,
    apiVersion,
    token,
    useCdn: false,
  });
  return cachedClient;
}
