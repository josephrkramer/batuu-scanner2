/* global window, console */
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { MindARThree } from "mind-ar/mindar-image-three.prod.js";
import { Compiler } from "mind-ar/mindar-image.prod.js";

// Patch global scope for React component access
window.THREE = { ...THREE };
window.THREE.GLTFLoader = GLTFLoader;
window.MINDAR = {
  IMAGE: {
    MindARThree,
    Compiler,
  },
};

window.dispatchEvent(new Event("mindar-ready"));
console.log("MindAR and Three.js initialized globally via module script.");
