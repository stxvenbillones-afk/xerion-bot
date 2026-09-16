import cmd, { type CommandContext } from "../../commands/map.js";

cmd.add({
  name: "join",
  alias: ["entrar"],
  category: ["owner"],
  desc: "Hace que XERION BOT entre a un grupo mediante un enlace.",
  isOwner: true,

  async run({ m, args, sock }: CommandContext) {
    const link = args.join(" ").trim();

    if (!link) {
      return m.reply(
        "❌ Debes proporcionar el enlace del grupo.\n\n" +
        "Ejemplo:\n" +
        ".join https://chat.whatsapp.com/XXXXXXXXXXXX"
      );
    }

    const match = link.match(
      /chat\.whatsapp\.com\/([A-Za-z0-9_-]+)/
    );

    if (!match?.[1]) {
      return m.reply(
        "❌ El enlace de WhatsApp no es válido."
      );
    }

    const inviteCode = match[1];

    try {
      const groupJid =
        await sock.groupAcceptInvite(inviteCode);

      return m.reply(
        `╭━━━━━━━━━━━━━━━━━━╮
┃ 👥 𝗚𝗥𝗨𝗣𝗢 𝗨𝗡𝗜𝗗𝗢
╰━━━━━━━━━━━━━━━━━━╯

┃ ✅ XERION BOT entró al grupo.
┃ 🆔 ID: ${groupJid}

╰━━━━━━━━━━━━━━━━━━╯
      𝗫𝗘𝗥𝗜𝗢𝗡 𝗕𝗢𝗧`
      );
    } catch (error) {
      console.error(
        "Error entrando al grupo:",
        error
      );

      return m.reply(
        "❌ No pude entrar al grupo.\n\n" +
        "El enlace puede haber expirado, " +
        "ser inválido o el grupo puede no permitir nuevas entradas."
      );
    }
  },
});