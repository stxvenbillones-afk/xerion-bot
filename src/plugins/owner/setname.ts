import cmd, { type CommandContext } from "../../commands/map.js";

cmd.add({
  name: "setname",
  alias: ["botname"],
  category: ["owner"],
  desc: "Cambia el nombre de XERION BOT.",
  isOwner: true,

  async run({ m, args, sock }: CommandContext) {
    const name = args.join(" ").trim();

    if (!name) {
      return m.reply(
        "❌ Debes indicar el nuevo nombre.\n\nEjemplo:\n.setname XERION BOT",
      );
    }

    try {
      await sock.updateProfileName(name);

      return m.reply(
        `✅ El nombre del bot ha sido cambiado a:\n\n*${name}*`,
      );
    } catch (error) {
      console.error("Error cambiando el nombre:", error);

      return m.reply(
        "❌ No se pudo cambiar el nombre del bot.",
      );
    }
  },
});