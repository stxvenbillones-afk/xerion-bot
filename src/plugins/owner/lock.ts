import cmd, { type CommandContext } from "../../commands/map.js";

cmd.add({
  name: "lock",
  alias: ["cerrarchat"],
  category: ["staff"],
  desc: "Permite escribir solamente a los administradores.",
  isStaff: true,
  isGroup: true,

  async run({ m, sock }: CommandContext) {
    try {
      await sock.groupSettingUpdate(m.chat, "announcement");

      return m.reply(
        "🔒 *GRUPO CERRADO*\n\nSolo los administradores pueden escribir.",
      );
    } catch (error) {
      console.error(error);
      return m.reply("❌ No pude cerrar el grupo.");
    }
  },
});