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
import { Button, ConfigProvider, Flex, theme } from "antd";

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

  const [renderLogo, setRenderLogo] = useState(true);
  const [renderScanner, setRenderScanner] = useState(false);

  function getAspectRatio() {
    const { innerWidth: width, innerHeight: height } = window;

    console.log(screen.orientation.type);
    const ratio = width / height;
    console.log(ratio);

    return ratio;
  }

  const [aspectRatio, setAspectRatio] = useState(getAspectRatio());

  useEffect(() => {
    function handleResize() {
      setAspectRatio(getAspectRatio());
      /*
      if (renderScanner) {
        setRenderScanner(false);
        setRenderScanner(true);
      }
        */
    }

    //window resize
    window.addEventListener("resize", handleResize);
    //phone screen orientation
    screen.orientation.addEventListener("change", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      screen.orientation.removeEventListener("change", handleResize);
    };
  }, []);

  /*
  function handleRotation() {
    if (renderScanner) {
      console.log("APP ROTATION TRIGGERED");
      setRenderScanner(false);
      setRenderScanner(true);
    }
  }

  screen.orientation.addEventListener("change", handleRotation);
  */

  const scannerComp = (
    <Html5QrcodePlugin
      fps={10}
      disableFlip={false}
      qrCodeSuccessCallback={onNewScanResult}
      render={renderScanner}
      aspectRatio={aspectRatio}
    />
  );

  function homeButton() {
    setRenderLogo(true);
    setRenderScanner(false);
    setCrateToDisplay(undefined);
  }
  function scanButton() {
    setRenderLogo(false);
    setRenderScanner(true);
    setCrateToDisplay(undefined);
  }

  return (
    <ConfigProvider
      theme={{
        // 1. Use dark algorithm
        algorithm: theme.darkAlgorithm,

        // 2. Combine dark algorithm and compact algorithm
        // algorithm: [theme.darkAlgorithm, theme.compactAlgorithm],
      }}
    >
      <Flex vertical>
        {renderLogo ? <Logo /> : null}
        <Crate crate={crateToDisplay} />
        {renderScanner ? scannerComp : null}
        <Button type="primary" onClick={() => homeButton()}>
          Home
        </Button>
        <Button type="primary" onClick={() => scanButton()}>
          Scan
        </Button>
      </Flex>
    </ConfigProvider>
  );
}

export default App;
