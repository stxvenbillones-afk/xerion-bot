import cmd, { type CommandContext } from "../../commands/map.js";
import { isOwner, isStaff } from "../../permissions.js";

cmd.add({
  name: "unmute",
  alias: ["abrir"],
  category: ["staff"],
  desc: "Abre el grupo para todos.",
  isStaff: true,
  isGroup: true,

  async run({ m, sock }: CommandContext) {
    if (!isOwner(m.sender) && !isStaff(m.sender)) {
      return m.reply("❌ No tienes permiso para utilizar este comando.");
    }

    try {
      await sock.groupSettingUpdate(m.chat, "not_announcement");

      return m.reply(
        "🔓 El grupo ha sido abierto. Todos pueden escribir.",
      );
    } catch (error) {
      console.error(error);
      return m.reply("❌ No pude abrir el grupo.");
    }
  },
});