import cmd, { type CommandContext } from "../../commands/map.js";
import { getPermissions } from "../../permissions.js";

cmd.add({
  name: "owners",
  alias: ["ownerlist"],
  category: ["owner"],
  desc: "Muestra la lista de Owners.",
  isOwner: true,

  async run({ m }: CommandContext) {
    const data = getPermissions();

    if (!data.owners.length) {
      return m.reply(
        "👑 *OWNERS DE XERION BOT*\n\nNo hay Owners añadidos todavía."
      );
    }

    const list = data.owners
      .map((number, index) => `${index + 1}. @${number}`)
      .join("\n");

    return m.reply(
      `╭━━━━━━━━━━━━━━━━━━╮
┃ 👑 𝗢𝗪𝗡𝗘𝗥𝗦 𝗗𝗘 𝗫𝗘𝗥𝗜𝗢𝗡
╰━━━━━━━━━━━━━━━━━━╯

${list}

╰━━━━━━━━━━━━━━━━━━╯
┃ Total: ${data.owners.length}
╰━━━━━━━━━━━━━━━━━━╯`
    );
  },
});