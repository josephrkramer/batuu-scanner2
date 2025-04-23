import { Button } from "antd";
import { BadgeCode, BadgeDecoder } from "../services/badge-decoder";

function D3O9Button({
  admin,
  badgeDecoder,
}: Readonly<{ admin: boolean; badgeDecoder: BadgeDecoder }>) {
  if (admin || badgeDecoder.earnedBadges.has(BadgeCode.D3_O9)) {
    return (
      <Button
        color="orange"
        variant="solid"
        size="large"
        onClick={() => {
          window.location.assign(
            "https://files.bpcontent.cloud/2025/04/06/16/20250406164353-JHMEAR3I.html",
          );
        }}
      >
        Chat with D3-O9
      </Button>
    );
  } else {
    return null;
  }
}

export default D3O9Button;
