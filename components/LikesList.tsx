"use client"  

const getLikesPage = async (slug: any) => {
  const res = await fetch(`https://blog-elizabthpazp.vercel.app/api/get?id=${slug}`, {
    cache: 'force-cache' || 'no-cache',
    method: "GET",
    mode: "cors",
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    } })
  const data = await res.json() 
 
  return data?.result?.rows[data?.result?.rows?.length-1]?.count;
};

export default async function LikeCount({ slug }: {slug: any})
{   
  const likes = await getLikesPage(slug);
  if(likes!=null && likes!=undefined)
  return ( 
    <div className="float-right" style={{marginTop: "-45px", zoom: "70%"}}> 
     {/* @ts-expect-error */}
     <LikeCount count={likes} title={slug} animation={false}></LikeCount>
    </div>
  )
}
 
