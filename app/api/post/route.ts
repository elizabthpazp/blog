import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

function getClient() {
  const url = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!url) {
    throw new Error(
      'No database connection string found. Set DATABASE_URL (Neon) or POSTGRES_URL in Vercel Environment Variables.'
    );
  }
  return neon(url);
}

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  }

  try {
    const sql = getClient();
    await sql`CREATE TABLE IF NOT EXISTS posts (id TEXT PRIMARY KEY, count INTEGER NOT NULL DEFAULT 0)`;

    const rows = await sql`
      INSERT INTO posts (id, count) VALUES (${id}, 1)
      ON CONFLICT (id) DO UPDATE SET count = posts.count + 1
      RETURNING count
    `;

    const newCount = Number(rows[0]?.count ?? 0);
    return NextResponse.json({ ok: true, count: newCount }, { status: 200 });
  } catch (error: any) {
    console.error('POST /api/post error', error?.message || error);
    return NextResponse.json(
      { error: error?.message || 'DB error', code: error?.code || null },
      { status: 500 }
    );
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
