import { LocalStorage } from "node-localstorage";
import { vi } from 'vitest';

global.localStorage = new LocalStorage("./scratch");

// Mock window.gtag for Google Analytics
Object.defineProperty(window, 'gtag', {
  value: vi.fn(),
  writable: true,
});
