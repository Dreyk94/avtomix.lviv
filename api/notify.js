// Vercel Serverless Function: POST /api/notify
// Приймає заявку з форми "Підбір авто" (та може використовуватись для інших форм)
// і пересилає її повідомленням у Telegram-бот.
//
// Налаштування (Vercel -> Project -> Settings -> Environment Variables):
//   TELEGRAM_BOT_TOKEN  — токен бота, який видає @BotFather
//   TELEGRAM_CHAT_ID    — id чату/групи/каналу, куди бот надсилає повідомлення

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {});
    const { name, phone, brand, model, budgetFrom, budgetTo, yearFrom, yearTo, comment, source } = body;

    if (!name || !phone) {
      res.status(400).json({ error: "Вкажіть ім'я та телефон" });
      return;
    }

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      res.status(500).json({ error: "Telegram не налаштовано на сервері (відсутні TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID)" });
      return;
    }

    const lines = [
      `🚗 Нова заявка: ${source || "Сайт Avto Mix"}`,
      `Ім'я: ${name}`,
      `Телефон: ${phone}`
    ];
    if (brand) lines.push(`Марка: ${brand}`);
    if (model) lines.push(`Модель: ${model}`);
    if (budgetFrom || budgetTo) lines.push(`Бюджет: ${budgetFrom || "0"}–${budgetTo || "?"} $`);
    if (yearFrom || yearTo) lines.push(`Рік: ${yearFrom || "?"}–${yearTo || "?"}`);
    if (comment) lines.push(`Коментар: ${comment}`);

    const text = lines.join("\n");

    const tgResponse = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text })
    });

    const data = await tgResponse.json();

    if (!data.ok) {
      res.status(502).json({ error: "Telegram відхилив повідомлення", details: data.description || null });
      return;
    }

    res.status(200).json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: "Внутрішня помилка сервера" });
  }
}
