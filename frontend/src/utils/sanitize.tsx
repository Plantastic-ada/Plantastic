import DOMPurify from "dompurify"; 
import { type User } from "../types/User";

export const sanitize = (value: string): string =>
  DOMPurify.sanitize(value, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] }).trim();


type safeUser = Omit<User, "password">

export function sanitizeUser (user: User): safeUser {
  const { password, ...safeUser } = user;
  return safeUser;
};