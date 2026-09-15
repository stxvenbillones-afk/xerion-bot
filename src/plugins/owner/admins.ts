import cmd, { type CommandContext } from "../../commands/map.js";

cmd.add({
  name: "admins",
  alias: ["adminslist", "adminlist"],
  category: ["staff"],
  desc: "Muestra los administradores del grupo.",
  isStaff: true,
  isGroup: true,

  async run({ m, sock }: CommandContext) {
    try {
      const metadata = await sock.groupMetadata(m.chat);

      const admins = metadata.participants.filter(
        (p: any) => p.admin === "admin" || p.admin === "superadmin",
      );

      let text = "👑 *ADMINISTRADORES DEL GRUPO*\n\n";

      admins.forEach((admin: any, index: number) => {
        text += `${index + 1}. @${admin.id.split("@")[0]}\n`;
      });

      return m.reply(text);
    } catch (error) {
      console.error(error);
      return m.reply("❌ No pude obtener los administradores.");
    }
  },
});