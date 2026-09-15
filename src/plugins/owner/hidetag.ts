import cmd, { type CommandContext } from "../../commands/map.js";

cmd.add({
  name: "hidetag",
  alias: ["notifyall"],
  category: ["staff"],
  desc: "Menciona a todos sin mostrar las menciones.",
  isStaff: true,
  isGroup: true,

  async run({ m, args, sock }: CommandContext) {
    const text = args.join(" ").trim();

    if (!text) {
      return m.reply(
        "❌ Escribe el mensaje.\n\nEjemplo:\n.hidetag Reunión en 5 minutos.",
      );
    }

    try {
      const metadata = await sock.groupMetadata(m.chat);

      const mentions = metadata.participants.map(
        (p: any) => p.id,
      );

      await sock.sendMessage(m.chat, {
        text,
        mentions,
      });

      return;
    } catch (error) {
      console.error(error);
      return m.reply("❌ No pude realizar el hidetag.");
    }
  },
});