import cmd, { type CommandContext } from "../../commands/map.js";

const questions = [
  {
    question: "¿Cuál es el planeta más grande del sistema solar?",
    answer: "Júpiter",
  },
  {
    question: "¿Cuántos continentes hay?",
    answer: "7",
  },
  {
    question: "¿Cuál es la capital de Francia?",
    answer: "París",
  },
  {
    question: "¿Cuántos lados tiene un hexágono?",
    answer: "6",
  },
  {
    question: "¿Cuál es el océano más grande?",
    answer: "Pacífico",
  },
];

cmd.add({
  name: "trivia",
  alias: ["pregunta"],
  category: ["diversión"],
  desc: "Te hace una pregunta de trivia.",

  async run({ m }: CommandContext) {
    const item =
      questions[Math.floor(Math.random() * questions.length)];

    await m.reply(
      `🧠 𝗧𝗥𝗜𝗩𝗜𝗔\n\n${item.question}\n\n💡 Respuesta: *${item.answer}*`
    );
  },
});