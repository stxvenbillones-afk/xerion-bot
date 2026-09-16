import * as fs from "fs";
import * as path from "path";

interface PermissionsData {
  owners: string[];
  admins: string[];
  premium: string[];
  banned: string[];
}

const filePath = path.resolve("permissions.json");

const defaultData: PermissionsData = {
  owners: [],
  admins: [],
  premium: [],
  banned: [],
};

function load(): PermissionsData {
  try {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(
        filePath,
        JSON.stringify(defaultData, null, 2)
      );

      return { ...defaultData };
    }

    return {
      ...defaultData,
      ...JSON.parse(
        fs.readFileSync(filePath, "utf8")
      ),
    };
  } catch {
    return { ...defaultData };
  }
}

function save(data: PermissionsData): void {
  fs.writeFileSync(
    filePath,
    JSON.stringify(data, null, 2)
  );
}

export function getPermissions(): PermissionsData {
  return load();
}

// ═══════════════════════════════════════
// 👑 OWNERS
// ═══════════════════════════════════════

export function isOwner(jid: string): boolean {
  const number = jid.split("@")[0];
  return load().owners.includes(number);
}

export function addOwner(number: string): void {
  const data = load();

  if (!data.owners.includes(number)) {
    data.owners.push(number);
  }

  save(data);
}

export function removeOwner(number: string): void {
  const data = load();

  data.owners = data.owners.filter(
    (x) => x !== number
  );

  save(data);
}

// ═══════════════════════════════════════
// 🛡️ ADMINS
// ═══════════════════════════════════════

export function isAdmin(jid: string): boolean {
  const number = jid.split("@")[0];
  return load().admins.includes(number);
}

export function addAdmin(number: string): void {
  const data = load();

  if (!data.admins.includes(number)) {
    data.admins.push(number);
  }

  save(data);
}

export function removeAdmin(number: string): void {
  const data = load();

  data.admins = data.admins.filter(
    (x) => x !== number
  );

  save(data);
}

// ═══════════════════════════════════════
// ⭐ PREMIUM / VIP
// ═══════════════════════════════════════

export function isPremium(jid: string): boolean {
  const number = jid.split("@")[0];
  return load().premium.includes(number);
}

export function addPremium(number: string): void {
  const data = load();

  if (!data.premium.includes(number)) {
    data.premium.push(number);
  }

  save(data);
}

export function removePremium(number: string): void {
  const data = load();

  data.premium = data.premium.filter(
    (x) => x !== number
  );

  save(data);
}

// ═══════════════════════════════════════
// 🚫 BANEADOS
// ═══════════════════════════════════════

export function isBanned(jid: string): boolean {
  const number = jid.split("@")[0];
  return load().banned.includes(number);
}

export function banBot(number: string): void {
  const data = load();

  if (!data.banned.includes(number)) {
    data.banned.push(number);
  }

  save(data);
}

export function unbanBot(number: string): void {
  const data = load();

  data.banned = data.banned.filter(
    (x) => x !== number
  );

  save(data);
}