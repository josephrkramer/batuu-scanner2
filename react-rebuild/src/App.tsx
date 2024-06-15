import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Logo from "./Logo";
import Crate from "./Crate";
import { CrateDecoder, CrateType } from "./crate-decoder";
import Html5QrcodePlugin from "./Html5QrcodePlugin";
import { Html5QrcodeResult } from "html5-qrcode";
import { CrewManifest } from "./crew-manifest";
import { ChainCodeDecoder } from "./chain-code";
import { BadgeDecoder } from "./badge-decoder";

function App() {
  //read parameters from the url
  const queryString = window.location.search;
  console.log(queryString);
  const urlParams = new URLSearchParams(queryString);

  const [count, setCount] = useState(0);

  const crateDecoder = new CrateDecoder();
  const crewMembers = new CrewManifest();
  const chainCodeDecoder = new ChainCodeDecoder();
  const badgeDecoder = new BadgeDecoder();

  const [crateToDisplay, setCrateToDisplay] = useState(
    crateDecoder.decode("FAL16"),
  );

  const onNewScanResult = (
    decodedText: string,
    decodedResult: Html5QrcodeResult,
  ) => {
    console.log(`Scan result ${decodedText}`, decodedResult);
    //html5QrcodeScanner.clear();

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
        /*
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
          */
        //crateDecoder.setResult(decodedText, badgeDecoder);
        setCrateToDisplay(crateDecoder.decode(decodedText));
      }
    }
  };

  return (
    <>
      <Logo />
      <Crate crate={crateToDisplay} />
      <Html5QrcodePlugin
        fps={10}
        qrbox={250}
        disableFlip={false}
        qrCodeSuccessCallback={onNewScanResult}
      />
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
