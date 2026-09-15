import cmd, { type CommandContext } from "../../commands/map.js";
import { isOwner, isStaff } from "../../permissions.js";

cmd.add({
  name: "demote",
  alias: ["unadmin"],
  category: ["staff"],
  desc: "Quita administrador a un usuario.",
  isStaff: true,
  isGroup: true,

  async run({ m, args, sock }: CommandContext) {
    if (!isOwner(m.sender) && !isStaff(m.sender)) {
      return m.reply("❌ No tienes permiso para utilizar este comando.");
    }

    const number = (args?.[0] || "").replace(/\D/g, "");

    if (!number) {
      return m.reply(
        "❌ Debes indicar el número.\n\nEjemplo:\n.demote 18095551234",
      );
    }

    try {
      await sock.groupParticipantsUpdate(
        m.chat,
        [`${number}@s.whatsapp.net`],
        "demote",
      );

      return m.reply(`✅ @${number} ya no es administrador.`);
    } catch (error) {
      console.error(error);
      return m.reply("❌ No pude quitar el administrador.");
    }
  },
});