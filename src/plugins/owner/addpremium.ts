import cmd, { type CommandContext } from "../../commands/map.js";
import {
  addPremium,
  isPremium,
  isOwner,
} from "../../permissions.js";

cmd.add({
  name: "addprem",
  alias: ["addprem", "addpremium"],
  category: ["owner"],
  desc: "Añade un usuario al rango Premium/VIP.",
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
        ".addprem @usuario"
      );
    }

    const jid = `${number}@s.whatsapp.net`;

    if (isOwner(jid)) {
      return m.reply(
        "⚠️ Ese usuario ya es Owner."
      );
    }

    if (isPremium(jid)) {
      return m.reply(
        "⚠️ Ese usuario ya es Premium/VIP."
      );
    }

    addPremium(number);

    return m.reply(
      `╭━━━━━━━━━━━━━━━━━━╮
┃ ⭐ 𝗣𝗥𝗘𝗠𝗜𝗨𝗠 𝗔𝗚𝗥𝗘𝗚𝗔𝗗𝗢
╰━━━━━━━━━━━━━━━━━━╯

┃ 👤 Usuario: @${number}
┃ ⭐ Rango: PREMIUM / VIP
┃ ✅ Estado: Activado

╰━━━━━━━━━━━━━━━━━━╯
      𝗫𝗘𝗥𝗜𝗢𝗡 𝗕𝗢𝗧`
    );
  },
});