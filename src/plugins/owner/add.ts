import cmd, { type CommandContext } from "../../commands/map.js";
import { isOwner, isStaff } from "../../permissions.js";

cmd.add({
  name: "add",
  alias: ["agregar"],
  category: ["staff"],
  desc: "Agrega un usuario al grupo.",
  isStaff: true,
  isGroup: true,

  async run({ m, args, sock }: CommandContext) {
    if (!isOwner(m.sender) && !isStaff(m.sender)) {
      return m.reply("❌ No tienes permiso para utilizar este comando.");
    }

    const number = (args?.[0] || "").replace(/\D/g, "");

    if (!number) {
      return m.reply(
        "❌ Debes indicar el número.\n\nEjemplo:\n.add 18095551234",
      );
    }

    try {
      await sock.groupParticipantsUpdate(
        m.chat,
        [`${number}@s.whatsapp.net`],
        "add",
      );

      return m.reply(`✅ @${number} fue agregado al grupo.`);
    } catch (error) {
      console.error(error);
      return m.reply("❌ No pude agregar al usuario.");
    }
  },
});