import { useEffect, useMemo, useState } from "react";
import "./App.css";
import Logo from "./components/Logo";
import Crate from "./components/Crate";
import { CrateDecoder, CrateContents } from "./services/crate-decoder";
import Html5QrcodePlugin from "./components/Html5QrcodePlugin";
import { Html5QrcodeResult } from "html5-qrcode";
import { CrewManifest } from "./services/crew-manifest";
import { ChainCodeDecoder, ChainCodePart } from "./services/chain-code";
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
  if (urlParams.has("reset")) {
    console.log("Clearing local storage...");
    localStorage.clear();
    //delete param to ensure we don't get into a loop
    deleteUrlParam("reset");
  }

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

  const [admin, setAdmin] = useLocalStorage<boolean>("admin", false);
  const [adminRequested, setAdminRequested] = useState(false);

  const [renderCargoHold, setRenderCargoHold] = useState(false);
  const [sortedCargoHold, setSortedCargoHold] = useState(
    crateDecoder.sortCargoHold(admin),
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
      setRenderCrewMembers(false);
      setRenderPasswordCheck(false);
      setPasswordStatus(undefined);
    }
  }, [renderChainCodeValue]);

  const [renderScanner, setRenderScanner] = useState(false);
  const [scanResult, setScanResult] = useState<string | undefined>(undefined);

  const [renderPuzzle, setRenderPuzzle] = useState(false);
  const [puzzleSolved, setPuzzleSolved] = useState(false);

  const passwordProtector = new PasswordProtector();

  const [renderPasswordCheck, setRenderPasswordCheck] = useState(false);
  const [postPasswordCheck, setPostPasswordCheck] = useState(false);
  const [passwordToCheck, setPasswordToCheck] = useState<string>("");
  const [passwordStatus, setPasswordStatus] = useState<boolean | undefined>(
    undefined,
  );

  const [alignment, setAlignment] = useLocalStorage<string | undefined>(
    "alignment",
    undefined,
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

  //Successfully solving the puzzle after a crate scan
  useEffect(() => {
    if (puzzleSolved && scanResult !== undefined) {
      setPuzzleSolved(false);
      setRenderPuzzle(false);
      crateDecoder.setResult(scanResult, badgeDecoder);
      setScanResult(undefined);
    }
  }, [puzzleSolved, scanResult, crateDecoder, badgeDecoder]);

  const onNewScanResult = (
    decodedText: string,
    decodedResult: Html5QrcodeResult,
  ) => {
    console.log(`Scan result ${decodedText}`, decodedResult);
    setRenderScanner(false);
    setScanResult(decodedText);

    // Password Check Here
    if (passwordProtector.passwords.has(decodedText)) {
      checkThisPassword(decodedText);
    } else {
      setPostPasswordCheck(true);
    }
  };

  function checkThisPassword(checkMe: string) {
    setPostPasswordCheck(false);
    setPasswordToCheck(passwordProtector.passwords.get(checkMe)!);
    displayPasswordCheck();
  }

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
    if (postPasswordCheck && scanResult !== undefined) {
      if (badgeDecoder.isValidBadgeCode(scanResult)) {
        //Badge Scan
        badgeDecoder.add(scanResult);
        setScanResult(undefined);
      } else if (chainCodeDecoder.isValidChainCode(scanResult)) {
        //Chain Code Scan
        chainCodeDecoder.setChainCodeResult(scanResult, badgeDecoder);
        setScanResult(undefined);
      } else if (admin) {
        //Crate Scan as Admin
        //This will skip the puzzle to save time for admins
        crateDecoder.setResult(scanResult, badgeDecoder);
        setScanResult(undefined);
      } else {
        //Crate Scan
        setRenderPuzzle(true);
      }
    }
  }, [
    postPasswordCheck,
    scanResult,
    crateDecoder,
    badgeDecoder,
    chainCodeDecoder,
    admin,
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
    setSortedCargoHold(crateDecoder.sortCargoHold(admin));
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
          scanResult={scanResult}
          setScanResult={setScanResult}
          admin={admin}
          setAdmin={setAdmin}
          postPasswordCheck={postPasswordCheck}
          checkThisPassword={checkThisPassword}
          adminRequested={adminRequested}
          setAdminRequested={setAdminRequested}
        />
      </Flex>

      {alignment ? null : (
        <AlignmentQuestion
          crewManifest={crewMembers}
          setAlignment={setAlignment}
        />
      )}

      <Flex vertical>
        <PasswordStatus passwordCorrect={passwordStatus} />
        {renderLogo ? <Logo /> : null}
        <Crate crate={crateToDisplay} admin={admin} />
        {renderScanner ? scannerComp : null}
        <CargoHold
          render={renderCargoHold}
          sortedCargoHold={sortedCargoHold}
          badgesToDisplay={badgeDecoder.allBadges(admin)}
          earnedBadgesDatesMap={badgeDecoder.earnedBadges}
          chainCode={admin ? chainCodeDecoder.adminChainCode() : chainCode}
          admin={admin}
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
          crewManifest={crewMembers}
          alignment={alignment}
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
          setScanResult={setScanResult}
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
