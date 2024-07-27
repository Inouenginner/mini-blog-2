# mini-blog-2

## 使用技術

| 対象          | 使用技術                                      |
| ------------- | ------------------------------------------- |
| フロントエンド | React, shadcn/ui + tailwindcss, Astro        |
| 認証          | Vercel                                       |
| ホスティング  | Vercel                                        |
| DB 周り       | Vercel Postgres, Prisma                      |
| バックエンド  | Vercel Serverless Functions                   |
| バリデーション | zod                                           |
| パッケージマネージャー | npm                                    |
| ビルド        | esbuild                                       |
| linter+formatter | biome                                     |
| 状態管理      | zustand or jotai                              |


## 立ち上げコマンド

```windows
docker compose up -d
vercel dev
npx prisma migrate dev
```

## 本番ドメイン
https://mini-blog-two-phi.vercel.app/