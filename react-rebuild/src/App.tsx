import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Logo from "./Logo";
import Crate from "./Crate";
import { CrateDecoder, CrateType, CrateContents } from "./crate-decoder";
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

  const crateDecoder = new CrateDecoder();
  const crewMembers = new CrewManifest();
  const chainCodeDecoder = new ChainCodeDecoder();
  const badgeDecoder = new BadgeDecoder();

  const [crateToDisplay, setCrateToDisplay] = useState<
    CrateContents | undefined
  >();

  const onNewScanResult = (
    decodedText: string,
    decodedResult: Html5QrcodeResult,
  ) => {
    console.log(`Scan result ${decodedText}`, decodedResult);
    setRenderScanner(false);

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

  const [renderScanner, setRenderScanner] = useState(true);
  const scannerComp = (
    <Html5QrcodePlugin
      fps={10}
      qrbox={250}
      disableFlip={false}
      qrCodeSuccessCallback={onNewScanResult}
      render={renderScanner}
    />
  );

  return (
    <>
      <Logo />
      <Crate crate={crateToDisplay} />
      {renderScanner ? scannerComp : null}
    </>
  );
}

export default App;
