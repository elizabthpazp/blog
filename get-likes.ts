import { sql, createPool } from "@vercel/postgres";

// Usar env var de Vercel/Neon (blog-bd). No hardcodear credenciales.
// Vercel expone POSTGRES_URL / DATABASE_URL para Neon. createPool usa env automáticamente si no se pasa connectionString.
const pool = (() => {
  const conn = process.env.POSTGRES_URL || process.env.DATABASE_URL || process.env.POSTGRES_URL_NON_POOLING;
  if (conn) return createPool({ connectionString: conn });
  // fallback a sql sin pool explícito (usa POSTGRES_URL internamente)
  return { sql } as any;
})();

export async function getLikes (id: string) { 
 const { rows } = await sql`SELECT count FROM posts WHERE id = ${id}`;
 console.log(rows)
 return rows;
}

export async function insertLikeSql (id: string, count: any) {    
    await sql`INSERT INTO posts (id, count) VALUES (${id}, ${count}) ON CONFLICT (id) DO UPDATE SET count = ${count}`; 
}
  
export async function updateLikeSql (id: string, count: any) {   
    await sql`UPDATE posts SET count = ${count} WHERE id = ${id}`; 
}

export async function getLikesApi(id: string) { 
    const res = await fetch(`/api/get?id=${encodeURIComponent(id)}`, {cache: "no-store"})
    if (!res.ok) {
      throw new Error('Failed to fetch data')
    } 
    return res.json()
  } 
