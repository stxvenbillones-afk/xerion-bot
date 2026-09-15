import cmd, { type CommandContext } from "../../commands/map.js";
import { getPermissions } from "../../permissions.js";

cmd.add({
  name: "banned",
  alias: ["banlist", "bannedlist"],
  category: ["owner"],
  desc: "Muestra la lista de usuarios bloqueados de XERION BOT.",
  isOwner: true,

  async run({ m }: CommandContext) {
    const data = getPermissions();

    let text = "🚫 *XERION BOT — USUARIOS BLOQUEADOS*\n\n";

    if (data.banned.length === 0) {
      text += "🚫 Usuarios bloqueados: Ninguno";
    } else {
      text += "🚫 *Usuarios bloqueados:*\n\n";

      data.banned.forEach((number, index) => {
        text += `${index + 1}. +${number}\n`;
      });
    }

    return m.reply(text);
  },
});