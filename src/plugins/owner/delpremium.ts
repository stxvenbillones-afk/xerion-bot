import cmd, { type CommandContext } from "../../commands/map.js";
import {
  removePremium,
  isPremium,
} from "../../permissions.js";

cmd.add({
  name: "delprem",
  alias: ["delprem", "delpremium", "removeprem"],
  category: ["owner"],
  desc: "Elimina el rango Premium/VIP de un usuario.",
  isOwner: true,

  async run({ m, args }: CommandContext) {
    let number = "";

    if (m.mentionedJids?.length) {
      number = m.mentionedJids[0].split("@")[0];
    } else if (args?.[0]) {
      number = args[0].replace(/\D/g, "");
    }

    if (!number) {
      return m.reply(
        "❌ Debes mencionar al usuario.\n\n" +
        "Ejemplo:\n" +
        ".delprem @usuario"
      );
    }

    const jid = `${number}@s.whatsapp.net`;

    if (!isPremium(jid)) {
      return m.reply(
        "⚠️ Ese usuario no tiene Premium/VIP."
      );
    }

    removePremium(number);

    return m.reply(
      `╭━━━━━━━━━━━━━━━━━━╮
┃ ⭐ 𝗣𝗥𝗘𝗠𝗜𝗨𝗠 𝗘𝗟𝗜𝗠𝗜𝗡𝗔𝗗𝗢
╰━━━━━━━━━━━━━━━━━━╯

┃ 👤 Usuario: @${number}
┃ ❌ Rango Premium: Removido

╰━━━━━━━━━━━━━━━━━━╯
      𝗫𝗘𝗥𝗜𝗢𝗡 𝗕𝗢𝗧`
    );
  },
});