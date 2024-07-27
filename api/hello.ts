export function GET(request: Request) {
    console.log(request)
    return new Response(`Hello from vercel`);
    // return new Response(`Hello from ${process.env.VERCEL_REGION}`);
  }