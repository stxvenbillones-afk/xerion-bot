import cmd, { type CommandContext } from "../../commands/map.js";
import {
  removePremium,
  isOwnerPrincipal,
  isPremium,
} from "../../permissions.js";

cmd.add({
  name: "delprem",
  alias: ["delpremium", "removepremium"],
  category: ["owner"],
  desc: "Elimina el Premium de un usuario.",
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
        "❌ Debes indicar el número del usuario.\n\nEjemplo:\n.delprem 18095551234",
      );
    }

    const jid = `${number}@s.whatsapp.net`;

    if (!isPremium(jid)) {
      return m.reply("⚠️ Ese usuario no tiene Premium.");
    }

    removePremium(number);

    return m.reply(
      `✅ @${number} ya no tiene Premium en XERION BOT.`,
    );
  },
});