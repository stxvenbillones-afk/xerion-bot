import cmd, { type CommandContext } from "../../commands/map.js";
import { isOwner, isStaff } from "../../permissions.js";

cmd.add({
  name: "kick",
  alias: ["expulsar"],
  category: ["staff"],
  desc: "Expulsa a un miembro del grupo.",
  isStaff: true,
  isGroup: true,

  async run({ m, args, sock }: CommandContext) {
    if (!isOwner(m.sender) && !isStaff(m.sender)) {
      return m.reply("❌ No tienes permiso para utilizar este comando.");
    }

    const number = (args?.[0] || "").replace(/\D/g, "");

    if (!number) {
      return m.reply(
        "❌ Debes indicar el número del usuario.\n\nEjemplo:\n.kick 18095551234",
      );
    }

    const jid = `${number}@s.whatsapp.net`;

    try {
      await sock.groupParticipantsUpdate(
        m.chat,
        [jid],
        "remove",
      );

      return m.reply(`✅ @${number} ha sido expulsado del grupo.`);
    } catch (error) {
      console.error("Error expulsando usuario:", error);

      return m.reply(
        "❌ No pude expulsar al usuario. Verifica que el bot sea administrador.",
      );
    }
  },
});