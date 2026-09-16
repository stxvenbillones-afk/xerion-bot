import cmd, { type CommandContext } from "../../commands/map.js";

cmd.add({
  name: "demote",
  alias: ["quitaradmin"],
  category: ["grupos"],
  desc: "Quita el administrador a un miembro del grupo.",
  isGroup: true,
  isAdmin: true,

  async run({ m, sock }: CommandContext) {
    const mentioned = m.mentionedJids?.[0];

    if (!mentioned) {
      return m.reply(
        "❌ Menciona al administrador al que quieres quitarle el rango."
      );
    }

    try {
      await sock.groupParticipantsUpdate(
        m.chat,
        [mentioned],
        "demote"
      );

      await sock.sendMessage(
        m.chat,
        {
          text: `✅ @${mentioned.split("@")[0]} ya no es administrador del grupo.`,
          mentions: [mentioned],
        },
        {
          quoted: m.message,
        }
      );
    } catch (error) {
      console.error("Error quitando administrador:", error);

      await m.reply(
        "❌ No pude quitarle el administrador a ese usuario."
      );
    }
  },
});