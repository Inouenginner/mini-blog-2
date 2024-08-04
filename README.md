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
| 状態管理               | zustand                               |

## 本番ドメイン

https://mini-blog-two-phi.vercel.app/

## エラーシューティング

P1010: User `johndoe` was denied access on the database `mydb.public`
↓

```wsl
ps aux | grep postgres
pkill postgres
```
