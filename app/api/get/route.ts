import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  }

  try {
    await sql`CREATE TABLE IF NOT EXISTS posts (id TEXT PRIMARY KEY, count INTEGER NOT NULL DEFAULT 0)`;

    const result = await sql`SELECT count FROM posts WHERE id = ${id}`;
    const count = Number(result.rows[0]?.count ?? 0);
    return NextResponse.json({ count }, { status: 200 });
  } catch (error: any) {
    console.error('GET /api/get error', error?.message || error);
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
