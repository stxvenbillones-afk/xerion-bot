import dotenv from "dotenv";
dotenv.config();

import { Boom } from "@hapi/boom";
import NodeCache from "@cacheable/node-cache";
import {
  DisconnectReason,
  jidNormalizedUser,
  getAggregateVotesInPollMessage,
  makeCacheableSignalKeyStore,
  proto,
  useMultiFileAuthState,
} from "baileys";

import type {
  SocketConfig,
  WASocket,
  AnyMessageContent,
} from "baileys";

import makeWASocket from "./src/utils/socket.js";
import * as P from "pino";
import qrcode from "qrcode-terminal";
import { procMsg } from "./src/utils/msg.js";
import { prMsg } from "./src/utils/fmt.js";
import CmdRegis from "./src/commands/register.js";
import handler from "./src/commands/handler.js";

interface LocalStore {
  messages: Record<string, any>;
  groupMetadata: Record<string, any>;
  contacts: Record<string, any>;
}

const LocalStore: LocalStore = {
  messages: {},
  groupMetadata: {},
  contacts: {},
};

const logger = P.pino({
  level: "silent",
});

const msgRetryCounterCache = new NodeCache() as any;

const startWhatsApp = async () => {
  async function getMessage(
    key: {
      remoteJid?: string | null;
      id?: string | null;
    }
  ): Promise<proto.IMessage | undefined> {
    if (!key.remoteJid || !key.id) {
      return undefined;
    }

    return proto.Message.fromObject({
      conversation: "test",
    });
  }

  const { state, saveCreds } =
    await useMultiFileAuthState(
      "baileys_auth_info"
    );

  const version: [number, number, number] = [
    2,
    3000,
    1033899626,
  ];

  console.log(
    `Using WhatsApp Web v${version.join(".")}`
  );

  const groupCache = new NodeCache({
    stdTTL: 5 * 60,
    useClones: false,
  });

  const config: SocketConfig = {
    version,

    printQRInTerminal: false,

    logger,

    auth: {
      creds: state.creds,
      keys: makeCacheableSignalKeyStore(
        state.keys,
        logger
      ),
    },

    msgRetryCounterCache,

    generateHighQualityLinkPreview: true,

    getMessage,

    cachedGroupMetadata: async (jid) =>
      Promise.resolve(
        groupCache.get(jid) as any
      ),
  };

  const whatsapp =
    await makeWASocket(config);

  /*
   * =====================================================
   * EVENTOS DE WHATSAPP
   * =====================================================
   */

  whatsapp.ev.process(
    async (events) => {

      /*
       * =================================================
       * CONEXIÓN Y QR
       * =================================================
       */

      if (events["connection.update"]) {
        const update =
          events["connection.update"];

        const {
          connection,
          lastDisconnect,
          qr,
        } = update;

        /*
         * Mostrar QR en los logs de Railway
         */

        if (qr) {
          console.log("");
          console.log(
            "=========================================="
          );
          console.log(
            "📱 ESCANEA ESTE QR CON WHATSAPP"
          );
          console.log(
            "=========================================="
          );

          qrcode.generate(qr, {
            small: true,
          });

          console.log(
            "=========================================="
          );
          console.log("");
          console.log(
            "WhatsApp > Dispositivos vinculados > Vincular dispositivo"
          );
          console.log("");
        }

        /*
         * Conectado
         */

        if (connection === "open") {
          console.log("");
          console.log(
            "=========================================="
          );
          console.log(
            "✅ XERION BOT CONECTADO A WHATSAPP"
          );
          console.log(
            "=========================================="
          );
          console.log("");
        }

        /*
         * Desconexión
         */

        if (connection === "close") {
          const statusCode =
            (lastDisconnect?.error as Boom)
              ?.output?.statusCode;

          console.log(
            "❌ Conexión cerrada:",
            statusCode
          );

          if (
            statusCode !==
            DisconnectReason.loggedOut
          ) {
            console.log(
              "🔄 Reiniciando conexión..."
            );

            setTimeout(() => {
              startWhatsApp();
            }, 3000);
          } else {
            console.log(
              "❌ La sesión fue cerrada. Vuelve a vincular WhatsApp."
            );
          }
        }
      }

      /*
       * =================================================
       * CREDENCIALES
       * =================================================
       */

      if (events["creds.update"]) {
        await saveCreds();
      }

      /*
       * =================================================
       * HISTORIAL
       * =================================================
       */

      if (
        events["messaging-history.set"]
      ) {
        const {
          chats,
          contacts,
          messages,
          isLatest,
          progress,
          syncType,
        } =
          events[
            "messaging-history.set"
          ];

        if (
          syncType ===
          proto.HistorySync
            .HistorySyncType.ON_DEMAND
        ) {
          console.log(
            "Received on-demand history sync"
          );
        }

        console.log(
          `History: ${chats.length} chats, ${contacts.length} contacts, ${messages.length} messages`
        );
      }

      /*
       * =================================================
       * MENSAJES
       * =================================================
       */

      if (events["messages.upsert"]) {
        const upsert =
          events["messages.upsert"];

        if (
          LocalStore.groupMetadata &&
          Object.keys(
            LocalStore.groupMetadata
          ).length < 1
        ) {
          try {
            LocalStore.groupMetadata =
              await whatsapp.groupFetchAllParticipating();
          } catch {
            // Ignorar si todavía no está disponible.
          }
        }

        for (const msg of upsert.messages) {
          const jid =
            msg.key.participant ??
            msg.key.remoteJid;

          if (jid) {
            if (
              !LocalStore.messages[jid]
            ) {
              LocalStore.messages[jid] = [];
            }

            LocalStore.messages[jid].push(
              msg
            );
          }

          if (
            upsert.type !== "notify"
          ) {
            continue;
          }

          const processedMessage =
            await procMsg(
              msg as any,
              whatsapp,
              LocalStore
            );

          if (!processedMessage) {
            continue;
          }

          /*
           * =================================================
           * GRUPOS
           * =================================================
           */

          if (
            processedMessage.isGroup
          ) {
            const store =
              processedMessage.metadata;

            if (store) {
              try {
                const metadata =
                  await whatsapp.groupMetadata(
                    processedMessage.chat
                  );

                if (
                  typeof store.ephemeralDuration ===
                  "undefined"
                ) {
                  store.ephemeralDuration =
                    0;
                }

                if (
                  store.ephemeralDuration !==
                  metadata?.ephemeralDuration
                ) {
                  processedMessage.metadata =
                    metadata;

                  groupCache.set(
                    processedMessage.chat,
                    metadata
                  );
                }
              } catch (error) {
                console.error(
                  "Error obteniendo metadata del grupo:",
                  error
                );
              }
            }
          }

          /*
           * =================================================
           * SEND MESSAGE
           * =================================================
           */

          const originalSendMessage =
            whatsapp.sendMessage.bind(
              whatsapp
            );

          whatsapp.sendMessage =
            async (
              jid: string,
              content: AnyMessageContent,
              options: any = {}
            ) => {
              return originalSendMessage(
                jid,
                content,
                {
                  ...options,

                  ephemeralExpiration:
                    processedMessage.isGroup
                      ? (
                          processedMessage
                            .metadata &&
                          processedMessage
                            .metadata
                            .ephemeralDuration
                        ) || null
                      : (
                          (
                            processedMessage.message as {
                              [key: string]: any;
                            }
                          )[
                            processedMessage
                              .type
                          ]?.contextInfo
                            ?.expiration
                        ) || null,
                }
              );
            };

          /*
           * =================================================
           * COMANDOS
           * =================================================
           */

          await handler.handleCommand(
            processedMessage,
            whatsapp,
            LocalStore
          );

          prMsg(
            processedMessage
          );
        }
      }

      /*
       * =================================================
       * POLLS
       * =================================================
       */

      if (events["messages.update"]) {
        for (const {
          update,
        } of events[
          "messages.update"
        ]) {
          if (update.pollUpdates) {
            const pollCreation:
              proto.IMessage = {};

            if (pollCreation) {
              console.log(
                "Poll update:",
                getAggregateVotesInPollMessage(
                  {
                    message:
                      pollCreation,
                    pollUpdates:
                      update.pollUpdates,
                  }
                )
              );
            }
          }
        }
      }

      /*
       * =================================================
       * CONTACTOS
       * =================================================
       */

      if (events["contacts.upsert"]) {
        for (const contact of events[
          "contacts.upsert"
        ]) {
          const id =
            jidNormalizedUser(
              contact.id
            );

          LocalStore.contacts[id] = {
            ...(contact || {}),
            isContact: true,
          };
        }
      }

      if (events["contacts.update"]) {
        for (const contact of events[
          "contacts.update"
        ]) {
          const id =
            jidNormalizedUser(
              contact.id
            );

          LocalStore.contacts[id] = {
            ...(LocalStore.contacts[id] ||
              {}),
            ...(contact || {}),
          };
        }
      }

      /*
       * =================================================
       * GRUPOS
       * =================================================
       */

      if (events["groups.upsert"]) {
        for (const groupMetadata of events[
          "groups.upsert"
        ]) {
          try {
            groupCache.set(
              groupMetadata.id,
              groupMetadata
            );

            LocalStore.groupMetadata[
              groupMetadata.id
            ] = groupMetadata;
          } catch (error) {
            console.error(
              "Error agregando grupo:",
              error
            );
          }
        }
      }

      if (events["groups.update"]) {
        for (const update of events[
          "groups.update"
        ]) {
          const id = update.id;

          if (!id) {
            continue;
          }

          try {
            const metadata =
              await whatsapp.groupMetadata(
                id
              );

            groupCache.set(
              id,
              metadata
            );

            LocalStore.groupMetadata[id] =
              metadata;
          } catch (error) {
            console.error(
              "Error actualizando grupo:",
              error
            );
          }
        }
      }

      /*
       * =================================================
       * PARTICIPANTES
       * =================================================
       */

      if (
        events[
          "group-participants.update"
        ]
      ) {
        const {
          id,
          participants,
          action,
        } =
          events[
            "group-participants.update"
          ];

        if (id) {
          try {
            const metadata =
              await whatsapp.groupMetadata(
                id
              );

            groupCache.set(
              id,
              metadata
            );

            LocalStore.groupMetadata[id] =
              metadata;
          } catch (error) {
            console.error(
              "Error actualizando participantes:",
              error
            );
          }
        }
      }

      /*
       * =================================================
       * CHATS
       * =================================================
       */

      if (events["chats.delete"]) {
        console.log(
          "Chats eliminados:",
          events["chats.delete"]
        );
      }
    }
  );

  return whatsapp;
};

/*
 * =====================================================
 * CARGAR COMANDOS
 * =====================================================
 */

try {
  await CmdRegis.load();
  await CmdRegis.watch();

  console.log(
    "✅ Comandos cargados correctamente."
  );
} catch (error) {
  console.error(
    "❌ Error cargando comandos:",
    error
  );
}

startWhatsApp();