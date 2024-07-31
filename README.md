# mini-blog-2

## 立ち上げ方

```wsl
docker compose up -d
vercel dev
npx prisma migrate dev
```

## 使用技術

| 対象                   | 使用技術                              |
| ---------------------- | ------------------------------------- |
| フロントエンド         | React, shadcn/ui + tailwindcss, Astro |
| ホスティング           | Vercel                                |
| DB 周り                | Vercel Postgres, Prisma               |
| バックエンド           | Vercel Serverless Functions           |
| パッケージマネージャー | npm                                   |

## 本番ドメイン

https://mini-blog-two-phi.vercel.app/
