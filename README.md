# graphql-sample-app

## GraphQLとは
- Facebookが開発したAPIのクエリ言語
- クライアントが必要とするデータを定義して、サーバーから必要なデータのみを取得することができる

## RestAPIとの違い
- RestAPIでは、エンドポイントごとにデータを取得する必要がある
  - 例えば、ユーザー情報を取得する場合は、`/users`というエンドポイントにアクセスする必要がある
  - そのため、ユーザー情報の取得に必要なデータが複数ある場合は、複数回のリクエストが必要になる
- GraphQLでは、クライアントが必要とするデータを定義して、サーバーから必要なデータのみを取得することができる
  - 例えば、ユーザー情報を取得する場合は、`/graphql`というエンドポイントにアクセスする必要がある
  - そのため、ユーザー情報の取得に必要なデータが複数ある場合でも、1回のリクエストで取得することができる

## Appollo とは
- GraphQLのクライアント/サーバーの実装を提供するライブラリ
- クライアント側でGraphQLのクエリを実行することができる
- サーバー側でGraphQLのスキーマを定義することができる

## Get Start
- スキーマの定義
  - スキーマは、GraphQLのクエリの定義を行う
- リゾルバの定義
  - リゾルバは、スキーマに定義したクエリの実行を行う

## Prisma
- 初期化
```bash
$ npx prisma init
```

- スキーマ定義
schema.prisma
```prisma
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

model Link {
  id          Int      @id @default(autoincrement())
  createdAt   DateTime @default(now())
  url         String
  description String
}
```

- マイグレーション
```bash
$ npx prisma migrate dev --name init
```

- クライアントの生成
```bash
$ npx prisma generate
```