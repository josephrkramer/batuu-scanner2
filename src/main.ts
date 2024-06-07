import { CrateDecoder, CrateType } from "./crate-decoder";
import { CrewManifest, displayCrewManifest } from "./crew-manifest";
import {
  ChainCodeAlignmentCode,
  ChainCodeDecoder,
  displayChainCodeValue,
} from "./chain-code";
import { displayCargoHold } from "./cargo-hold";
import { BadgeDecoder } from "./badge-decoder";
import {
  Html5QrcodeResult,
  Html5QrcodeScanner,
  Html5QrcodeScanType,
  Html5QrcodeSupportedFormats,
} from "html5-qrcode";
import { waitToSolvePuzzle } from "../puzzle/15-puzzle";

//read parameters from the url
const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);

const logo = document.getElementById("logo")!;
const resultsHeader = document.getElementById("results-header")!;
const contentsImage = document.getElementById("contents-image")!;
const cargoHold = document.getElementById("cargo-hold")!;
const puzzle = document.getElementById("puzzle")!;
const crewManifest = document.getElementById("crew-manifest")!;
const crewMemberDiv = document.getElementById("crew-member")!;
const chainCodeDiv = document.getElementById("chain-code")!;
const badgeDiv = document.getElementById("badge-large")!;

const crateDecoder = new CrateDecoder();
const crewMembers = new CrewManifest();
const chainCodeDecoder = new ChainCodeDecoder();
const badgeDecoder = new BadgeDecoder();

console.log(
  `There are ${crateDecoder.getTotalNumberOfType(CrateType.Relic)} relics to be found`,
);

//use the url with ?cargo to load test data into the app
if (urlParams.has("cargo")) {
  console.log("Filling the cargo hold...");
  crateDecoder.addToScanned("FAL11");
  crateDecoder.addToScanned("CD_LM");
  crateDecoder.addToScanned("JK_TU");
  crateDecoder.addToScanned("AB_QR");
  crateDecoder.addToScanned("JK_RS");
}

//TODO: remove this before the event.
if (urlParams.has("everything")) {
  for (const code of crateDecoder.contents.keys()) {
    crateDecoder.addToScanned(code);
  }
  for (let i = 0; i < chainCodeDecoder.MAX_CHAIN_CODE_SIZE; i++) {
    chainCodeDecoder.setChainCodeResult(
      ChainCodeAlignmentCode.Dark,
      badgeDecoder,
    );
  }
}
if (urlParams.has("allbadges") || urlParams.has("everything")) {
  for (const badge of new Set([
    ...badgeDecoder.codeToBadge.keys(),
    ...badgeDecoder.unlistedCodeToBadge.keys(),
  ])) {
    badgeDecoder.add(badge);
  }
}

if (urlParams.has("reset")) {
  crateDecoder.reset();
  badgeDecoder.reset();
  chainCodeDecoder.reset();

  //force a reload of the page that will refresh the cache. Equivalent of Ctl+F5
  window.location.reload();
  //strip ?reset from the url so we don't get in a refresh loop
  const urlParams = new URLSearchParams(window.location.search);
  urlParams.delete("reset");
  window.location.search = urlParams.toString();
}

// ####### Web Cam Scanning #######

// Square QR box with edge size = 70% of the smaller edge of the viewfinder.
const qrboxFunction = function (
  viewfinderWidth: number,
  viewfinderHeight: number,
) {
  const minEdgePercentage = 0.7; // 70%
  const minEdgeSize = Math.min(viewfinderWidth, viewfinderHeight);
  const qrboxSize = Math.floor(minEdgeSize * minEdgePercentage);
  return {
    width: qrboxSize,
    height: qrboxSize,
  };
};

const config = {
  fps: 10,
  qrbox: qrboxFunction,
  rememberLastUsedCamera: true,
  // Only support camera scan type.
  supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
  formatsToSupport: [Html5QrcodeSupportedFormats.AZTEC],
  //a vertical 4:3 aspect ratio
  aspectRatio: 3/4,
};

const html5QrcodeScanner = new Html5QrcodeScanner("qr-reader", config, false);

