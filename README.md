# 找找咖啡

## 簡介

這是一個咖啡廳推薦平台，可以根據使用者輸入的搜尋條件尋找咖啡廳，並提供咖啡廳的詳細資訊，供使用者使用。
使用者可以使用網站的登入/註冊功能，登入後可以收藏喜歡的咖啡廳，在咖啡廳底下留下留言及評論，並在個人頁面查看收藏、留言的咖啡廳。

### 新功能：Gemini AI 搜尋

現在，我們整合了 Google Gemini AI 功能，可以幫助使用者更智能地搜尋咖啡廳：

- AI 可以根據使用者輸入的關鍵字、標籤和評分生成更精確的搜尋條件
- AI 會分析搜尋結果，提供咖啡廳推薦和分析
- 使用者可以透過搜尋欄旁的 AI 開關輕鬆啟用/停用此功能

## 開啟專案
1. 設定環境變數
   - 複製 `.env.example` 到 `.env`
   - 填入您的 Google Maps API 金鑰
   - 填入您的 Gemini AI API 金鑰（可從 [Google AI Studio](https://aistudio.google.com/) 獲取）

2. 安裝依賴
```bash
yarn install
```

3. build 專案
```bash
PASSWORD=YOUR_PASSWORD yarn build
```

4. 開發模式
```bash
PASSWORD=YOUR_PASSWORD yarn dev
```

## 使用技術
1. SCSS
2. bootstrap 5
3. React
4. Redux Toolkit
5. Next.js
6. MongoDB Atlas
7. Prisma
8. Google Maps API
9. Google Gemini AI
