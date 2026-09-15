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

  const sock = makeWASocket({
    ...config,
    version,
    browser: Browsers.macOS("Desktop"),
    connectTimeoutMs: 60_000,
    markOnlineOnConnect: false,
    syncFullHistory: false,
  });

  // Código de vinculación
  if (!sock.authState.creds.registered) {
    const phoneNumber = "18295862297";

    const code = await sock.requestPairingCode(phoneNumber);

    console.log("🔑 Código de vinculación:", code);
  }

  return sock;
}