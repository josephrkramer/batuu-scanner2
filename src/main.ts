import { CrateDecoder, CrateContents, CrateType, addToScanned, setResult } from "./crate-decoder";
import { CrewManifest, displayCrewManifest } from "./crew-manifest";
import { ChainCodeDecoder, setChainCodeResult, checkDecodeButton, setChainCodeValue } from "./chain-code";
import { displayCargoHold } from "./cargo-hold";
import { BadgeDecoder } from "./badge-decoder";
import { Html5QrcodeScanner, Html5QrcodeScanType, Html5QrcodeSupportedFormats } from "html5-qrcode";
import { waitToSolvePuzzle } from "../puzzle/15-puzzle";

/* function docReady(fn: any) {
    // see if DOM is already available
    if (document.readyState === "complete"
        || document.readyState === "interactive") {
        // call on next available tick
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
} */

//read parameters from the url
const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);

const logo = document.getElementById('logo')!;
const resultsHeader = document.getElementById('results-header')!;
const contentsImage = document.getElementById('contents-image')!;
const cargoHold = document.getElementById('cargo-hold')!;
const puzzle = document.getElementById('puzzle')!;
const crewManifest = document.getElementById('crew-manifest')!;
const crewMemberDiv = document.getElementById('crew-member')!;
const chainCodeDiv = document.getElementById('chain-code')!;

const crateDecoder = new CrateDecoder();
const crewMembers = new CrewManifest();
const chainCodeDecoder = new ChainCodeDecoder();
const badgeDecoder = new BadgeDecoder();

//Add custom overrides
crateDecoder.override(new CrateContents({code: 'JK_RS', contents: 'Evan\'s Manifesto', type: CrateType.Relic, image: 'images/halcyon_cargo.jpeg'}));
crateDecoder.override(new CrateContents({code: 'JK_TU', contents: 'Tom\'s Vape Pen', type: CrateType.Relic, image: 'images/ports_of_call.jpeg'}));

console.log(`There are ${crateDecoder.getTotalNumberOfType(CrateType.Relic)} relics to be found`);

//Keep track of the crates scanned so far and don't allow duplicates
//load from local storage
let scannedCrates: Set<string>;
if (localStorage.cargo !== undefined) {
    scannedCrates = new Set<string>(JSON.parse(localStorage.cargo));
} else {
    scannedCrates = new Set<string>();

}
//const scannedCrates = new Set<string>(JSON.parse(localStorage.getItem('cargo')));
console.log(`Cargo hold instantiated from local storage:`);
console.log(scannedCrates);

//load chainCode from local storage
const chainCode = localStorage.chainCode !== undefined ? JSON.parse(localStorage.chainCode) : new Array();
console.log(`Chain code instantiated from local storage:`);
console.log(chainCode);
//check if the decode button should be enabled after an initial load from local storage
checkDecodeButton(chainCode, chainCodeDecoder);

//use the url with ?cargo to load test data into the app
if (urlParams.has('cargo')) {
    console.log("Filling the cargo hold...");
    addToScanned('FAL11', scannedCrates);
    addToScanned('CD_LM', scannedCrates);
    addToScanned('JK_TU', scannedCrates);
    addToScanned('AB_QR', scannedCrates);
    addToScanned('JK_RS', scannedCrates);
}

if (urlParams.has('reset')) {
    //remove our state from local storage
    localStorage.removeItem('cargo');
    localStorage.removeItem('chainCode');
    //remove our state from internal memory
    scannedCrates.clear();
    chainCode.splice(0, chainCode.length);

    badgeDecoder.reset();

    //force a reload of the page that will refresh the cache. Equivalent of Ctl+F5
    window.location.reload();
    //strip ?reset from the url so we don't get in a refresh loop
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.delete('reset');
    window.location.search = urlParams.toString();
}

if (urlParams.has('debug')) {
    //
}


// ####### Web Cam Scanning #######

const config = {
    fps: 10,
    qrbox: { width: 250, height: 250 },
    rememberLastUsedCamera: true,
    // Only support camera scan type.
    supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
    formatsToSupport: [ Html5QrcodeSupportedFormats.AZTEC ],
};

const html5QrcodeScanner = new Html5QrcodeScanner(
        "qr-reader", config, false);

