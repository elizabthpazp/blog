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
    await sql`CREATE TABLE IF NOT EXISTS posts (id TEXT PRIMARY KEY, count INTEGER NOT NULL)`;

    const result = await sql`SELECT count FROM posts WHERE id = ${id}`;

    // result.rows[0]?.count puede ser undefined si no existe
    return NextResponse.json({ result }, { status: 200 });
  } catch (error: any) {
    console.error('GET /api/get error', error);
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
