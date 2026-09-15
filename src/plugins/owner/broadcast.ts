import cmd, { type CommandContext } from "../../commands/map.js";

cmd.add({
  name: "broadcast",
  alias: ["bc"],
  category: ["owner"],
  desc: "Envía un mensaje a los chats registrados por XERION BOT.",
  isOwner: true,

  async run({ m, args, sock, store }: CommandContext) {
    const message = args.join(" ").trim();

    if (!message) {
      return m.reply(
        "❌ Debes escribir el mensaje.\n\nEjemplo:\n.broadcast XERION BOT está activo 🔥",
      );
    }

    try {
      const chats = store?.chats?.all?.() || [];

      if (chats.length === 0) {
        return m.reply(
          "⚠️ No hay chats registrados para realizar el Broadcast.",
        );
      }

      let sent = 0;

      for (const chat of chats) {
        const jid = chat.id;

        if (!jid || jid === m.chat) continue;

        try {
          await sock.sendMessage(jid, {
            text: `📢 *XERION BOT — BROADCAST*\n\n${message}`,
          });

          sent++;
        } catch (error) {
          console.error(`Error enviando Broadcast a ${jid}:`, error);
        }
      }

      return m.reply(
        `✅ *Broadcast completado.*\n\n📨 Enviados: ${sent}`,
      );
    } catch (error) {
      console.error("Error en Broadcast:", error);

      return m.reply(
        "❌ No se pudo realizar el Broadcast.",
      );
    }
  },
});