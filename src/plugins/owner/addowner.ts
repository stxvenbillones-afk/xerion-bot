import cmd, { type CommandContext } from "../../commands/map.js";
import { addOwner, isOwner } from "../../permissions.js";

cmd.add({
  name: "addowner",
  alias: ["addowner"],
  category: ["owner"],
  desc: "Añade un nuevo Owner al bot.",
  isOwner: true,

  async run({ m, args }: CommandContext) {
    let number = "";

    if (m.mentionedJids && m.mentionedJids.length > 0) {
      number = m.mentionedJids[0].split("@")[0];
    } else if (args?.[0]) {
      number = args[0].replace(/\D/g, "");
    }

    if (!number) {
      return m.reply(
        "❌ Debes mencionar al usuario.\n\nEjemplo:\n.addowner @usuario"
      );
    }

    const jid = `${number}@s.whatsapp.net`;

    if (isOwner(jid)) {
      return m.reply("⚠️ Ese usuario ya es Owner.");
    }

    addOwner(number);

    return m.reply(
      `👑 @${number} ahora es Owner de XERION BOT.`
    );
  },
});