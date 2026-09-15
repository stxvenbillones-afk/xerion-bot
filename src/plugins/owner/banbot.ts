import cmd, { type CommandContext } from "../../commands/map.js";
import {
  banBot,
  isOwnerPrincipal,
  isBanned,
} from "../../permissions.js";

cmd.add({
  name: "banbot",
  alias: ["ban"],
  category: ["owner"],
  desc: "Bloquea a un usuario para que no pueda utilizar XERION BOT.",
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
        "❌ Debes indicar el número del usuario.\n\nEjemplo:\n.banbot 18095551234",
      );
    }

    if (number === process.env.OWNER) {
      return m.reply(
        "🛡️ El Owner Principal está protegido y no puede ser bloqueado.",
      );
    }

    const jid = `${number}@s.whatsapp.net`;

    if (isBanned(jid)) {
      return m.reply("⚠️ Ese usuario ya está bloqueado.");
    }

    banBot(number);

    return m.reply(
      `🚫 @${number} ha sido bloqueado de XERION BOT.`,
    );
  },
});