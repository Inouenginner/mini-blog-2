import type { VercelResponse } from "@vercel/node";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getPaginatedBlogs(userId: string, page: number, limit: number) {
  const skip = (page - 1) * limit;

  const [blogs, total] = await prisma.$transaction([
    prisma.blog.findMany({
      where: {
        userId: userId,
      },
      skip: skip,
      take: limit,
      orderBy: {
        createdAt: "desc", // 最新の投稿から順に取得
      },
    }),
    prisma.blog.count({
      where: {
        userId: userId,
      },
    }),
  ]);

  return {
    blogs,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const params = new URLSearchParams(url.search);
  const page = parseInt(params.get("page") || "1"); // 文字列 "Jonathan" です
  const limit = parseInt(params.get("limit") || "20");
  const userId = "1";

  try {
    const result = await getPaginatedBlogs(userId, page, limit);
    return new Response(JSON.stringify(result), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("ブログ取得中にエラーが発生しました:", error);
    return new Response(JSON.stringify({ error: "サーバーエラーが発生しました" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function POST(req: Request, res: VercelResponse) {
  const rawBody = await req.text();
  const obj = JSON.parse(rawBody);
  try {
    await prisma.blog.create({
      data: {
        title: obj.title,
        content: obj.content,
        userId: obj.userId,
      },
    });
    return new Response(
      JSON.stringify({
        message: "ブログが正常に作成されました",
      }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("ブログ作成中にエラーが発生しました:", error);
    return new Response(JSON.stringify({ error: "サーバーエラーが発生しました" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
