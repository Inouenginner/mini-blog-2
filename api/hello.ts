export function GET(request: Request) {
    return new Response(`Hello from vercel`);
    // return new Response(`Hello from ${process.env.VERCEL_REGION}`);
  }