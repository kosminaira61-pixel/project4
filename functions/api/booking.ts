export const onRequestPost = async (context: any) => {
  const { BOT_TOKEN, CHAT_ID } = context.env;

  const data = await context.request.json();

  const text = `
🚗 Нова заявка

👤 Ім'я: ${data.name}
📞 Телефон: ${data.phone}
📅 Дата: ${data.date}
🕒 Час: ${data.time}
💬 Коментар: ${data.comment || "-"}
`;

  const response = await fetch(
    `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text,
      }),
    }
  );

  if (!response.ok) {
    return new Response("Telegram error", { status: 500 });
  }

  return Response.json({ success: true });
};