import { LocalStorage } from "node-localstorage";

Object.defineProperty(window, "localStorage", {
  value: new LocalStorage("./scratch"),
  writable: true,
  configurable: true,
});
