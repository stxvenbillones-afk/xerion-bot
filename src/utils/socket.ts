import makeWASocket, {
  Browsers,
  type AnyMessageContent,
  type SocketConfig,
  type WASocket,
} from "baileys";

interface Socket extends WASocket {
  sendMessage: (
    jid: string,
    content: AnyMessageContent,
    options?: any
  ) => Promise<any>;
}

export default async function createSocket(
  config: SocketConfig
): Promise<WASocket> {
  const socketConfig: SocketConfig = {
    ...config,

    // Navegador oficial/canónico para evitar
    // problemas con el código de vinculación.
    browser: Browsers.macOS("Desktop"),
  };

  const sock: WASocket = makeWASocket(socketConfig);

  return sock;
}