//allow direct access to the puzzle for testing
if (urlParams.has('puzzle')) {
    console.log("Starting puzzle for testing");
    stopButton();
    logo.style.display = 'none';
    puzzle.style.display = 'block';
    //start puzzle and wait for success
    await waitToSolvePuzzle().then(
        function(_value: any) {
            console.log("PUZZLE SUCCESS");
            puzzle.style.display = 'none';
        },
        function(_error: any) {
            console.log("PUZZLE FAILURE");
        }
    );
    stopButton();
}

function startButton() {
    logo.style.display = 'none';
    resultsHeader.style.display = 'none';
    contentsImage.style.display = 'none';
    cargoHold.style.display = 'none';
    crewManifest.style.display = 'none';
    crewMemberDiv.style.display = 'none';
    chainCodeDiv.style.display = 'none';

    function onScanSuccess(decodedText: string, decodedResult: any) {
        console.log(`Scan result ${decodedText}`, decodedResult);
        html5QrcodeScanner.clear();

        const crate = crateDecoder.decode(decodedText);

        if (chainCodeDecoder.isValidChainCode(decodedText) || crate.type == CrateType.Unknown || urlParams.has('debug')) {
            if (chainCodeDecoder.isValidChainCode(decodedText)) {
                setChainCodeResult(decodedText, chainCodeDecoder, chainCode, badgeDecoder);
            } else {
                setResult(decodedText, crateDecoder, scannedCrates, badgeDecoder);
            }
        } else {
            //start puzzle and wait for success
            puzzle.style.display = 'block';
            waitToSolvePuzzle().then(
                function() {
                    console.log("PUZZLE SUCCESS");
                    setResult(decodedText, crateDecoder, scannedCrates, badgeDecoder);
                    puzzle.style.display = 'none';
                },
                function() {
                    console.log("PUZZLE FAILURE");
                }
            );
        }
    }
    html5QrcodeScanner.render(onScanSuccess, undefined);
    puzzle.style.display = 'none';
}

function stopButton() {
    logo.style.display = 'block';
    resultsHeader.style.display = 'none';
    contentsImage.style.display = 'none';
    cargoHold.style.display = 'none';
    html5QrcodeScanner.clear();
    puzzle.style.display = 'none';
    crewManifest.style.display = 'none';
    crewMemberDiv.style.display = 'none';
    chainCodeDiv.style.display = 'none';
}

function cargoHoldButton() {
    logo.style.display = 'none';
    resultsHeader.style.display = 'none';
    contentsImage.style.display = 'none';
    displayCargoHold(crateDecoder, scannedCrates, chainCode, chainCodeDecoder, badgeDecoder);
    cargoHold.style.display = 'block';
    html5QrcodeScanner.clear();
    puzzle.style.display = 'none';
    crewManifest.style.display = 'none';
    crewMemberDiv.style.display = 'none';
    chainCodeDiv.style.display = 'none';
}

function crewManifestButton() {
    logo.style.display = 'none';
    resultsHeader.style.display = 'none';
    contentsImage.style.display = 'none';
    cargoHold.style.display = 'none';
    html5QrcodeScanner.clear();
    puzzle.style.display = 'none';
    crewManifest.style.display = 'block';
    crewMemberDiv.style.display = 'none';
    displayCrewManifest(crewMembers);
    chainCodeDiv.style.display = 'none';
}

function decodeChainCodeButton() {
    logo.style.display = 'none';
    resultsHeader.style.display = 'none';
    contentsImage.style.display = 'none';
    cargoHold.style.display = 'none';
    html5QrcodeScanner.clear();
    puzzle.style.display = 'none';
    crewManifest.style.display = 'none';
    crewMemberDiv.style.display = 'none';
    chainCodeDiv.style.display = 'block';
    setChainCodeValue(chainCode, chainCodeDecoder);
}

document.getElementById('start-button')!.addEventListener('click', () => {
    startButton();
});

document.getElementById('stop-button')!.addEventListener('click', () => {
    stopButton();
});

document.getElementById('scanned-button')!.addEventListener('click', () => {
    cargoHoldButton();
});

document.getElementById('crew-manifest-button')!.addEventListener('click', () => {
    crewManifestButton();
});

document.getElementById('decode-chain-code-button')!.addEventListener('click', () => {
    decodeChainCodeButton();
});