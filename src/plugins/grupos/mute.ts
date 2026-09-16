import cmd, { type CommandContext } from "../../commands/map.js";

cmd.add({
  name: "mute",
  alias: ["silenciar"],
  category: ["grupos"],
  desc: "Silencia o devuelve los permisos de escritura a un miembro.",
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
      await sock.groupParticipantsUpdate(
        m.chat,
        [mentioned],
        "demote"
      );

      await m.reply(
        `🔇 @${mentioned.split("@")[0]} ha sido silenciado.`,
        [mentioned]
      );
    } catch (error) {
      console.error("Error silenciando usuario:", error);

      await m.reply(
        "❌ No pude silenciar a ese usuario. Asegúrate de que el bot sea administrador."
      );
    }
  },
});