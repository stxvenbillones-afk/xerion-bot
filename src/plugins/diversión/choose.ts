import cmd, { type CommandContext } from "../../commands/map.js";

cmd.add({
  name: "choose",
  alias: ["elegir"],
  category: ["diversión"],
  desc: "Elige una opción al azar.",

  async run({ m, text }: CommandContext) {
    if (!text) {
      return m.reply(
        "🤔 Escribe varias opciones separadas por coma.\nEjemplo: *.choose Pizza, Burger, Tacos*"
      );
    }

    const options = text
      .split(",")
      .map((option) => option.trim())
      .filter(Boolean);

    if (options.length < 2) {
      return m.reply("❌ Necesito al menos 2 opciones.");
    }

    const choice =
      options[Math.floor(Math.random() * options.length)];

    await m.reply(
      `🎯 𝗘𝗟𝗘𝗖𝗖𝗜𝗢́𝗡\n\nOpciones: ${options.join(" • ")}\n\n👉 Elegí: *${choice}*`
    );
  },
});