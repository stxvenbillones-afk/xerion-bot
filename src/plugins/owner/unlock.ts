import cmd, { type CommandContext } from "../../commands/map.js";

cmd.add({
  name: "unlock",
  alias: ["abrirchat"],
  category: ["staff"],
  desc: "Permite escribir a todos los miembros.",
  isStaff: true,
  isGroup: true,

  async run({ m, sock }: CommandContext) {
    try {
      await sock.groupSettingUpdate(m.chat, "not_announcement");

      return m.reply(
        "🔓 *GRUPO ABIERTO*\n\nTodos los miembros pueden escribir.",
      );
    } catch (error) {
      console.error(error);
      return m.reply("❌ No pude abrir el grupo.");
    }
  },
});