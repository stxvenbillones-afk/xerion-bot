import cmd, { type Command } from "./map.js";
import type { ProcMsg } from "../utils/msg.js";
import type { CommandContext } from "./map.js";

import {
  isOwner,
  isAdmin,
  isPremium,
  isBanned,
} from "../permissions.js";

class CommandHandler {
  async handleCommand(
    processedMessage: ProcMsg,
    socket: any,
    store: any,
  ): Promise<void> {
    const sender = processedMessage.sender;

    if (
      process.env.isSelf === "true" &&
      !processedMessage.fromMe
    ) {
      return;
    }

    const messageText =
      processedMessage.body.trim() || "";

    const parseResult =
      this.parseCommand(messageText);

    const commandName = parseResult[0];
    const args = parseResult[1];

    const text =
      args.join(" ") || "";

    const context: CommandContext = {
      m: processedMessage,
      sock: socket,
      store: store,
      text,
      args,
      command: commandName,
      isCmd: this.isCommand(messageText),
    };

    for (const command of cmd.values()) {
      if (command.middleware) {
        await Promise.resolve(
          command.middleware(context)
        );
      }
    }

    if (!this.isCommand(messageText)) {
      return;
    }

    const foundCommand = cmd
      .values()
      .find((plugin: Command) => {
        const name =
          plugin.name
            ?.toLowerCase()
            .trim();

        const aliases =
          plugin.alias?.map(
            (a: string) =>
              a.toLowerCase().trim()
          ) || [];

        const requested =
          commandName
            .toLowerCase()
            .trim();

        return (
          name === requested ||
          aliases.includes(requested)
        );
      });

    if (!foundCommand) {
      return;
    }

    try {
      if (foundCommand.run) {
        const allowed =
          this.checkPermissions(
            foundCommand,
            processedMessage
          );

        if (!allowed) {
          await processedMessage.reply(
            "❌ No tienes permiso para utilizar este comando."
          );

          return;
        }

        await Promise.resolve(
          foundCommand.run(context)
        );
      }
    } catch (error) {
      console.error(
        `Error executing command '${commandName}':`,
        error
      );

      await processedMessage.reply(
        `❌ Ocurrió un error al ejecutar el comando: ${
          (error as Error).message
        }`
      );
    }
  }

  private isCommand(
    text: string
  ): boolean {
    return /^\./.test(text);
  }

  private parseCommand(
    text: string
  ): [string, string[]] {
    const args =
      text
        .slice(1)
        .trim()
        .split(/\s+/);

    const commandName =
      args.shift()
        ?.toLowerCase() || "";

    return [
      commandName,
      args,
    ];
  }

  private checkPermissions(
    command: Command,
    message: ProcMsg,
  ): boolean {
    const sender =
      message.sender;

    /*
     * 👑 OWNER
     *
     * fromMe permite que la cuenta
     * que tiene conectado XERION
     * pueda administrar el bot.
     */
    const owner =
      message.fromMe ||
      isOwner(sender);

    /*
     * 🛡️ ADMIN
     */
    const admin =
      isAdmin(sender);

    /*
     * ⭐ PREMIUM
     */
    const premium =
      isPremium(sender);

    /*
     * 🚫 BANEADO
     *
     * Un Owner puede utilizar
     * el bot aunque aparezca
     * en la lista de baneados.
     */
    if (
      isBanned(sender) &&
      !owner
    ) {
      return false;
    }

    /*
     * 👑 COMANDOS DE OWNER
     */
    if (
      command.isOwner &&
      !owner
    ) {
      return false;
    }

    /*
     * 🛡️ COMANDOS DE ADMIN
     *
     * Owner también tiene acceso.
     */
    if (
      command.isAdmin &&
      !owner &&
      !admin
    ) {
      return false;
    }

    /*
     * ⭐ COMANDOS PREMIUM
     *
     * Owner y Admin también
     * tienen acceso.
     */
    if (
      command.isPremium &&
      !owner &&
      !admin &&
      !premium
    ) {
      return false;
    }

    /*
     * 👥 SOLO GRUPOS
     */
    if (
      command.isGroup &&
      !message.isGroup
    ) {
      return false;
    }

    /*
     * 💬 SOLO PRIVADO
     */
    if (
      command.isPrivate &&
      message.isGroup
    ) {
      return false;
    }

    /*
     * 🤖 SOLO SELF
     */
    if (
      command.isSelf &&
      !message.fromMe
    ) {
      return false;
    }

    return true;
  }
}

export default new CommandHandler();