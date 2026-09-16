import cmd, { type CommandContext } from "../../commands/map.js";

cmd.add({
  name: "abrir",
  alias: ["open"],
  category: ["grupos"],
  desc: "Abre el grupo para que todos puedan escribir.",
  isGroup: true,
  isAdmin: true,

  async run({ m, sock }: CommandContext) {
    try {
      await sock.groupSettingUpdate(
        m.chat,
        "not_announcement"
      );

      await m.reply(
        "🔓 Grupo abierto.\n\nTodos los miembros pueden enviar mensajes."
      );
    } catch (error) {
      console.error("Error abriendo grupo:", error);

      await m.reply(
        "❌ No pude abrir el grupo. Asegúrate de que el bot sea administrador."
      );
    }
  },
});