import { NextResponse } from 'next/server';
import { client } from '@/lib/sanity/client';
import { LATEST_NEWS_QUERY } from '@/lib/sanity/queries';

export async function GET() {
  try {
    const data = await client.fetch(LATEST_NEWS_QUERY, {}, { next: { revalidate: 3600 } });
    return NextResponse.json(data ?? []);
  } catch {
    return NextResponse.json([]);
  }
}
