import cmd, { type CommandContext } from "../../commands/map.js";
import { getPermissions } from "../../permissions.js";

cmd.add({
  name: "premium",
  alias: ["premiumlist", "premlist"],
  category: ["owner"],
  desc: "Muestra la lista de usuarios Premium.",
  isOwner: true,

  async run({ m }: CommandContext) {
    const data = getPermissions();

    let text = "💎 *XERION BOT — PREMIUM*\n\n";

    if (data.premium.length === 0) {
      text += "💎 Usuarios Premium: Ninguno";
    } else {
      text += "💎 *Usuarios Premium:*\n\n";

      data.premium.forEach((number, index) => {
        text += `${index + 1}. +${number}\n`;
      });
    }

    return m.reply(text);
  },
});