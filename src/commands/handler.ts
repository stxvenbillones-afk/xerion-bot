import cmd, { type Command } from "./map.js";
import type { ProcMsg } from "../utils/msg.js";
import type { CommandContext } from "./map.js";

import {
  isOwner,
  isStaff,
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
    const senderNumber = sender.split("@")[0];

    if (
      process.env.isSelf === "true" &&
      !processedMessage.fromMe &&
      senderNumber !== process.env.OWNER
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

        return (
          name ===
            commandName
              .toLowerCase()
              .trim() ||
          aliases.includes(
            commandName
              .toLowerCase()
              .trim()
          )
        );
      });

    if (!foundCommand) {
      return;
    }

    try {
      if (foundCommand.run) {
        if (
          !this.checkPermissions(
            foundCommand,
            processedMessage
          )
        ) {
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

    const senderNumber =
      sender.split("@")[0];

    /*
     * OWNER PRINCIPAL
     *
     * fromMe = mensaje enviado
     * directamente desde la cuenta
     * de WhatsApp vinculada al bot.
     */
    const isPrincipalOwner =
      message.fromMe ||
      senderNumber ===
        process.env.OWNER;

    /*
     * BAN
     */
    if (
      isBanned(sender) &&
      !isPrincipalOwner
    ) {
      return false;
    }

    /*
     * OWNER
     */
    if (
      command.isOwner &&
      !isPrincipalOwner &&
      !isOwner(sender)
    ) {
      return false;
    }

    /*
     * STAFF
     */
    if (
      command.isStaff &&
      !isPrincipalOwner &&
      !isStaff(sender) &&
      !isOwner(sender)
    ) {
      return false;
    }

    /*
     * PREMIUM
     */
    if (
      command.isPremium &&
      !isPrincipalOwner &&
      !isPremium(sender) &&
      !isStaff(sender) &&
      !isOwner(sender)
    ) {
      return false;
    }

    /*
     * GRUPO
     */
    if (
      command.isGroup &&
      !message.isGroup
    ) {
      return false;
    }

    /*
     * PRIVADO
     */
    if (
      command.isPrivate &&
      message.isGroup
    ) {
      return false;
    }

    /*
     * SELF
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