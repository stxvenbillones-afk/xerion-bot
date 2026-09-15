import cmd, { type CommandContext } from "../../commands/map.js";
import {
  removeOwner,
  isOwnerPrincipal,
  isOwner,
} from "../../permissions.js";

cmd.add({
  name: "delowner",
  alias: ["removeowner"],
  category: ["owner"],
  desc: "Elimina un Owner del bot.",
  isOwner: true,

  async run({ m, args }: CommandContext) {
    // Solo el Owner Principal puede eliminar Owners.
    if (!isOwnerPrincipal(m.sender)) {
      return m.reply(
        "❌ Solo el Owner Principal puede utilizar este comando.",
      );
    }

    const number = (args?.[0] || "").replace(/\D/g, "");

    if (!number) {
      return m.reply(
        "❌ Debes indicar el número del Owner.\n\nEjemplo:\n.delowner 18095551234",
      );
    }

    // Protección del Owner Principal.
    if (number === process.env.OWNER) {
      return m.reply(
        "🛡️ El Owner Principal está protegido y no puede ser eliminado.",
      );
    }

    const jid = `${number}@s.whatsapp.net`;

    if (!isOwner(jid)) {
      return m.reply("⚠️ Ese usuario no es Owner.");
    }

    removeOwner(number);

    return m.reply(
      `✅ @${number} ya no es Owner de XERION BOT.`,
    );
  },
});