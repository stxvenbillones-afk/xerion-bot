import cmd, { type CommandContext } from "../commands/map.js";

cmd.add({
  name: "menu",
  alias: ["help", "list"],
  category: ["info"],
  desc: "Muestra el menú de XERION BOT.",

  async run({ m, args, sock }: CommandContext) {
    const commands = cmd.values();

    // ─────────────────────────────────────────────
    // MENÚ DE UNA CATEGORÍA
    // ─────────────────────────────────────────────
    if (args.length > 0) {
      const targetCategory = args[0]!.toLowerCase();

      // .menu todos
      if (targetCategory === "todos") {
        const allCommands = commands
          .map((command) => {
            const permissions: string[] = [];

            if (command.isOwner) permissions.push("👑 Owner");
            if (command.isStaff) permissions.push("🛡️ Staff");
            if (command.isPremium) permissions.push("⭐ Premium");

            const permissionText =
              permissions.length > 0
                ? `\n┃│ ⋟ ${permissions.join(" • ")}`
                : "";

            return `┃│ ⋟ .${command.name}\n┃│   ${command.desc || "Sin descripción"}${permissionText}`;
          })
          .join("\n\n");

        return m.reply(
          `╭━━━━━━━━━━━━━━━━━━━━━━╮
┃   👻  𝗫𝗘𝗥𝗜𝗢𝗡 𝗕𝗢𝗧  👻
╰━━━━━━━━━━━━━━━━━━━━━━╯

╭┤✦ 𝗧𝗢𝗗𝗢𝗦 𝗟𝗢𝗦 𝗖𝗢𝗠𝗔𝗡𝗗𝗢𝗦
┃╰━━━━━━━━━━━━━━━━━━━━━━

${allCommands}

╰━━━━━━━━━━━━━━━━━━━━━━╯

        𝗣𝗼𝘄𝗲𝗿𝗲𝗱 𝗯𝘆 𝗕𝗶𝗹𝗹𝗼𝗻𝗲𝘀`
        );
      }

      const filteredCommands = commands.filter(
        (command) =>
          command.category &&
          Array.isArray(command.category) &&
          command.category.some(
            (category) =>
              category.toLowerCase() === targetCategory
          )
      );

      if (filteredCommands.length === 0) {
        return m.reply(
          `❌ No existe la categoría *${targetCategory}*.\n\nUsa *.menu* para ver las categorías disponibles.`
        );
      }

      const categoryCommands = filteredCommands
        .map((command) => {
          const permissions: string[] = [];

          if (command.isOwner) permissions.push("👑 Owner");
          if (command.isStaff) permissions.push("🛡️ Staff");
          if (command.isPremium) permissions.push("⭐ Premium");
          if (command.isGroup) permissions.push("👥 Grupo");
          if (command.isPrivate) permissions.push("💬 Privado");

          const permissionText =
            permissions.length > 0
              ? `\n┃│ ⋟ ${permissions.join(" • ")}`
              : "";

          const usage = command.usage
            ? `\n┃│ ⋟ Uso: ${command.usage}`
            : "";

          return `┃│ ⋟ *.${command.name}*
┃│   ${command.desc || "Sin descripción"}${usage}${permissionText}`;
        })
        .join("\n┃│\n");

      return m.reply(
        `╭━━━━━━━━━━━━━━━━━━━━━━╮
┃   👻  𝗫𝗘𝗥𝗜𝗢𝗡 𝗕𝗢𝗧  👻
╰━━━━━━━━━━━━━━━━━━━━━━╯

╭┤✦ 𝗖𝗔𝗧𝗘𝗚𝗢𝗥𝗜́𝗔: ${targetCategory.toUpperCase()}
┃╰━━━━━━━━━━━━━━━━━━━━━━

${categoryCommands}

╰━━━━━━━━━━━━━━━━━━━━━━╯
┃ 📊 Comandos: ${filteredCommands.length}
╰━━━━━━━━━━━━━━━━━━━━━━╯

        𝗣𝗼𝘄𝗲𝗿𝗲𝗱 𝗯𝘆 𝗕𝗶𝗹𝗹𝗼𝗻𝗲𝘀`
      );
    }

    // ─────────────────────────────────────────────
    // CATEGORÍAS
    // ─────────────────────────────────────────────
    const commandsByCategory: {
      [key: string]: any[];
    } = {};

    commands.forEach((command) => {
      if (command.category) {
        command.category.forEach((category) => {
          if (!commandsByCategory[category]) {
            commandsByCategory[category] = [];
          }

          commandsByCategory[category].push(command);
        });
      }
    });

    const categoryInfo: {
      [key: string]: {
        emoji: string;
        description: string;
      };
    } = {
      stickers: {
        emoji: "🎨",
        description: "Crear y editar stickers."
      },

      descargas: {
        emoji: "📥",
        description: "Audio, vídeos, imágenes y multimedia."
      },

      grupos: {
        emoji: "👥",
        description: "Administración y seguridad de grupos."
      },

      ia: {
        emoji: "🤖",
        description: "Herramientas con inteligencia artificial."
      },

      herramientas: {
        emoji: "🧰",
        description: "Consultas e información útil."
      },

      social: {
        emoji: "🎵",
        description: "Perfiles, actividad y música."
      },

      diversion: {
        emoji: "🎭",
        description: "Juegos, memes y entretenimiento."
      },

      general: {
        emoji: "⚙️",
        description: "Información y comandos generales."
      },

      owner: {
        emoji: "👑",
        description: "Administración principal del bot."
      },

      staff: {
        emoji: "🛡️",
        description: "Herramientas del equipo Staff."
      },

      info: {
        emoji: "📜",
        description: "Información de XERION BOT."
      }
    };

    let categoryMenu = "";

    const categories = Object.keys(commandsByCategory).sort();

    for (const category of categories) {
      const categoryCommands =
        commandsByCategory[category]!;

      const info =
        categoryInfo[category.toLowerCase()] || {
          emoji: "📁",
          description: "Comandos del bot."
        };

      categoryMenu += `┃╭ ⋟ \`.menu ${category}\` ${info.emoji}
┃│  ${info.description}
┃│  ${categoryCommands.length} comandos
┃╰━━━─── • ──━━━━
`;
    }

    // ─────────────────────────────────────────────
    // INFORMACIÓN DEL USUARIO
    // ─────────────────────────────────────────────
    const senderNumber =
      m.sender?.split("@")[0] || "Desconocido";

    let rango = "👤 USUARIO";

    if (m.fromMe) {
      rango = "👑 OWNER";
    }

    // ─────────────────────────────────────────────
    // MENÚ PRINCIPAL
    // ─────────────────────────────────────────────
    const menuText = `╭━━━━━━━━━━━━━━━━━━━━━━╮
┃   👻  𝗫𝗘𝗥𝗜𝗢𝗡 𝗕𝗢𝗧  👻
╰━━━━━━━━━━━━━━━━━━━━━━╯

╭┤✦ 𝗜𝗡𝗙𝗢 𝗗𝗘𝗟 𝗕𝗢𝗧
┃
┃  › Prefijo  : 『 . 』
┃  › Nombre   : *XERION BOT*
┃  › Estado   : 🟢 Online
┃  › Comandos : ${commands.length}
┃
╰━━━━━━━━━━━━━━━━━━━━━━╯

╭┤✦ 𝗧𝗨 𝗣𝗘𝗥𝗙𝗜𝗟
┃
┃  › Usuario  : @${senderNumber}
┃  › Rango    : ${rango}
┃  › Admin    : ${m.fromMe ? "✅" : "❌"}
┃
╰━━━━━━━━━━━━━━━━━━━━━━╯

╭┤✦ 𝗠𝗘𝗡𝗨́ 𝗣𝗢𝗥 𝗖𝗔𝗧𝗘𝗚𝗢𝗥𝗜́𝗔𝗦
┃╰━━━━── • ──━━━━
${categoryMenu}
╰━━━━━━━━━━━━━━━━━━━━━━╯

┃ 💡 Usa *.menu [categoría]* para ver sus comandos.
┃ 📚 Usa *.menu todos* para ver todos los comandos.

        𝗣𝗼𝘄𝗲𝗿𝗲𝗱 𝗯𝘆 𝗕𝗶𝗹𝗹𝗼𝗻𝗲𝘀`;

    return m.reply(menuText);
  },
});