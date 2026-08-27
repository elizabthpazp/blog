export async function getLikesPage(slug: any): Promise<number | undefined> {
  try {
    const url = `/api/get?id=${encodeURIComponent(slug)}`;
    const res = await fetch(url, {
      cache: 'no-store',
      method: "GET",
    });
    if (!res.ok) return undefined;
    const data = await res.json();
    const count = data?.result?.rows?.[0]?.count ?? data?.count ?? data?.result?.[0]?.count;
    if (count === undefined || count === null) return undefined;
    return Number(count);
  } catch {
    return undefined;
  }
}
