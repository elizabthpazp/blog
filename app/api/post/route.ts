import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const countParam = searchParams.get('count');
  const first = searchParams.get('first');

  if (!id) {
    return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  }

  const count = countParam ? parseInt(countParam, 10) : NaN;
  if (Number.isNaN(count) || count < 0) {
    return NextResponse.json({ error: 'Invalid count' }, { status: 400 });
  }

  try {
    // Asegurar que la tabla existe (Neon blog-bd)
    await sql`CREATE TABLE IF NOT EXISTS posts (id TEXT PRIMARY KEY, count INTEGER NOT NULL)`;

    // first es string "true"/"false" -> comparar estrictamente
    const isFirst = first === 'true';

    // Usar UPSERT para evitar carrera y error de duplicado
    // Si first=true intentamos INSERT, si falla por conflicto hacemos UPDATE
    let result;
    if (isFirst) {
      try {
        result = await sql`INSERT INTO posts (id, count) VALUES (${id}, ${count}) ON CONFLICT (id) DO UPDATE SET count = ${count}`;
      } catch (e) {
        // fallback a UPDATE si ON CONFLICT no disponible
        result = await sql`UPDATE posts SET count = ${count} WHERE id = ${id}`;
      }
    } else {
      result = await sql`INSERT INTO posts (id, count) VALUES (${id}, ${count}) ON CONFLICT (id) DO UPDATE SET count = ${count}`;
      // Si no hay fila afectada (postgres antiguo sin ON CONFLICT), intentar UPDATE
      // @ts-ignore rowCount puede no existir
      if ((result as any)?.rowCount === 0) {
        result = await sql`UPDATE posts SET count = ${count} WHERE id = ${id}`;
      }
    }

    return NextResponse.json({ result, id, count }, { status: 200 });
  } catch (error: any) {
    console.error('POST /api/post error', error);
    // No exponer stack en prod, pero devolver mensaje util
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
