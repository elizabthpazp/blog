export async function getLikesPage(slug: any): Promise<any> {
  const res = await fetch(
    `https://blog-elizabthpazp.vercel.app/api/get?id=${slug}`,
    {
      cache: 'no-cache',
      method: "GET",
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    }
  );
  const data = await res.json();
  return data?.result?.rows[0]?.count;
}
