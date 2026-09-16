import cmd, { type CommandContext } from "../../commands/map.js";

cmd.add({
  name: "cerrar",
  alias: ["close"],
  category: ["grupos"],
  desc: "Cierra el grupo para que solo los administradores puedan escribir.",
  isGroup: true,
  isAdmin: true,

  async run({ m, sock }: CommandContext) {
    try {
      await sock.groupSettingUpdate(
        m.chat,
        "announcement"
      );

      await m.reply(
        "🔒 Grupo cerrado.\n\nSolo los administradores pueden enviar mensajes."
      );
    } catch (error) {
      console.error("Error cerrando grupo:", error);

      await m.reply(
        "❌ No pude cerrar el grupo. Asegúrate de que el bot sea administrador."
      );
    }
  },
});