//allow direct access to the puzzle for testing
if (urlParams.has("puzzle")) {
  console.log("Starting puzzle for testing");
  stopButton();
  logo.style.display = "none";
  puzzle.style.display = "block";
  //start puzzle and wait for success
  await waitToSolvePuzzle().then(
    function () {
      console.log("PUZZLE SUCCESS");
      puzzle.style.display = "none";
    },
    function () {
      console.log("PUZZLE FAILURE");
    },
  );
  stopButton();
}

function startButton() {
  logo.style.display = "none";
  resultsHeader.style.display = "none";
  contentsImage.style.display = "none";
  cargoHold.style.display = "none";
  crewManifest.style.display = "none";
  crewMemberDiv.style.display = "none";
  chainCodeDiv.style.display = "none";
  badgeDiv.style.display = "none";

  function onScanSuccess(
    decodedText: string,
    decodedResult: Html5QrcodeResult,
  ) {
    console.log(`Scan result ${decodedText}`, decodedResult);
    html5QrcodeScanner.clear();

    if (badgeDecoder.isValidBadgeCode(decodedText)) {
      badgeDecoder.add(decodedText);
    } else {
      const crate = crateDecoder.decode(decodedText);

      if (
        chainCodeDecoder.isValidChainCode(decodedText) ||
        crate.type == CrateType.Unknown ||
        urlParams.has("debug")
      ) {
        if (chainCodeDecoder.isValidChainCode(decodedText)) {
          chainCodeDecoder.setChainCodeResult(decodedText, badgeDecoder);
        } else {
          crateDecoder.setResult(decodedText, badgeDecoder);
        }
      } else {
        //start puzzle and wait for success
        puzzle.style.display = "block";
        waitToSolvePuzzle().then(
          function () {
            console.log("PUZZLE SUCCESS");
            crateDecoder.setResult(decodedText, badgeDecoder);
            puzzle.style.display = "none";
          },
          function () {
            console.log("PUZZLE FAILURE");
          },
        );
      }
    }
  }
  html5QrcodeScanner.render(onScanSuccess, undefined);
  puzzle.style.display = "none";
}

function stopButton() {
  logo.style.display = "block";
  resultsHeader.style.display = "none";
  contentsImage.style.display = "none";
  cargoHold.style.display = "none";
  html5QrcodeScanner.clear();
  puzzle.style.display = "none";
  crewManifest.style.display = "none";
  crewMemberDiv.style.display = "none";
  chainCodeDiv.style.display = "none";
  badgeDiv.style.display = "none";
}

function cargoHoldButton() {
  logo.style.display = "none";
  resultsHeader.style.display = "none";
  contentsImage.style.display = "none";
  displayCargoHold(crateDecoder, chainCodeDecoder, badgeDecoder);
  cargoHold.style.display = "block";
  html5QrcodeScanner.clear();
  puzzle.style.display = "none";
  crewManifest.style.display = "none";
  crewMemberDiv.style.display = "none";
  chainCodeDiv.style.display = "none";
  badgeDiv.style.display = "none";
}

function crewManifestButton() {
  logo.style.display = "none";
  resultsHeader.style.display = "none";
  contentsImage.style.display = "none";
  cargoHold.style.display = "none";
  html5QrcodeScanner.clear();
  puzzle.style.display = "none";
  crewManifest.style.display = "block";
  crewMemberDiv.style.display = "none";
  displayCrewManifest(crewMembers);
  chainCodeDiv.style.display = "none";
  badgeDiv.style.display = "none";
}

function decodeChainCodeButton() {
  logo.style.display = "none";
  resultsHeader.style.display = "none";
  contentsImage.style.display = "none";
  cargoHold.style.display = "none";
  html5QrcodeScanner.clear();
  puzzle.style.display = "none";
  crewManifest.style.display = "none";
  crewMemberDiv.style.display = "none";
  chainCodeDiv.style.display = "block";
  displayChainCodeValue(chainCodeDecoder);
  badgeDiv.style.display = "none";
}

document.getElementById("start-button")!.addEventListener("click", () => {
  startButton();
});

document.getElementById("stop-button")!.addEventListener("click", () => {
  stopButton();
});

document.getElementById("scanned-button")!.addEventListener("click", () => {
  cargoHoldButton();
});

document
  .getElementById("crew-manifest-button")!
  .addEventListener("click", () => {
    crewManifestButton();
  });

document
  .getElementById("decode-chain-code-button")!
  .addEventListener("click", () => {
    decodeChainCodeButton();
  });
