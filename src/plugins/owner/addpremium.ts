import cmd, { type CommandContext } from "../../commands/map.js";
import {
  addPremium,
  isOwnerPrincipal,
  isPremium,
} from "../../permissions.js";

cmd.add({
  name: "addprem",
  alias: ["addpremium"],
  category: ["owner"],
  desc: "Añade un usuario al sistema Premium de XERION BOT.",
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
        "❌ Debes indicar el número del usuario.\n\nEjemplo:\n.addprem 18095551234",
      );
    }

    const jid = `${number}@s.whatsapp.net`;

    if (isPremium(jid)) {
      return m.reply("⚠️ Ese usuario ya tiene Premium.");
    }

    addPremium(number);

    return m.reply(
      `💎 @${number} ahora tiene Premium en XERION BOT.`,
    );
  },
});