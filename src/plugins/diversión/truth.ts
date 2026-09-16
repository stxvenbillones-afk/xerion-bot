import cmd, { type CommandContext } from "../../commands/map.js";

const truths = [
  "¿Cuál es tu secreto más raro? 👀",
  "¿Quién fue tu último crush? ❤️",
  "¿Cuál es la mentira más grande que has dicho?",
  "¿Qué cosa te da vergüenza admitir?",
  "¿Has stalkeado a alguien recientemente? 😂",
];

cmd.add({
  name: "truth",
  alias: ["verdad"],
  category: ["diversión"],
  desc: "Te da una pregunta de verdad.",

  async run({ m }: CommandContext) {
    const truth = truths[Math.floor(Math.random() * truths.length)];
    await m.reply(`🫣 𝗩𝗘𝗥𝗗𝗔𝗗\n\n${truth}`);
  },
});