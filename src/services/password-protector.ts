import { BadgeCode } from "./badge-decoder";

export class PasswordProtector {
  passwords = new Map<string, string>();

  constructor() {
    this.passwords.set("admin", "raithe");
  }
}
