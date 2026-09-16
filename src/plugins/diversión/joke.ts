import cmd, { type CommandContext } from "../../commands/map.js";

const jokes = [
  "¿Qué hace una abeja en el gimnasio? 🐝 ¡Zum-ba! 😂",
  "¿Por qué el libro de matemáticas estaba triste? 📚 Porque tenía demasiados problemas. 😂",
  "¿Qué le dijo un techo a otro? 🏠 Techo de menos. 😂",
  "¿Qué hace una computadora cuando tiene frío? 💻 Cierra Windows. 😂",
  "¿Cuál es el colmo de un electricista? ⚡ No encontrar su corriente de trabajo. 😂",
];

cmd.add({
  name: "joke",
  alias: ["chiste"],
  category: ["diversión"],
  desc: "Cuenta un chiste aleatorio.",

  async run({ m }: CommandContext) {
    const joke = jokes[Math.floor(Math.random() * jokes.length)];
    await m.reply(`😂 𝗖𝗛𝗜𝗦𝗧𝗘\n\n${joke}`);
  },
});