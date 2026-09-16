import cmd, { type CommandContext } from "../../commands/map.js";

cmd.add({
  name: "ship",
  alias: ["pareja"],
  category: ["diversión"],
  desc: "Calcula una compatibilidad al azar.",

  async run({ m, text }: CommandContext) {
    if (!text) {
      return m.reply(
        "💘 Escribe dos nombres. Ejemplo: *.ship Ana Juan*"
      );
    }

    const percentage = Math.floor(Math.random() * 101);

    await m.reply(
      `💘 𝗦𝗛𝗜𝗣\n\n${text}\n\nCompatibilidad: *${percentage}%* ❤️`
    );
  },
});