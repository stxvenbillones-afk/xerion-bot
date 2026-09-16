import cmd, { type CommandContext } from "../../commands/map.js";
import {
  removeAdmin,
  isAdmin,
} from "../../permissions.js";

cmd.add({
  name: "deladmin",
  alias: ["deladmin", "removeadmin"],
  category: ["owner"],
  desc: "Elimina un Admin del bot.",
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
        "❌ Debes mencionar al Admin.\n\n" +
        "Ejemplo:\n" +
        ".deladmin @usuario"
      );
    }

    const jid = `${number}@s.whatsapp.net`;

    if (!isAdmin(jid)) {
      return m.reply(
        "⚠️ Ese usuario no es Admin."
      );
    }

    removeAdmin(number);

    return m.reply(
      `╭━━━━━━━━━━━━━━━━━━╮
┃ 🛡️ 𝗔𝗗𝗠𝗜𝗡 𝗘𝗟𝗜𝗠𝗜𝗡𝗔𝗗𝗢
╰━━━━━━━━━━━━━━━━━━╯

┃ 👤 Usuario: @${number}
┃ ❌ Rango Admin: Removido

╰━━━━━━━━━━━━━━━━━━╯
      𝗫𝗘𝗥𝗜𝗢𝗡 𝗕𝗢𝗧`
    );
  },
});