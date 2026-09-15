import cmd, { type CommandContext } from "../../commands/map.js";

cmd.add({
  name: "leave",
  alias: ["salir"],
  category: ["owner"],
  desc: "Hace que XERION BOT salga del grupo actual.",
  isOwner: true,
  isGroup: true,

  async run({ m, sock }: CommandContext) {
    try {
      await m.reply("👋 *XERION BOT* está saliendo del grupo...");

      await sock.groupLeave(m.chat);
    } catch (error) {
      console.error("Error saliendo del grupo:", error);

      return m.reply(
        "❌ No pude salir del grupo.",
      );
    }
  },
});