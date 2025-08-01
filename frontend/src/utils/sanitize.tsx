import DOMPurify from "dompurify"; 
import { type User } from "../types/User";

// Sanitize the User object before storing it. Strips a string of any HTML tags or attributes to prevent XSS attacks
export const sanitize = (value: string): string =>
  DOMPurify.sanitize(value, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] }).trim();

// removes the password field to avoid exposing sensitive data.
type safeUser = Omit<User, "password">

export function sanitizeUser (user: User): safeUser {
  const { password: _, ...safeUser } = user;
  return safeUser;
};