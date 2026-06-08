import { createClient } from 'next-sanity';

let cachedClient: ReturnType<typeof createClient> | null = null;
let cachedPreviewClient: ReturnType<typeof createClient> | null = null;

function getClientInstance() {
  if (!cachedClient) {
    cachedClient = createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'dummy-id',
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
      apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2024-01-01',
      useCdn: process.env.NODE_ENV === 'production',
    });
  }
  return cachedClient;
}

function getPreviewClientInstance() {
  if (!cachedPreviewClient) {
    cachedPreviewClient = createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'dummy-id',
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
      apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2024-01-01',
      useCdn: false,
      token: process.env.SANITY_API_READ_TOKEN,
      perspective: 'previewDrafts',
    });
  }
  return cachedPreviewClient;
}

export const client = new Proxy({} as ReturnType<typeof createClient>, {
  get(target, prop, receiver) {
    return Reflect.get(getClientInstance(), prop, receiver);
  }
});

/**
 * A server-side client that reads draft content.
 * Requires a read token set in SANITY_API_READ_TOKEN.
 */
export const previewClient = new Proxy({} as ReturnType<typeof createClient>, {
  get(target, prop, receiver) {
    return Reflect.get(getPreviewClientInstance(), prop, receiver);
  }
});
