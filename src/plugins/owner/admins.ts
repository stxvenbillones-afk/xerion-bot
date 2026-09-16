import cmd, { type CommandContext } from "../../commands/map.js";
import { getPermissions } from "../../permissions.js";

cmd.add({
  name: "admins",
  alias: ["adminlist"],
  category: ["owner"],
  desc: "Muestra la lista de Admins del bot.",
  isOwner: true,

  async run({ m }: CommandContext) {
    const data = getPermissions();

    if (!data.admins.length) {
      return m.reply(
        "🛡️ *ADMINS DE XERION BOT*\n\n" +
        "No hay Admins añadidos todavía."
      );
    }

    const list = data.admins
      .map(
        (number, index) =>
          `${index + 1}. @${number}`
      )
      .join("\n");

    return m.reply(
      `╭━━━━━━━━━━━━━━━━━━╮
┃ 🛡️ 𝗔𝗗𝗠𝗜𝗡𝗦 𝗗𝗘 𝗫𝗘𝗥𝗜𝗢𝗡
╰━━━━━━━━━━━━━━━━━━╯

${list}

╭━━━━━━━━━━━━━━━━━━╮
┃ 📊 Total: ${data.admins.length}
╰━━━━━━━━━━━━━━━━━━╯

      𝗫𝗘𝗥𝗜𝗢𝗡 𝗕𝗢𝗧`
    );
  },
});