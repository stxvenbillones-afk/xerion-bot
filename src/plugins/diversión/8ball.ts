import cmd, { type CommandContext } from "../../commands/map.js";

const answers = [
  "🎱 Sí, definitivamente.",
  "🎱 No lo creo.",
  "🎱 Puede ser.",
  "🎱 Las señales apuntan a que sí.",
  "🎱 Pregunta de nuevo.",
  "🎱 Mejor no contar con eso.",
  "🎱 Todo parece indicar que sí.",
  "🎱 No está claro todavía.",
];

cmd.add({
  name: "8ball",
  alias: ["bola8"],
  category: ["diversión"],
  desc: "Responde una pregunta al azar.",

  async run({ m, text }: CommandContext) {
    if (!text) {
      return m.reply("🎱 Escribe una pregunta después de .8ball");
    }

    const answer = answers[Math.floor(Math.random() * answers.length)];

    await m.reply(`🎱 𝗠𝗔𝗚𝗜𝗖 𝟴 𝗕𝗔𝗟𝗟\n\n${answer}`);
  },
});