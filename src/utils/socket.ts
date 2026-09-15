import makeWASocket, {
  Browsers,
  fetchLatestBaileysVersion,
  type SocketConfig,
  type WASocket,
} from "baileys";

export default async function createSocket(
  config: SocketConfig
): Promise<WASocket> {
  const { version, isLatest } = await fetchLatestBaileysVersion();

  console.log(
    `WhatsApp Web: ${version.join(".")} | latest: ${isLatest}`
  );

  return makeWASocket({
    ...config,
    version,
    browser: Browsers.macOS("Desktop"),
    connectTimeoutMs: 60_000,
    markOnlineOnConnect: false,
    syncFullHistory: false,
  });
}