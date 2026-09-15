import cmd, { type CommandContext } from "../../commands/map.js";
import { isOwner, isStaff } from "../../permissions.js";

cmd.add({
  name: "promote",
  alias: ["admin"],
  category: ["staff"],
  desc: "Da administrador a un usuario.",
  isStaff: true,
  isGroup: true,

  async run({ m, args, sock }: CommandContext) {
    if (!isOwner(m.sender) && !isStaff(m.sender)) {
      return m.reply("❌ No tienes permiso para utilizar este comando.");
    }

    const number = (args?.[0] || "").replace(/\D/g, "");

    if (!number) {
      return m.reply(
        "❌ Debes indicar el número.\n\nEjemplo:\n.promote 18095551234",
      );
    }

    try {
      await sock.groupParticipantsUpdate(
        m.chat,
        [`${number}@s.whatsapp.net`],
        "promote",
      );

      return m.reply(`👑 @${number} ahora es administrador.`);
    } catch (error) {
      console.error(error);
      return m.reply("❌ No pude dar administrador.");
    }
  },
});