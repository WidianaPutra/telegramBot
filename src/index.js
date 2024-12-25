import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";
import axios from "axios";
dotenv.config();

const myToken = process.env.TELEGRAM_TOKEN;

const bot = new TelegramBot(myToken, { polling: true });

bot.on("message", async (callback) => {
  const id = callback.from.id;
  const text = callback.text;

  console.table({
    name: callback.chat.first_name + callback.chat.last_name,
    question: text,
  });

  const botMenu =
    "Menu \n 1. ?chat Rumus luas segitiga\n 2. ?img Buatkan saya gambar anak kucing";

  if (text.startsWith("?help") || text.startsWith("help")) {
    return bot.sendMessage(id, botMenu);
  } else if (text.startsWith("?chat")) {
    // chat
    let content = text.replace("?chat", "").trim();

    if (content.length > 0) {
      const response = await axios.post(
        `${process.env.BASE_URL_AI_API}/chat?key=${process.env.API_KEY}`,
        {
          role: "user",
          content: content,
        },
        {
          headers: {
            Authorization: process.env.AUTHORIZATION_TOKEN,
          },
        }
      );
      return bot.sendMessage(id, response.data.message[1].content);
    }
  } else {
    return bot.sendMessage(id, botMenu);
  }
});
