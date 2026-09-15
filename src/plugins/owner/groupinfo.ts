import cmd, { type CommandContext } from "../../commands/map.js";

cmd.add({
  name: "groupinfo",
  alias: ["infogrupo", "ginfo"],
  category: ["staff"],
  desc: "Muestra información del grupo.",
  isStaff: true,
  isGroup: true,

  async run({ m, sock }: CommandContext) {
    try {
      const metadata = await sock.groupMetadata(m.chat);

      const admins = metadata.participants.filter(
        (p: any) => p.admin === "admin" || p.admin === "superadmin",
      );

      const text =
        `👥 *INFORMACIÓN DEL GRUPO*\n\n` +
        `📛 Nombre: ${metadata.subject}\n` +
        `🆔 ID: ${metadata.id}\n` +
        `👤 Miembros: ${metadata.participants.length}\n` +
        `👑 Administradores: ${admins.length}\n\n` +
        `📝 Descripción:\n${metadata.desc || "Sin descripción"}`;

      return m.reply(text);
    } catch (error) {
      console.error(error);
      return m.reply("❌ No pude obtener la información del grupo.");
    }
  },
});