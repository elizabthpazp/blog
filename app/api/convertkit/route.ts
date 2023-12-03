export async function POST(req: Request) {
  const body = await req.json();
  const email = body.email;

  // const res = await fetch(
  //   `https://api.convertkit.com/v3/forms/XEOWgTOLCclaQCCm02af8Q/subscribe`,
  //   {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json; charset=utf-8",
  //     },
  //     body: JSON.stringify({
  //       api_secret: "Lf-b6govKq12pbU88-vJOlaiFj4N-GRfj5MHIXOFv-U",
  //       email,
  //     }),
  //   }
  // );
  
  // const data = await res.json();
  
  return email;
}
