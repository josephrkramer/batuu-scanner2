import { SetStateAction, useEffect, useMemo, useState } from "react";
import "./App.css";
import Logo from "./components/Logo";
import Crate from "./components/Crate";
import {
  CrateDecoder,
  CrateType,
  CrateContents,
} from "./services/crate-decoder";
import Html5QrcodePlugin from "./components/Html5QrcodePlugin";
import { Html5QrcodeResult } from "html5-qrcode";
import { CrewManifest } from "./services/crew-manifest";
import {
  ChainCodeAlignmentCode,
  ChainCodeDecoder,
  ChainCodePart,
  MAX_CHAIN_CODE_SIZE,
} from "./services/chain-code";
import { Badge, BadgeDecoder, EarnedBadge } from "./services/badge-decoder";
import { Button, ConfigProvider, Flex, theme } from "antd";
import CargoHold from "./components/CargoHold";
import EarnedBadges from "./components/EarnedBadges";
import ChainCodePartResult from "./components/ChainCodePartResult";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { deleteUrlParam } from "./utils/urlHelper";
import { useLocalStorageMap } from "./hooks/useLocalStorageMap";
import { useLocalStorageSet } from "./hooks/useLocalStorageSet";
import ChainCodeButton from "./components/ChainCodeButton";
import ChainCodeValue from "./components/ChainCodeValue";
import CrewManifestDisplay from "./components/CrewManifestDisplay";
import MultipeChoiceCrate from "./components/MultipeChoiceCrate";
import Puzzle from "./components/Puzzle";
import AdvancedDropdown from "./components/AdvancedDropdown";
import { PasswordProtector } from "./services/password-protector";
import PasswordCheck from "./components/PasswordCheck";
import PasswordStatus from "./components/PasswordStatus";
import AlignmentQuestion from "./components/AlignmentQuestion";

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
  const crateDecoder = useMemo(
    () =>
      new CrateDecoder(
        scannedCrates,
        setScannedCrates,
        multipleChoiceScannedCrates,
        setMultipleChoiceScannedCrates,
        renderMultipleChoiceCrateCode,
        setRenderMultipleChoiceCrateCode,
        setCrateToDisplay,
      ),
    [
      scannedCrates,
      setScannedCrates,
      multipleChoiceScannedCrates,
      setMultipleChoiceScannedCrates,
      renderMultipleChoiceCrateCode,
      setRenderMultipleChoiceCrateCode,
      setCrateToDisplay,
    ],
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
  const chainCodeDecoder = useMemo(
    () =>
      new ChainCodeDecoder(chainCode, setRenderChainCodePiece, setChainCode),
    [chainCode, setRenderChainCodePiece, setChainCode],
  );

  const [renderLogo, setRenderLogo] = useState(true);
  const [newBadgesEarned, setNewBadgesEarned] = useState<Badge[] | undefined>();
  const [earnedBadges, setEarnedBadges] = useLocalStorageMap(
    "badges",
    new Map<string, EarnedBadge>(),
  );
  const badgeDecoder = useMemo(
    () =>
      new BadgeDecoder(
        newBadgesEarned,
        setNewBadgesEarned,
        setRenderLogo,
        earnedBadges,
        setEarnedBadges,
      ),
    [
      newBadgesEarned,
      setNewBadgesEarned,
      setRenderLogo,
      earnedBadges,
      setEarnedBadges,
    ],
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
  const [scanResultForPuzzle, setScanResultForPuzzle] = useState<
    string | undefined
  >(undefined);

  const [renderPuzzle, setRenderPuzzle] = useState(false);
  const [puzzleSolved, setPuzzleSolved] = useState(false);

  const passwordProtector = new PasswordProtector();

  const [renderPasswordCheck, setRenderPasswordCheck] = useState(false);
  const [postPasswordCheck, setPostPasswordCheck] = useState(false);
  const [passwordToCheck, setPasswordToCheck] = useState<string>("");
  const [passwordStatus, setPasswordStatus] = useState<boolean | undefined>(
    undefined,
  );

  const [alignment, setAlignment] = useLocalStorage<string | undefined>("alignment", undefined);

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

  useEffect(() => {
    if (puzzleSolved && scanResultForPuzzle !== undefined) {
      setPuzzleSolved(false);
      setRenderPuzzle(false);
      crateDecoder.setResult(scanResultForPuzzle, badgeDecoder);
      setScanResultForPuzzle(undefined);
    }
  }, [puzzleSolved, scanResultForPuzzle, crateDecoder, badgeDecoder]);

  const onNewScanResult = (
    decodedText: string,
    decodedResult: Html5QrcodeResult,
  ) => {
    console.log(`Scan result ${decodedText}`, decodedResult);
    setRenderScanner(false);
    setScanResultForPuzzle(decodedText);

    // Password Check Here
    if (passwordProtector.passwords.has(decodedText)) {
      setPostPasswordCheck(false);
      setPasswordToCheck(passwordProtector.passwords.get(decodedText)!);
      displayPasswordCheck();
    } else {
      setPostPasswordCheck(true);
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

  useEffect(() => {
    if (postPasswordCheck && scanResultForPuzzle !== undefined) {
      if (badgeDecoder.isValidBadgeCode(scanResultForPuzzle)) {
        badgeDecoder.add(scanResultForPuzzle);
        setScanResultForPuzzle(undefined);
      } else {
        const crate = crateDecoder.decode(scanResultForPuzzle);

        if (
          chainCodeDecoder.isValidChainCode(scanResultForPuzzle) ||
          crate.type == CrateType.Unknown
        ) {
          if (chainCodeDecoder.isValidChainCode(scanResultForPuzzle)) {
            chainCodeDecoder.setChainCodeResult(
              scanResultForPuzzle,
              badgeDecoder,
            );
          } else {
            crateDecoder.setResult(scanResultForPuzzle, badgeDecoder);
          }
          setScanResultForPuzzle(undefined);
        } else {
          setRenderPuzzle(true);
        }
      }
    }
  }, [
    postPasswordCheck,
    scanResultForPuzzle,
    crateDecoder,
    badgeDecoder,
    chainCodeDecoder,
  ]);

  function homeButton() {
    setRenderLogo(true);
    setRenderScanner(false);
    setCrateToDisplay(undefined);
    setRenderCargoHold(false);
    setNewBadgesEarned(undefined);
    setRenderChainCodePiece(undefined);
    setRenderChainCodeValue(false);
    setRenderCrewMembers(false);
    setRenderPasswordCheck(false);
    setPasswordStatus(undefined);
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
    setRenderPasswordCheck(false);
    setPasswordStatus(undefined);
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
    setRenderPasswordCheck(false);
    setPasswordStatus(undefined);
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
    setRenderPasswordCheck(false);
    setPasswordStatus(undefined);
  }
  function displayPasswordCheck() {
    setRenderLogo(false);
    setRenderScanner(false);
    setCrateToDisplay(undefined);
    setRenderCargoHold(false);
    setNewBadgesEarned(undefined);
    setRenderChainCodePiece(undefined);
    setRenderChainCodeValue(false);
    setRenderCrewMembers(false);
    setRenderPasswordCheck(true);
    setPasswordStatus(undefined);
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
      <Flex justify="flex-end">
        <AdvancedDropdown
          chainCodeDecoder={chainCodeDecoder}
          badgeDecoder={badgeDecoder}
          crateDecoder={crateDecoder}
          setRenderPuzzle={setRenderPuzzle}
          setScanResultForPuzzle={setScanResultForPuzzle}
        />
      </Flex>

      { alignment ? null : <AlignmentQuestion crewManifest={crewMembers} setAlignment={setAlignment} /> }

      <Flex vertical>
        <PasswordStatus passwordCorrect={passwordStatus} />
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
        <PasswordCheck
          renderPasswordCheck={renderPasswordCheck}
          setRenderPasswordCheck={setRenderPasswordCheck}
          passwordToCheck={passwordToCheck}
          setPostPasswordCheck={setPostPasswordCheck}
          setScanResultForPuzzle={setScanResultForPuzzle}
          setPasswordCorrect={setPasswordStatus}
        />
        <Flex vertical gap="small">
          <Button type="primary" size="large" onClick={() => homeButton()}>
            Home
          </Button>
          <Button type="primary" size="large" onClick={() => scanButton()}>
            Scan
          </Button>
          <Button type="primary" size="large" onClick={() => cargoHoldButton()}>
            Cargo Hold
          </Button>
          <Button
            type="primary"
            size="large"
            onClick={() => crewMemberButton()}
          >
            Dossiers
          </Button>
          <ChainCodeButton
            chainCode={chainCode}
            setRenderChainCodeValue={setRenderChainCodeValue}
          />
        </Flex>
      </Flex>
    </ConfigProvider>
  );
}

export default App;
