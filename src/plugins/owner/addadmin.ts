import cmd, { type CommandContext } from "../../commands/map.js";
import {
  addAdmin,
  isAdmin,
  isOwner,
} from "../../permissions.js";

cmd.add({
  name: "addadmin",
  alias: ["addadmin"],
  category: ["owner"],
  desc: "Añade un nuevo Admin al bot.",
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
        ".addadmin @usuario"
      );
    }

    const jid = `${number}@s.whatsapp.net`;

    if (isOwner(jid)) {
      return m.reply(
        "⚠️ Ese usuario ya es Owner y no necesita rango de Admin."
      );
    }

    if (isAdmin(jid)) {
      return m.reply(
        "⚠️ Ese usuario ya es Admin."
      );
    }

    addAdmin(number);

    return m.reply(
      `╭━━━━━━━━━━━━━━━━━━╮
┃ 🛡️ 𝗔𝗗𝗠𝗜𝗡 𝗔𝗚𝗥𝗘𝗚𝗔𝗗𝗢
╰━━━━━━━━━━━━━━━━━━╯

┃ 👤 Usuario: @${number}
┃ 🛡️ Rango: ADMIN
┃ ✅ Estado: Activado

╰━━━━━━━━━━━━━━━━━━╯
      𝗫𝗘𝗥𝗜𝗢𝗡 𝗕𝗢𝗧`
    );
  },
});