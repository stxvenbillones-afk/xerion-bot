import cmd, { type CommandContext } from "../../commands/map.js";

cmd.add({
  name: "kick",
  alias: ["expulsar"],
  category: ["grupos"],
  desc: "Expulsa a un miembro del grupo.",
  isGroup: true,
  isAdmin: true,

  async run({ m, sock }: CommandContext) {
    const mentioned = m.mentionedJids?.[0];

    if (!mentioned) {
      return m.reply(
        "❌ Menciona al usuario que quieres expulsar."
      );
    }

    try {
      await sock.groupParticipantsUpdate(
        m.chat,
        [mentioned],
        "remove"
      );

      await sock.sendMessage(
        m.chat,
        {
          text: `✅ @${mentioned.split("@")[0]} ha sido expulsado del grupo.`,
          mentions: [mentioned],
        },
        {
          quoted: m.message,
        }
      );
    } catch (error) {
      console.error("Error expulsando usuario:", error);

      await m.reply(
        "❌ No pude expulsar a ese usuario. Asegúrate de que el bot sea administrador."
      );
    }
  },
});