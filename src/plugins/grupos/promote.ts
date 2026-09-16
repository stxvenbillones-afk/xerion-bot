import cmd, { type CommandContext } from "../../commands/map.js";

cmd.add({
  name: "promote",
  alias: ["daradmin"],
  category: ["grupos"],
  desc: "Da administrador a un miembro del grupo.",
  isGroup: true,
  isAdmin: true,

  async run({ m, sock }: CommandContext) {
    const mentioned = m.mentionedJids?.[0];

    if (!mentioned) {
      return m.reply(
        "❌ Menciona al usuario que quieres hacer administrador."
      );
    }

    try {
      await sock.groupParticipantsUpdate(
        m.chat,
        [mentioned],
        "promote"
      );

      await sock.sendMessage(
        m.chat,
        {
          text: `✅ @${mentioned.split("@")[0]} ahora es administrador del grupo.`,
          mentions: [mentioned],
        },
        {
          quoted: m.message,
        }
      );
    } catch (error) {
      console.error("Error promoviendo usuario:", error);

      await m.reply(
        "❌ No pude hacer administrador a ese usuario. Asegúrate de que el bot sea administrador."
      );
    }
  },
});