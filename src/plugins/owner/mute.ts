import cmd, { type CommandContext } from "../../commands/map.js";
import { isOwner, isStaff } from "../../permissions.js";

cmd.add({
  name: "mute",
  alias: ["cerrar"],
  category: ["staff"],
  desc: "Cierra el grupo para los participantes.",
  isStaff: true,
  isGroup: true,

  async run({ m, sock }: CommandContext) {
    if (!isOwner(m.sender) && !isStaff(m.sender)) {
      return m.reply("❌ No tienes permiso para utilizar este comando.");
    }

    try {
      await sock.groupSettingUpdate(m.chat, "announcement");

      return m.reply(
        "🔒 El grupo ha sido cerrado. Solo los administradores pueden escribir.",
      );
    } catch (error) {
      console.error(error);
      return m.reply("❌ No pude cerrar el grupo.");
    }
  },
});