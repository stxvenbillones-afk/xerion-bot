import cmd, { type CommandContext } from "../../commands/map.js";
import { removeOwner, isOwner } from "../../permissions.js";

cmd.add({
  name: "delowner",
  alias: ["delowner", "removeowner"],
  category: ["owner"],
  desc: "Elimina un Owner del bot.",
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
        "❌ Debes mencionar al Owner.\n\nEjemplo:\n.delowner @usuario"
      );
    }

    const jid = `${number}@s.whatsapp.net`;

    if (!isOwner(jid)) {
      return m.reply("⚠️ Ese usuario no es Owner.");
    }

    removeOwner(number);

    return m.reply(
      `╭━━━━━━━━━━━━━━━━━━╮
┃ 👑 𝗢𝗪𝗡𝗘𝗥 𝗘𝗟𝗜𝗠𝗜𝗡𝗔𝗗𝗢
╰━━━━━━━━━━━━━━━━━━╯

┃ 👤 Usuario: @${number}
┃ ❌ Rango Owner: Removido

╰━━━━━━━━━━━━━━━━━━╯
      𝗫𝗘𝗥𝗜𝗢𝗡 𝗕𝗢𝗧`
    );
  },
});