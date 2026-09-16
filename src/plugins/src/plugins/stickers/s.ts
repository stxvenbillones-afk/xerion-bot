import cmd, { type CommandContext } from "../../commands/map.js";
import { dlMedia } from "../../utils/msg.js";
import sharp from "sharp";

cmd.add({
  name: "s",
  alias: ["sticker", "st"],
  category: ["stickers"],
  desc: "Convierte una imagen en sticker.",

  async run({ m, sock }: CommandContext) {
    let targetMessage: any = m.message;

    if (m.isQuoted && m.quotedMessage) {
      targetMessage = m.quotedMessage.message;
    }

    const type = m.isQuoted
      ? m.quotedType
      : m.msgType;

    if (
      type !== "imageMessage" &&
      type !== "videoMessage"
    ) {
      return m.reply(
        "❌ Envía o responde a una imagen con *.s*."
      );
    }

    try {
      const buffer = await dlMedia(targetMessage);

      if (!buffer) {
        return m.reply(
          "❌ No pude descargar la imagen."
        );
      }

      const sticker = await sharp(buffer)
        .resize(512, 512, {
          fit: "inside",
          withoutEnlargement: true,
        })
        .webp()
        .toBuffer();

      await sock.sendMessage(
        m.chat,
        {
          sticker,
        },
        {
          quoted: m.message,
        }
      );
    } catch (error) {
      console.error(
        "Error creando sticker:",
        error
      );

      await m.reply(
        "❌ No pude convertir la imagen en sticker."
      );
    }
  },
});