import { LocalStorage } from "node-localstorage";

Object.defineProperty(globalThis, "localStorage", {
  value: new LocalStorage("./scratch"),
  writable: true,
  configurable: true,
});
