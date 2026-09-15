import cmd, { type CommandContext } from "../../commands/map.js";

cmd.add({
  name: "tagall",
  alias: ["todos", "everyone"],
  category: ["staff"],
  desc: "Menciona a todos los miembros del grupo.",
  isStaff: true,
  isGroup: true,

  async run({ m, sock }: CommandContext) {
    try {
      const metadata = await sock.groupMetadata(m.chat);

      const mentions = metadata.participants.map(
        (p: any) => p.id,
      );

      let text = "📢 *ATENCIÓN A TODOS*\n\n";

      for (const participant of metadata.participants) {
        text += `@${participant.id.split("@")[0]} `;
      }

      await sock.sendMessage(m.chat, {
        text,
        mentions,
      });

      return;
    } catch (error) {
      console.error(error);
      return m.reply("❌ No pude mencionar a los miembros.");
    }
  },
});