import cmd, { type CommandContext } from "../commands/map.js";

cmd.add({
  name: "menu",
  alias: ["help", "list"],
  category: ["info"],
  desc: "Muestra el menú de Xorion Bot.",

  async run({ m }: CommandContext) {
    const menuText = `╭━━━━━━━━━━━━━━━━━━━━━━╮
┃   👻  𝗫𝗢𝗥𝗜𝗢𝗡 𝗕𝗢𝗧  👻
╰━━━━━━━━━━━━━━━━━━━━━━╯

╭┤✦ 𝗖𝗢𝗠𝗔𝗡𝗗𝗢𝗦
┃
┃  › .menu
┃  › .s
┃  › .n
┃  › .p
┃  › .todos
┃  › .promote
┃  › .demote
┃  › .kick
┃  › .mute
┃  › .cerrar
┃  › .abrir
┃
┃  › .addowner
┃  › .delowner
┃  › .owners
┃  › .addadmin
┃  › .deladmin
┃  › .admins
┃  › .addprem
┃  › .delprem
┃  › .setbio
┃  › .restart
┃  › .shutdown
┃  › .join
┃  › .leave
┃
┃  › .joke
┃  › .8ball
┃  › .truth
┃  › .dare
┃  › .roll
┃  › .ship
┃  › .choose
┃  › .trivia
┃  › .hangman
┃
╰━━━━━━━━━━━━━━━━━━━━━━╯

        𝗣𝗼𝘄𝗲𝗿𝗲𝗱 𝗯𝘆 𝗕𝗶𝗹𝗹𝗼𝗻𝗲𝘀`;

    return m.reply(menuText);
  },
});