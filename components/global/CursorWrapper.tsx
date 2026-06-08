'use client';

import dynamic from 'next/dynamic';

// Lazy-load the cursor only on the client — never SSR'd.
// This wrapper must be a Client Component so that ssr:false is valid.
const CustomCursor = dynamic(() => import('./CustomCursor'), { ssr: false });

export default function CursorWrapper() {
  return <CustomCursor />;
}
