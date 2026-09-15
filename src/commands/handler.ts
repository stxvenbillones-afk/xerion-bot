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

    // Modo Self: solamente el Owner Principal puede utilizar el bot.
    if (
      process.env.isSelf === "true" &&
      senderNumber !== process.env.OWNER
    ) {
      return;
    }

    const messageText = processedMessage.body.trim() || "";
    const parseResult = this.parseCommand(messageText);
    const commandName = parseResult[0];
    const args = parseResult[1];
    const text = args.join(" ") || "";

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
        await Promise.resolve(command.middleware(context));
      }
    }

    if (!this.isCommand(messageText)) return;

    const foundCommand = cmd
      .values()
      .find((plugin: Command) =>
        plugin?.name
          ? plugin.name.toLowerCase().trim() ===
            commandName.toLowerCase().trim()
          : plugin?.alias &&
            plugin.alias
              .map((a: string) => a.toLowerCase().trim())
              .includes(commandName.toLowerCase().trim()),
      );

    if (!foundCommand) return;

    try {
      if (foundCommand.run) {
        if (!this.checkPermissions(foundCommand, processedMessage)) {
          processedMessage.reply(
            "❌ No tienes permiso para utilizar este comando.",
          );
          return;
        }

        await Promise.resolve(foundCommand.run(context));
      }
    } catch (error) {
      console.error(
        `Error executing command '${commandName}':`,
        error,
      );

      processedMessage.reply(
        `❌ Ocurrió un error al ejecutar el comando: ${
          (error as Error).message
        }`,
      );
    }
  }

  private isCommand(text: string): boolean {
    return /^(!|\/|\.)/.test(text);
  }

  private parseCommand(text: string): [string, string[]] {
    const args = text.slice(1).trim().split(/\s+/);
    const commandName = args.shift()?.toLowerCase() || "";
    return [commandName, args];
  }

  private checkPermissions(
    command: Command,
    message: ProcMsg,
  ): boolean {
    const sender = message.sender;
    const senderNumber = sender.split("@")[0];

    // Owner Principal definido en .env
    const isPrincipalOwner =
      senderNumber === process.env.OWNER;

    // El Owner Principal nunca queda bloqueado.
    if (isBanned(sender) && !isPrincipalOwner) {
      return false;
    }

    // Comandos exclusivos de Owner.
    if (command.isOwner && !isOwner(sender)) {
      return false;
    }

    // Comandos de Staff: Staff y Owners pueden utilizarlos.
    if (
      command.isStaff &&
      !isStaff(sender) &&
      !isOwner(sender)
    ) {
      return false;
    }

    // Comandos Premium: Premium, Staff y Owners pueden utilizarlos.
    if (
      command.isPremium &&
      !isPremium(sender) &&
      !isStaff(sender) &&
      !isOwner(sender)
    ) {
      return false;
    }

    // Solo grupos.
    if (command.isGroup && !message.isGroup) {
      return false;
    }

    // Solo privado.
    if (command.isPrivate && message.isGroup) {
      return false;
    }

    // Solo el propio bot.
    if (command.isSelf && !message.fromMe) {
      return false;
    }

    return true;
  }
}

export default new CommandHandler();