import { neon, type NeonQueryFunction } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

function getClient(): NeonQueryFunction<false, false> {
  const url = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!url) {
    throw new Error(
      'No database connection string found. Set DATABASE_URL (Neon) or POSTGRES_URL in Vercel Environment Variables.'
    );
  }
  return neon(url);
}

async function ensureSchema(sql: NeonQueryFunction<false, false>) {
  await sql`
    CREATE TABLE IF NOT EXISTS posts (
      id TEXT PRIMARY KEY,
      count INTEGER NOT NULL DEFAULT 0
    )
  `;
  await sql`DELETE FROM posts a USING posts b WHERE a.id = b.id AND a.ctid < b.ctid`;
  await sql`CREATE UNIQUE INDEX IF NOT EXISTS posts_id_unique ON posts (id)`;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  }

  try {
    const sql = getClient();
    await ensureSchema(sql);
    const rows = await sql`SELECT count FROM posts WHERE id = ${id}`;
    const count = Number(rows[0]?.count ?? 0);
    return NextResponse.json({ count }, { status: 200 });
  } catch (error: any) {
    console.error('GET /api/get error', error?.message || error);
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
