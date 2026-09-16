import cmd, { type CommandContext } from "../../commands/map.js";

cmd.add({
  name: "roll",
  alias: ["dado"],
  category: ["diversión"],
  desc: "Lanza un dado.",

  async run({ m }: CommandContext) {
    const number = Math.floor(Math.random() * 6) + 1;

    await m.reply(
      `🎲 𝗗𝗔𝗗𝗢\n\nResultado: *${number}*`
    );
  },
});