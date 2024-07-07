import { useEffect, useState } from "react";
import { useLocalStorageSet } from "../src/hooks/useLocalStorageSet";
import { useLocalStorageMap } from "../src/hooks/useLocalStorageMap";
import { CrateContents, CrateDecoder } from "../src/services/crate-decoder";
import { CrewManifest } from "../src/services/crew-manifest";
import { ChainCodeDecoder, ChainCodePart } from "../src/services/chain-code";
import { useLocalStorage } from "../src/hooks/useLocalStorage";
import { Badge, BadgeDecoder, EarnedBadge } from "../src/services/badge-decoder";

export function Setup() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [renderCrewMembers, setRenderCrewMembers] = useState(false);
  const crewMembers = new CrewManifest();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [renderCargoHold, setRenderCargoHold] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
  };

  return {
    crateDecoder,
    crewMembers,
    chainCodeDecoder,
    badgeDecoder,
    reset,
  };
}
