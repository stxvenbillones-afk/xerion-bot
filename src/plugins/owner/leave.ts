import cmd, { type CommandContext } from "../../commands/map.js";

cmd.add({
  name: "leave",
  alias: ["salir"],
  category: ["owner"],
  desc: "Hace que XERION BOT salga del grupo actual.",
  isOwner: true,
  isGroup: true,

  async run({ m, sock }: CommandContext) {
    try {
      await m.reply(
        `╭━━━━━━━━━━━━━━━━━━╮
┃ 🚪 𝗦𝗔𝗟𝗜𝗘𝗡𝗗𝗢 𝗗𝗘𝗟 𝗚𝗥𝗨𝗣𝗢
╰━━━━━━━━━━━━━━━━━━╯

┃ 👻 XERION BOT abandonará este grupo.

╰━━━━━━━━━━━━━━━━━━╯
      𝗫𝗘𝗥𝗜𝗢𝗡 𝗕𝗢𝗧`
      );

      await sock.groupLeave(m.chat);
    } catch (error) {
      console.error(
        "Error saliendo del grupo:",
        error
      );

      await m.reply(
        "❌ No pude salir del grupo."
      );
    }
  },
});