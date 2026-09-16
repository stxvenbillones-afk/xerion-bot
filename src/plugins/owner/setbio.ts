import cmd, { type CommandContext } from "../../commands/map.js";

cmd.add({
  name: "setbio",
  alias: ["bio"],
  category: ["owner"],
  desc: "Cambia la descripción del perfil de WhatsApp del bot.",
  isOwner: true,

  async run({ m, sock, text }: CommandContext) {
    if (!text) {
      return m.reply(
        "❌ Escribe la nueva descripción.\n\nEjemplo: *.setbio Powered by Billones*"
      );
    }

    try {
      await sock.updateProfileStatus(text);

      await m.reply(
        `✅ Descripción actualizada correctamente.\n\n📝 ${text}`
      );
    } catch (error) {
      console.error("Error cambiando la descripción:", error);

      await m.reply(
        "❌ No pude cambiar la descripción del perfil."
      );
    }
  },
});