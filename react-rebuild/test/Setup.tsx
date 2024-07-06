import { useEffect, useState } from "react";
import { useLocalStorageSet } from "../src/useLocalStorageSet";
import { useLocalStorageMap } from "../src/useLocalStorageMap";
import { CrateContents, CrateDecoder } from "../src/crate-decoder";
import { CrewManifest } from "../src/crew-manifest";
import { ChainCodeDecoder, ChainCodePart } from "../src/chain-code";
import { useLocalStorage } from "../src/useLocalStorage";
import { Badge, BadgeDecoder, EarnedBadge } from "../src/badge-decoder";

export function Setup() {
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

  const reset = () => {
    setEarnedBadges(new Map<string, EarnedBadge>());
    setNewBadgesEarned(undefined);
    setRenderLogo(true);
    setScannedCrates(new Set<string>());
    setMultipleChoiceScannedCrates(new Map<string, CrateContents>());
    setRenderMultipleChoiceCrateCode(undefined);
    setCrateToDisplay(undefined);
    setChainCode(new Array<ChainCodePart>());
    setRenderChainCodeValue(false);
  }

  return {
    crateDecoder,
    crewMembers,
    chainCodeDecoder,
    badgeDecoder,
    reset,
  };
}
