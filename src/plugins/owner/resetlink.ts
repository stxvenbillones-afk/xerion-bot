import cmd, { type CommandContext } from "../../commands/map.js";

cmd.add({
  name: "resetlink",
  alias: ["newlink", "revoke"],
  category: ["staff"],
  desc: "Restablece el enlace de invitación del grupo.",
  isStaff: true,
  isGroup: true,

  async run({ m, sock }: CommandContext) {
    try {
      const code = await sock.groupRevokeInvite(m.chat);

      return m.reply(
        "🔗 El enlace de invitación del grupo ha sido restablecido.",
      );
    } catch (error) {
      console.error(error);
      return m.reply("❌ No pude restablecer el enlace.");
    }
  },
});