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
import {
  ChainCodeAlignmentCode,
  ChainCodeDecoder,
  ChainCodePart,
  MAX_CHAIN_CODE_SIZE,
} from "./chain-code";
import { Badge, BadgeDecoder, EarnedBadge } from "./badge-decoder";
import { Button, ConfigProvider, Flex, theme } from "antd";
import CargoHold from "./CargoHold";
import EarnedBadges from "./EarnedBadges";
import ChainCodePartResult from "./ChainCodePartResult";
import { useLocalStorage } from "./useLocalStorage";
import { deleteUrlParam } from "./urlHelper";
import { useLocalStorageMap } from "./useLocalStorageMap";
import { useLocalStorageSet } from "./useLocalStorageSet";
import ChainCodeButton from "./ChainCodeButton";
import ChainCodeValue from "./ChainCodeValue";

function App() {
  //read parameters from the url
  const queryString = window.location.search;
  console.log(queryString);
  const urlParams = new URLSearchParams(queryString);

  const [scannedCrates, setScannedCrates] = useLocalStorageSet(
    "cargo",
    new Set<string>(),
  );
  const crateDecoder = new CrateDecoder(scannedCrates, setScannedCrates);

  const crewMembers = new CrewManifest();

  const [renderChainCodePiece, setRenderChainCodePiece] = useState<
    ChainCodePart | undefined
  >();
  const [chainCode, setChainCode] = useLocalStorage(
    "chainCode",
    new Array<ChainCodePart>(),
  );
  const chainCodeDecoder = new ChainCodeDecoder(
    chainCode,
    setRenderChainCodePiece,
    setChainCode,
  );
  //setChainCode(chainCodeDecoder.chainCode);
  //https://blog.logrocket.com/using-localstorage-react-hooks/

  const [renderLogo, setRenderLogo] = useState(true);
  const [newBadgesEarned, setNewBadgesEarned] = useState<Badge[] | undefined>();
  const [earnedBadges, setEarnedBadges] = useLocalStorageMap(
    "badges",
    new Map<string, EarnedBadge>(),
  );
  const badgeDecoder = new BadgeDecoder(
    newBadgesEarned,
    setNewBadgesEarned,
    setRenderLogo,
    earnedBadges,
    setEarnedBadges,
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
  //delete param to ensure we don't get into a loop
  if (urlParams.has("cargo")) {
    deleteUrlParam("cargo");
  }

  //TODO: remove this before the event.
  if (urlParams.has("everything")) {
    for (const code of crateDecoder.contents.keys()) {
      crateDecoder.addToScanned(code);
    }
    for (let i = 0; i < MAX_CHAIN_CODE_SIZE; i++) {
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
  //delete param to ensure we don't get into a loop
  if (urlParams.has("everything")) {
    deleteUrlParam("everything");
  }
  //delete param to ensure we don't get into a loop
  if (urlParams.has("allbadges")) {
    deleteUrlParam("allbadges");
  }

  if (urlParams.has("reset")) {
    //strip ?reset from the url so we don't get in a refresh loop
    deleteUrlParam("reset");

    //Try the individual stuff afterwards
    crateDecoder.reset();

    localStorage.clear();
    chainCodeDecoder.reset();
    badgeDecoder.reset();

    //force a reload of the page that will refresh the cache. Equivalent of Ctl+F5
    //window.location.reload();
  }

  const [crateToDisplay, setCrateToDisplay] = useState<
    CrateContents | undefined
  >();
  const [renderCargoHold, setRenderCargoHold] = useState(false);
  const [sortedCargoHold, setSortedCargoHold] = useState(
    crateDecoder.sortCargoHold(),
  );
  const [renderChainCodeValue, setRenderChainCodeValue] = useState(false);
  useEffect(() => {
    if (renderChainCodeValue) {
      setRenderLogo(false);
      setRenderScanner(false);
      setCrateToDisplay(undefined);
      setRenderCargoHold(false);
      setNewBadgesEarned(undefined);
      setRenderChainCodePiece(undefined);
    }
  }, [renderChainCodeValue]);

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
        crateDecoder.setResult(decodedText, badgeDecoder);
        setCrateToDisplay(crateDecoder.decode(decodedText));
      }
    }
  };

  const [renderScanner, setRenderScanner] = useState(false);

  const scannerComp = (
    <Html5QrcodePlugin
      fps={10}
      disableFlip={false}
      qrCodeSuccessCallback={onNewScanResult}
      render={renderScanner}
      aspectRatio={1}
    />
  );

  function homeButton() {
    setRenderLogo(true);
    setRenderScanner(false);
    setCrateToDisplay(undefined);
    setRenderCargoHold(false);
    setNewBadgesEarned(undefined);
    setRenderChainCodePiece(undefined);
    setRenderChainCodeValue(false);
  }
  function scanButton() {
    setRenderLogo(false);
    setRenderScanner(true);
    setCrateToDisplay(undefined);
    setRenderCargoHold(false);
    setNewBadgesEarned(undefined);
    setRenderChainCodePiece(undefined);
    setRenderChainCodeValue(false);
  }
  function cargoHoldButton() {
    setRenderLogo(false);
    setRenderScanner(false);
    setCrateToDisplay(undefined);
    setRenderCargoHold(true);
    setSortedCargoHold(crateDecoder.sortCargoHold());
    setNewBadgesEarned(undefined);
    setRenderChainCodePiece(undefined);
    setRenderChainCodeValue(false);
  }

  return (
    <ConfigProvider
      theme={{
        // 1. Use dark algorithm
        algorithm: theme.darkAlgorithm,

        // 2. Combine dark algorithm and compact algorithm
        // algorithm: [theme.darkAlgorithm, theme.compactAlgorithm],

        components: {
          Image: {
            colorBgMask: "rgba(0, 0, 0, 0.85)",
          },
        },
      }}
    >
      <Flex vertical>
        {renderLogo ? <Logo /> : null}
        <Crate crate={crateToDisplay} />
        {renderScanner ? scannerComp : null}
        <CargoHold
          render={renderCargoHold}
          sortedCargoHold={sortedCargoHold}
          badgesToDisplay={badgeDecoder.allBadges()}
          earnedBadgesDatesMap={badgeDecoder.earnedBadges}
          chainCode={chainCode}
        />
        <ChainCodePartResult chainCodePart={renderChainCodePiece} />
        <EarnedBadges
          badges={newBadgesEarned}
          earnedBadgesDatesMap={badgeDecoder.earnedBadges}
        />
        <ChainCodeValue
          render={renderChainCodeValue}
          chainCodeDecoder={chainCodeDecoder}
        />
        <Button type="primary" onClick={() => homeButton()}>
          Home
        </Button>
        <Button type="primary" onClick={() => scanButton()}>
          Scan
        </Button>
        <Button type="primary" onClick={() => cargoHoldButton()}>
          Cargo Hold
        </Button>
        <ChainCodeButton
          chainCode={chainCode}
          setRenderChainCodeValue={setRenderChainCodeValue}
        />
      </Flex>
    </ConfigProvider>
  );
}

export default App;
