import { equals } from "@std/bytes/equals";
import { eq } from "drizzle-orm";
import db, { sessions } from "./schema.ts";

type Session = typeof sessions.$inferSelect;

const alphabet = "abcdefghijklmnopqrstuvwxyz1234567890",
  generateSecureRandomString = () => {
    const bytes = new Uint8Array(24);
    crypto.getRandomValues(bytes);
    let id = "";
    for (let i = 0; i < bytes.length; i++) {
      id += alphabet[bytes[i] >> 3];
    }
    return id;
  },
  hashSecret = async (secret: string): Promise<Uint8Array> => {
    const secretBytes = new TextEncoder().encode(secret),
      secretHashBuffer = await crypto.subtle.digest("SHA-256", secretBytes);
    return new Uint8Array(secretHashBuffer);
  };

const sessionExpiry = 60 * 60 * 24 * 4 * 1000,
  sessionRefreshInterval = 60 * 60 * 1000,
  age = (session: Session) => Date.now() - session.updatedAt.getTime();

const createSession = async () => {
    const id = generateSecureRandomString(),
      secret = generateSecureRandomString(),
      secretHash = await hashSecret(secret);
    await db.insert(sessions)
      .values({ id, secretHash });
    return `${id}.${secret}`;
  },
  refreshSession = async (id: string) => {
    await db.update(sessions)
      .set({ updatedAt: new Date() })
      .where(eq(sessions.id, id));
  },
  invalidateSession = (id: string) => {
    return db.delete(sessions)
      .where(eq(sessions.id, id));
  },
  validateSession = async (token: string) => {
    const [id, secret, ...rest] = token.split(".");
    if (!id || !secret || rest.length) return null;

    const [session] = await db
      .select().from(sessions)
      .where(eq(sessions.id, id));
    if (!session) return null;
    if (age(session) >= sessionExpiry) {
      await invalidateSession(id);
      return null;
    }

    const secretHash = await hashSecret(secret);
    if (!equals(secretHash, session.secretHash)) return null;
    if (age(session) >= sessionRefreshInterval) await refreshSession(id);
    return session;
  };

export { createSession, invalidateSession, validateSession };
