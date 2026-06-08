/**
 * Sanity Studio embedded at /admin
 * Access this route to manage all CMS content.
 */
import { Studio } from './Studio';
import { metadata as studioMetadata, viewport as studioViewport } from 'next-sanity/studio';
import type { Metadata, Viewport } from 'next';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  ...studioMetadata,
  title: 'Loading Studio...',
};

export const viewport: Viewport = {
  ...studioViewport,
  interactiveWidget: 'resizes-content',
};

export default function StudioPage() {
  return <Studio />;
}
