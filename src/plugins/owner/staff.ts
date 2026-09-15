import cmd, { type CommandContext } from "../../commands/map.js";
import { getPermissions } from "../../permissions.js";

cmd.add({
  name: "staff",
  alias: ["stafflist"],
  category: ["owner"],
  desc: "Muestra la lista del Staff de XERION BOT.",
  isOwner: true,

  async run({ m }: CommandContext) {
    const data = getPermissions();

    let text = "🛡️ *XERION BOT — STAFF*\n\n";

    if (data.staff.length === 0) {
      text += "🛡️ Staff: Ninguno";
    } else {
      text += "🛡️ *Miembros del Staff:*\n\n";

      data.staff.forEach((number, index) => {
        text += `${index + 1}. +${number}\n`;
      });
    }

    return m.reply(text);
  },
});