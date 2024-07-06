//import mockLocalStorage from "./mockLocalStorage";
//global.localStorage = mockLocalStorage;

import { LocalStorage } from "node-localstorage";

global.localStorage = new LocalStorage("./scratch");
