import cmd, { type CommandContext } from "../../commands/map.js";

cmd.add({
  name: "shutdown",
  alias: ["apagar", "stopbot"],
  category: ["owner"],
  desc: "Apaga XERION BOT.",
  isOwner: true,

  async run({ m }: CommandContext) {
    await m.reply(
      `╭━━━━━━━━━━━━━━━━━━╮
┃ 🔴 𝗫𝗘𝗥𝗜𝗢𝗡 𝗕𝗢𝗧
╰━━━━━━━━━━━━━━━━━━╯

┃ 🛑 Apagando el bot...
┃ 👻 XERION BOT está offline.

╰━━━━━━━━━━━━━━━━━━╯
      𝗫𝗘𝗥𝗜𝗢𝗡 𝗕𝗢𝗧`
    );

    setTimeout(() => {
      process.exit(0);
    }, 1500);
  },
});