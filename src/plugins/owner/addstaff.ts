import cmd, { type CommandContext } from "../../commands/map.js";
import {
  addStaff,
  isOwnerPrincipal,
  isStaff,
} from "../../permissions.js";

cmd.add({
  name: "addstaff",
  alias: ["staffadd"],
  category: ["owner"],
  desc: "Añade un usuario al Staff de XERION BOT.",
  isOwner: true,

  async run({ m, args }: CommandContext) {
    if (!isOwnerPrincipal(m.sender)) {
      return m.reply(
        "❌ Solo el Owner Principal puede utilizar este comando.",
      );
    }

    const number = (args?.[0] || "").replace(/\D/g, "");

    if (!number) {
      return m.reply(
        "❌ Debes indicar el número del usuario.\n\nEjemplo:\n.addstaff 18095551234",
      );
    }

    if (number === process.env.OWNER) {
      return m.reply(
        "👑 El Owner Principal ya tiene autoridad máxima.",
      );
    }

    const jid = `${number}@s.whatsapp.net`;

    if (isStaff(jid)) {
      return m.reply("⚠️ Ese usuario ya pertenece al Staff.");
    }

    addStaff(number);

    return m.reply(
      `🛡️ @${number} ahora pertenece al Staff de XERION BOT.`,
    );
  },
});