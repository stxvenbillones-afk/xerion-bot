import cmd, { type CommandContext } from "../../commands/map.js";

cmd.add({
  name: "restart",
  alias: ["reboot"],
  category: ["owner"],
  desc: "Reinicia XERION BOT.",
  isOwner: true,

  async run({ m }: CommandContext) {
    await m.reply("🔄 *XERION BOT* se está reiniciando...");

    setTimeout(() => {
      process.exit(0);
    }, 1000);
  },
});