import * as fs from "fs";
import * as path from "path";

interface PermissionsData {
  owners: string[];
  admins: string[];
  premium: string[];
  banned: string[];

  // Compatibilidad con comandos antiguos
  staff: string[];
}

const filePath = path.resolve("permissions.json");

const defaultData: PermissionsData = {
  owners: [],
  admins: [],
  premium: [],
  banned: [],
  staff: [],
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

    const saved = JSON.parse(
      fs.readFileSync(filePath, "utf8")
    );

    const admins =
      Array.isArray(saved.admins)
        ? saved.admins
        : Array.isArray(saved.staff)
          ? saved.staff
          : [];

    return {
      owners: Array.isArray(saved.owners)
        ? saved.owners
        : [],

      admins,

      premium: Array.isArray(saved.premium)
        ? saved.premium
        : [],

      banned: Array.isArray(saved.banned)
        ? saved.banned
        : [],

      // Los comandos antiguos pueden seguir leyendo staff
      staff: admins,
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

// Compatibilidad con comandos antiguos.
// Ya NO existe Owner Principal: todos los Owners son iguales.
export function isOwnerPrincipal(jid: string): boolean {
  return isOwner(jid);
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

  data.staff = data.admins;

  save(data);
}

export function removeAdmin(number: string): void {
  const data = load();

  data.admins = data.admins.filter(
    (x) => x !== number
  );

  data.staff = data.admins;

  save(data);
}

// Compatibilidad con comandos antiguos.
// Staff = Admin internamente.
export function isStaff(jid: string): boolean {
  return isAdmin(jid);
}

export function addStaff(number: string): void {
  addAdmin(number);
}

export function removeStaff(number: string): void {
  removeAdmin(number);
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