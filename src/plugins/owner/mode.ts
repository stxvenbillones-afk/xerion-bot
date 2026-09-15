import cmd, { type CommandContext } from "../../commands/map.js";

cmd.add({
  name: "mode",
  alias: ["setmode"],
  category: ["owner"],
  desc: "Cambia el modo de funcionamiento de XERION BOT.",
  isOwner: true,

  async run({ m, args }: CommandContext) {
    const mode = args[0]?.toLowerCase();

    if (!mode || !["public", "self"].includes(mode)) {
      return m.reply(
        "❌ Modo inválido.\n\n" +
        "Usa:\n" +
        "• `.mode public` — Todos pueden usar el bot.\n" +
        "• `.mode self` — Solo el Owner Principal puede usar el bot.",
      );
    }

    process.env.isSelf = mode === "self" ? "true" : "false";

    return m.reply(
      mode === "self"
        ? "🔒 *XERION BOT* ahora está en modo SELF.\n\nSolo el Owner Principal puede utilizarlo."
        : "🌐 *XERION BOT* ahora está en modo PUBLIC.\n\nLos usuarios podrán utilizar los comandos según sus permisos.",
    );
  },
});