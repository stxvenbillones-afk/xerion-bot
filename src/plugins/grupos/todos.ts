import cmd, { type CommandContext } from "../../commands/map.js";

cmd.add({
  name: "todos",
  alias: ["tagall", "everyone"],
  category: ["grupos"],
  desc: "Menciona a todos los miembros del grupo.",
  isGroup: true,

  async run({ m, sock, text }: CommandContext) {
    const metadata = m.metadata;

    if (!metadata?.participants?.length) {
      return m.reply(
        "❌ No pude obtener los miembros del grupo."
      );
    }

    const participants = metadata.participants;

    const mentions = participants
      .map((participant: any) => participant.id)
      .filter(Boolean);

    const message =
      `╭━━━━━━━━━━━━━━━━━━╮
┃ 📢 𝗠𝗘𝗡𝗖𝗜𝗢́𝗡 𝗚𝗘𝗡𝗘𝗥𝗔𝗟
╰━━━━━━━━━━━━━━━━━━╯

┃ ${text || "Atención a todos 👀"}

` +
      mentions
        .map((jid: string) => `┃ @${jid.split("@")[0]}`)
        .join("\n") +
      `

╰━━━━━━━━━━━━━━━━━━╯
      𝗫𝗘𝗥𝗜𝗢𝗡 𝗕𝗢𝗧`;

    await sock.sendMessage(
      m.chat,
      {
        text: message,
        mentions,
      },
      {
        quoted: m.message,
      }
    );
  },
});