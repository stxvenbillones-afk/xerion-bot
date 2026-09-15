import cmd, { type CommandContext } from "../../commands/map.js";
import {
  unbanBot,
  isOwnerPrincipal,
  isBanned,
} from "../../permissions.js";

cmd.add({
  name: "unbanbot",
  alias: ["unban"],
  category: ["owner"],
  desc: "Desbloquea a un usuario de XERION BOT.",
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
        "❌ Debes indicar el número del usuario.\n\nEjemplo:\n.unbanbot 18095551234",
      );
    }

    const jid = `${number}@s.whatsapp.net`;

    if (!isBanned(jid)) {
      return m.reply("⚠️ Ese usuario no está bloqueado.");
    }

    unbanBot(number);

    return m.reply(
      `✅ @${number} ha sido desbloqueado de XERION BOT.`,
    );
  },
});