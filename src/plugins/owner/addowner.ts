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

    // Si mencionan al usuario
    if (m.mentionedJids?.length) {
      number = m.mentionedJids[0].split("@")[0];
    }

    // Si escriben el número manualmente
    else if (args?.[0]) {
      number = args[0].replace(/\D/g, "");
    }

    if (!number) {
      return m.reply(
        "❌ Debes mencionar al usuario.\n\n" +
        "Ejemplo:\n" +
        ".addowner @usuario"
      );
    }

    const jid = `${number}@s.whatsapp.net`;

    if (isOwner(jid)) {
      return m.reply(
        "⚠️ Ese usuario ya es Owner de XERION BOT."
      );
    }

    addOwner(number);

    return m.reply(
      `╭━━━━━━━━━━━━━━━━━━╮
┃ 👑 𝗢𝗪𝗡𝗘𝗥 𝗔𝗚𝗥𝗘𝗚𝗔𝗗𝗢
╰━━━━━━━━━━━━━━━━━━╯

┃ 👤 Usuario: @${number}
┃ 👑 Rango: OWNER
┃ ✅ Estado: Activado

╰━━━━━━━━━━━━━━━━━━╯
      𝗫𝗘𝗥𝗜𝗢𝗡 𝗕𝗢𝗧`
    );
  },
});