import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  }

  try {
    await sql`CREATE TABLE IF NOT EXISTS posts (id TEXT PRIMARY KEY, count INTEGER NOT NULL DEFAULT 0)`;

    const result = await sql`
      INSERT INTO posts (id, count) VALUES (${id}, 1)
      ON CONFLICT (id) DO UPDATE SET count = posts.count + 1
      RETURNING count
    `;

    const newCount = Number(result.rows[0]?.count ?? 0);
    return NextResponse.json({ ok: true, count: newCount }, { status: 200 });
  } catch (error: any) {
    console.error('POST /api/post error', error?.message || error);
    return NextResponse.json({ error: error?.message || 'DB error' }, { status: 500 });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
