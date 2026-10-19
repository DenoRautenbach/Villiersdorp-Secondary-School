import { createClient } from 'next-sanity';

/**
 * Server-only Sanity client with write access.
 * Requires SANITY_API_WRITE_TOKEN (an "Editor" token from sanity.io/manage).
 * Never import this from a Client Component.
 */
export function getWriteClient() {
  const token = process.env.SANITY_API_WRITE_TOKEN;
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  if (!token || !projectId || projectId === 'your_project_id_here') return null;

  return createClient({
    projectId,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2024-01-01',
    useCdn: false,
    token,
  });
}
