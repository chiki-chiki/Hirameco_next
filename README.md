# 🌱 hirameco - INFP向けひらめきストックアプリ

「ひらめき」を自由に書き留め、育てるためのシンプルなアイデア管理ツールです。  
自分だけのアイデアをストックし、必要に応じて「ささやき」から刺激を受け取ることができます。

---

## ✨ 特徴

- ✅ アイデアの登録・編集・削除（CRUD機能）
- ✅ Supabase連携によるデータベース保存
- ✅ Google認証によるログイン機能
- ✅ タグ付け機能（カンマ区切りで複数入力）
- ✅ タグによるリアルタイム検索・フィルタリング
- ✅ Wikipediaからランダムな「ささやき」（記事タイトル）を取得
- ✅ Next.js + TypeScript + Tailwind CSS使用

---

## 🚀 使用技術

- フレームワーク：Next.js（App Router構成）
- ライブラリ：React
- 言語：TypeScript
- デザイン：Tailwind CSS
- バックエンドサービス：Supabase（認証＋DB）
- デプロイ：Vercel

---

## 🛠️ セットアップ方法

```bash
git clone https://github.com/your-account/hirameko-next.git
cd hirameko-next
npm install
npm run dev
```

- .env.local に下記を設定
  - NEXT_PUBLIC_SUPABASE_URL
  - NEXT_PUBLIC_SUPABASE_ANON_KEY

---

## 🌬️ ささやき機能について

Wikipedia APIを利用し、ランダムに選ばれた記事タイトルを取得しています。  
知らない単語や新しい概念に自然に出会い、アイデアに新しい風を吹き込む仕組みです。

- ボタンを押すと Wikipedia からランダムな記事タイトルを取得
- タイトルはクリックでき、Wikipedia記事を直接参照可能
- ひらめきが必要なときに「ささやき」として優しく刺激を与えます

---

## 🚀 今後の展望

- 🎨 Tailwind CSSでUIデザインをさらに洗練し、癒しとポップさを両立させる
- 🧩 コンポーネントの再利用性を高め、メンテナンス性を向上させる
- 🛠️ テストコードの導入（Jest / React Testing Library）による信頼性向上

---

## 📄 ライセンス・注意点

- 本プロジェクトは個人ポートフォリオ用です。
- Supabaseの無料プラン内で運用しています。
- Wikipedia APIは非営利・個人利用の範囲で利用しています。
- 取得するデータに対して商用利用は行っていません。
