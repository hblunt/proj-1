import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";

if (!projectId) throw new Error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID");
if (!dataset) throw new Error("Missing NEXT_PUBLIC_SANITY_DATASET");
if (!apiVersion) throw new Error("Missing NEXT_PUBLIC_SANITY_API_VERSION");

console.log("Sanity Configuration:", {
  projectId,
  dataset,
  apiVersion,
});

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
  perspective: "published",
  stega: {
    enabled: false,
  },
});
