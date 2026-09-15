import cmd, { type CommandContext } from "../../commands/map.js";

cmd.add({
  name: "join",
  alias: ["entrar"],
  category: ["owner"],
  desc: "Hace que XERION BOT entre a un grupo mediante un enlace.",
  isOwner: true,

  async run({ m, args, sock }: CommandContext) {
    const link = args[0]?.trim();

    if (!link) {
      return m.reply(
        "❌ Debes proporcionar el enlace del grupo.\n\nEjemplo:\n.join https://chat.whatsapp.com/XXXXXXXX",
      );
    }

    const match = link.match(
      /chat\.whatsapp\.com\/([A-Za-z0-9_-]+)/,
    );

    if (!match) {
      return m.reply(
        "❌ El enlace de WhatsApp no es válido.",
      );
    }

    try {
      const inviteCode = match[1];

      await sock.groupAcceptInvite(inviteCode);

      return m.reply(
        "✅ *XERION BOT* ha entrado correctamente al grupo.",
      );
    } catch (error) {
      console.error("Error entrando al grupo:", error);

      return m.reply(
        "❌ No pude entrar al grupo. Verifica que el enlace siga activo.",
      );
    }
  },
});