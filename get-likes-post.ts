export async function getLikesPage(slug: any): Promise<number> {
  try {
    const url = `/api/get?id=${encodeURIComponent(slug)}`;
    const res = await fetch(url, {
      cache: 'no-store',
      method: 'GET',
    });
    if (!res.ok) return 0;
    const data = await res.json();
    const count = data?.count;
    if (count === undefined || count === null) return 0;
    return Number(count);
  } catch {
    return 0;
  }
}
