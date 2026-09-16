import cmd, { type CommandContext } from "../../commands/map.js";

cmd.add({
  name: "mute",
  alias: ["silenciar"],
  category: ["grupos"],
  desc: "Silencia a un miembro del grupo.",
  isGroup: true,
  isAdmin: true,

  async run({ m, sock }: CommandContext) {
    const mentioned = m.mentionedJids?.[0];

    if (!mentioned) {
      return m.reply(
        "❌ Menciona al usuario que quieres silenciar."
      );
    }

    try {
      await sock.sendMessage(
        m.chat,
        {
          text: `🔇 @${mentioned.split("@")[0]} ha sido marcado para silenciar.`,
          mentions: [mentioned],
        },
        {
          quoted: m.message,
        }
      );
    } catch (error) {
      console.error("Error silenciando usuario:", error);

      await m.reply(
        "❌ No pude silenciar a ese usuario."
      );
    }
  },
});