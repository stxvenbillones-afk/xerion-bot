import cmd, { type CommandContext } from "../../commands/map.js";
import { getPermissions } from "../../permissions.js";

cmd.add({
  name: "owners",
  alias: ["ownerlist"],
  category: ["owner"],
  desc: "Muestra la lista de Owners de XERION BOT.",
  isOwner: true,

  async run({ m }: CommandContext) {
    const data = getPermissions();
    const principal = process.env.OWNER || "";

    const owners = data.owners.filter(
      (number) => number !== principal,
    );

    let text = "👑 *XERION BOT — OWNERS*\n\n";

    text += `👑 Owner Principal: +${principal}\n\n`;

    if (owners.length === 0) {
      text += "👑 Owners adicionales: Ninguno";
    } else {
      text += "👑 Owners adicionales:\n";

      owners.forEach((number, index) => {
        text += `${index + 1}. +${number}\n`;
      });
    }

    return m.reply(text);
  },
});