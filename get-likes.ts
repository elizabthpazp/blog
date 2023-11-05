// import 'server-only' 
import { sql, postgresConnectionString, createPool } from "@vercel/postgres"; 

//const pooledConnectionString = postgresConnectionString('pool');
//const directConnectionString = postgresConnectionString('direct');
  
const pool = createPool({
 connectionString: "postgres://default:FB8mhl1KZunE@ep-lingering-leaf-05623124-pooler.us-east-1.postgres.vercel-storage.com:5432/verceldb"
});

export async function getLikes (id: string) { 
 const { rows } = await sql`SELECT count FROM posts WHERE id = ${id}`;
 console.log(rows)
 return rows;
}

export async function insertLikeSql (id: string, count: any) {    
    await pool.sql`INSERT INTO posts (id, count) VALUES (${id}, ${count})`; 
}
  
export async function updateLikeSql (id: string, count: any) {   
    await pool.sql`UPDATE posts SET count = ${count} WHERE id = ${id}`; 
}

export async function getLikesApi(id: string) { 
    // const res = await fetch(`https://blog-elizabthpazp.vercel.app/api/get?id=${id}`)
    // console.log(res)
    // // The return value is *not* serialized
    // // You can return Date, Map, Set, etc.
   
    // if (!res.ok) {
    //   // This will activate the closest `error.js` Error Boundary
    //   throw new Error('Failed to fetch data')
    // } 
    // return res.json()
  } 
  