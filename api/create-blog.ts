import type { VercelResponse } from '@vercel/node';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request, res: VercelResponse) {
  const rawBody = await req.text();
  const obj = JSON.parse(rawBody);
  try {
    await prisma.blog.create({
      data: {
        title: obj.title,
        content: obj.content,
        userId: obj.userId
      }
    })
    return new Response(JSON.stringify({
      message: 'ブログが正常に作成されました',
    }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('ブログ作成中にエラーが発生しました:', error);
    return new Response(JSON.stringify({ error: 'サーバーエラーが発生しました' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}