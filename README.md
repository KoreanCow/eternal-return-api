This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

with eternal return api

---

1. 시즌 정보 스토어 저장 -> 컨텍스트 코드 부분 자체에서 통신을 진행해서 저장
   왜?
   -> 현재 큰 규모의 프로젝트라 생각 되지않아 컨텍스트에서 직접 통신하고 저장하는 방식이
   간단하고 효율적이라 생각함
   --> 유지보수의 용이
2. 랭킹 부분
   useRanking 훅을 이용해 1000개의 랭킹 데이터를 가져올 때, 서버에서 이미 데이터를 처리해 클라이언트에 전달 하므로 클라이언트에서 추가적인 데이터 처리 부담이 적어짐
3. 데이터 페칭
   API요청을 통해 데이터를 받아올때 대부분 같은 형태로 받기때문에
   훅의 파라미터를 주소, 타입 등을 주어 코드의 재사용성을 높임

\*\* 1. [nickname]/page.tsx
데이터 페칭 및 로딩관리를 Suspense, Fallback 을 이용하여 관리하기
-> useUserNum훅의 값을 Promise의 형태로 반환
-> UserInfo의 프롭스를 Promise 형태로 전달
-> Promise Result 의 값을 가져오는데 실패함
이 부분에서 추후 리팩토링이 필요함

---

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
