import { useEffect, useState } from "react";
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
import CrewManifestDisplay from "./CrewManifestDisplay";
import MultipeChoiceCrate from "./MultipeChoiceCrate";
import Puzzle from "./Puzzle";

function App() {
  //read parameters from the url
  const queryString = window.location.search;
  console.log(queryString);
  const urlParams = new URLSearchParams(queryString);

  const [crateToDisplay, setCrateToDisplay] = useState<
    CrateContents | undefined
  >();

  const [scannedCrates, setScannedCrates] = useLocalStorageSet(
    "cargo",
    new Set<string>(),
  );
  const [multipleChoiceScannedCrates, setMultipleChoiceScannedCrates] =
    useLocalStorageMap(
      "multipleChoiceScannedCrates",
      new Map<string, CrateContents>(),
    );
  const [renderMultipleChoiceCrateCode, setRenderMultipleChoiceCrateCode] =
    useState<string | undefined>();
  const crateDecoder = new CrateDecoder(
    scannedCrates,
    setScannedCrates,
    multipleChoiceScannedCrates,
    setMultipleChoiceScannedCrates,
    renderMultipleChoiceCrateCode,
    setRenderMultipleChoiceCrateCode,
    setCrateToDisplay,
  );

  const [renderCrewMembers, setRenderCrewMembers] = useState(false);
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

  const [renderScanner, setRenderScanner] = useState(false);

  const [renderPuzzle, setRenderPuzzle] = useState(false);
  const [puzzleSolved, setPuzzleSolved] = useState(false);

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

  //TODO: I think this is wrong
  let tempDecodedText = "";
  useEffect(() => {
    setPuzzleSolved(false);
    setRenderPuzzle(false);
    crateDecoder.setResult(tempDecodedText, badgeDecoder);
  }, [renderPuzzle, tempDecodedText]);

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
        setRenderPuzzle(true);
        tempDecodedText = decodedText;
      }
    }
  };

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
    setRenderCrewMembers(false);
  }
  function scanButton() {
    setRenderLogo(false);
    setRenderScanner(true);
    setCrateToDisplay(undefined);
    setRenderCargoHold(false);
    setNewBadgesEarned(undefined);
    setRenderChainCodePiece(undefined);
    setRenderChainCodeValue(false);
    setRenderCrewMembers(false);
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
    setRenderCrewMembers(false);
  }
  function crewMemberButton() {
    setRenderLogo(false);
    setRenderScanner(false);
    setCrateToDisplay(undefined);
    setRenderCargoHold(false);
    setNewBadgesEarned(undefined);
    setRenderChainCodePiece(undefined);
    setRenderChainCodeValue(false);
    setRenderCrewMembers(true);
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
        <MultipeChoiceCrate
          multipleChoiceCrateCode={renderMultipleChoiceCrateCode}
          crateDecoder={crateDecoder}
          badgeDecoder={badgeDecoder}
          setCrateToDisplay={setCrateToDisplay}
          setRenderMultipleChoiceCrateCode={setRenderMultipleChoiceCrateCode}
        />
        <EarnedBadges
          badges={newBadgesEarned}
          earnedBadgesDatesMap={badgeDecoder.earnedBadges}
        />
        <ChainCodeValue
          render={renderChainCodeValue}
          chainCodeDecoder={chainCodeDecoder}
        />
        <CrewManifestDisplay
          render={renderCrewMembers}
          crewMembers={crewMembers.crew}
        />
        <Puzzle renderPuzzle={renderPuzzle} setPuzzleSolved={setPuzzleSolved} />
        <Button type="primary" onClick={() => homeButton()}>
          Home
        </Button>
        <Button type="primary" onClick={() => scanButton()}>
          Scan
        </Button>
        <Button type="primary" onClick={() => cargoHoldButton()}>
          Cargo Hold
        </Button>
        <Button type="primary" onClick={() => crewMemberButton()}>
          Dossiers
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
