import cmd, { type CommandContext } from "../../commands/map.js";
import {
  removeStaff,
  isOwnerPrincipal,
  isStaff,
} from "../../permissions.js";

cmd.add({
  name: "delstaff",
  alias: ["removestaff"],
  category: ["owner"],
  desc: "Elimina un usuario del Staff de XERION BOT.",
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
        "❌ Debes indicar el número del Staff.\n\nEjemplo:\n.delstaff 18095551234",
      );
    }

    const jid = `${number}@s.whatsapp.net`;

    if (!isStaff(jid)) {
      return m.reply("⚠️ Ese usuario no pertenece al Staff.");
    }

    removeStaff(number);

    return m.reply(
      `✅ @${number} ya no pertenece al Staff de XERION BOT.`,
    );
  },
});