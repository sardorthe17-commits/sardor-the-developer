# sardor-the-developer — client

React + TypeScript + Vite bilan qurilgan portfolio/rezyume sayti.
Ko'rinishi VS Code (Dark+ tema) ga o'xshatilgan: chapda faylllar
daraxti o'rniga **loyihalar ro'yxati**, o'ngda esa tanlangan loyiha
"fayl" sifatida, hujjat (README) ko'rinishida ochiladi.

## Loyihaning tuzilishi

```
src/
  api/client.ts        API bilan gaplashadigan fetch funksiyalari
  context/AuthContext   Admin login holatini boshqaradi
  components/           Barcha UI qismlari (Sidebar, Editor, Modallar...)
  App.tsx               Hammasini bir joyga yig'adi
  index.css             VS Code rang sxemasi + barcha stillar
```

## Ishga tushirish

1. Backend (NestJS) ni alohida ishga tushiring (masalan `http://localhost:3000`).
2. Ushbu papkada:

   ```bash
   pnpm install       # yoki: npm install
   cp .env.example .env
   # .env faylida VITE_API_URL ni backend manzilingizga moslang
   pnpm run dev       # yoki: npm run dev
   ```

3. Brauzerda `http://localhost:5173` ni oching.

## Backend bilan bog'liq muhim eslatma

Frontend backendning quyidagi marshrutlariga so'rov yuboradi (chunki
`LinksController` da `@Controller()` prefiksisiz, ya'ni root ostida):

- `GET /` — barcha loyihalarni olish
- `POST /` — yangi loyiha qo'shish
- `PUT /:id` — loyihani yangilash
- `DELETE /:id` — loyihani o'chirish
- `POST /login` — admin sifatida kirish (`{ login, parol }`)

**Diqqat:** hozirgi holatda `src/app.module.ts` da `LinkModule` va
`UserModule` `imports` ro'yxatiga qo'shilmagan — shu sababli
backend hali bu marshrutlarni ishlatmaydi. Sayt to'liq ishlashi
uchun ularni `AppModule`ning `imports: [...]` qatoriga qo'shishingiz kerak bo'ladi.

Yana bir eslatma: hozircha `POST/PUT/DELETE` so'rovlariga hech qanday
himoya (token/guard) yo'q — login faqat frontendda "admin" tugmalarini
ko'rsatish/yashirish uchun ishlatiladi. Ma'lumotlarni chinakam himoya
qilish uchun backendga NestJS Guard (masalan JWT) qo'shish tavsiya
etiladi.

## Ma'lumot modeli (backenddagi Link)

```ts
{
  _id: string
  site_name: string   // loyihaning nomi (chapda ko'rinadi)
  link_url: string     // saytga havola
  info: string          // sayt haqida qisqacha tavsif
}
```
