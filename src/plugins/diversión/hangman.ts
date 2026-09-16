import cmd, { type CommandContext } from "../../commands/map.js";

const words = [
  "bot",
  "discord",
  "whatsapp",
  "fantasma",
  "computadora",
  "musica",
];

cmd.add({
  name: "hangman",
  alias: ["ahorcado"],
  category: ["diversión"],
  desc: "Juega una ronda rápida del ahorcado.",

  async run({ m }: CommandContext) {
    const word =
      words[Math.floor(Math.random() * words.length)];

    const hidden = word
      .split("")
      .map(() => "＿")
      .join(" ");

    await m.reply(
      `🎮 𝗔𝗛𝗢𝗥𝗖𝗔𝗗𝗢\n\nPalabra: ${hidden}\n\n🔤 La palabra tiene *${word.length}* letras.\n\n💡 Pista: escribe *.hangman* para otra palabra.`
    );
  },
});