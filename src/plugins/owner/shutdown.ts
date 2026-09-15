import cmd, { type CommandContext } from "../../commands/map.js";

cmd.add({
  name: "shutdown",
  alias: ["off", "stopbot"],
  category: ["owner"],
  desc: "Apaga XERION BOT por completo.",
  isOwner: true,

  async run({ m }: CommandContext) {
    await m.reply("🛑 *XERION BOT* se está apagando...");

    setTimeout(() => {
      process.exit(0);
    }, 1000);
  },
});