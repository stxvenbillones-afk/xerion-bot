import cmd, { type CommandContext } from "../../commands/map.js";

cmd.add({
  name: "setbio",
  alias: ["botbio", "setdesc"],
  category: ["owner"],
  desc: "Cambia la descripción del perfil de XERION BOT.",
  isOwner: true,

  async run({ m, args, sock }: CommandContext) {
    const bio = args.join(" ").trim();

    if (!bio) {
      return m.reply(
        "❌ Debes indicar la nueva descripción.\n\nEjemplo:\n.setbio Powered by Billones",
      );
    }

    try {
      await sock.updateProfileStatus(bio);

      return m.reply(
        `✅ La descripción del bot ha sido actualizada.\n\n*${bio}*`,
      );
    } catch (error) {
      console.error("Error cambiando la descripción:", error);

      return m.reply(
        "❌ No se pudo cambiar la descripción del bot.",
      );
    }
  },
});