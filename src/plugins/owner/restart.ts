import cmd, { type CommandContext } from "../../commands/map.js";

cmd.add({
  name: "restart",
  alias: ["reiniciar"],
  category: ["owner"],
  desc: "Reinicia XERION BOT.",
  isOwner: true,

  async run({ m }: CommandContext) {
    await m.reply(
      `╭━━━━━━━━━━━━━━━━━━╮
┃ 🔄 𝗥𝗘𝗜𝗡𝗜𝗖𝗜𝗔𝗡𝗗𝗢 𝗫𝗘𝗥𝗜𝗢𝗡
╰━━━━━━━━━━━━━━━━━━╯

┃ ⏳ Reiniciando el bot...
┃ 👻 Volveré a estar online en unos segundos.

╰━━━━━━━━━━━━━━━━━━╯
      𝗫𝗘𝗥𝗜𝗢𝗡 𝗕𝗢𝗧`
    );

    setTimeout(() => {
      process.exit(0);
    }, 1500);
  },
});