import cmd, { type CommandContext } from "../../commands/map.js";

const dares = [
  "Manda un audio diciendo algo vergonzoso. 😂",
  "Cambia tu foto de perfil durante 5 minutos. 😈",
  "Escribe 'soy una leyenda' en el grupo. 👑",
  "Manda un emoji que represente tu personalidad. 😂",
  "Di cuál es tu canción favorita ahora mismo. 🎵",
];

cmd.add({
  name: "dare",
  alias: ["reto"],
  category: ["diversión"],
  desc: "Te da un reto aleatorio.",

  async run({ m }: CommandContext) {
    const dare = dares[Math.floor(Math.random() * dares.length)];
    await m.reply(`😈 𝗥𝗘𝗧𝗢\n\n${dare}`);
  },
});