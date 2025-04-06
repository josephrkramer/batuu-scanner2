import { Button } from "antd";
import { BadgeCode, BadgeDecoder } from "../services/badge-decoder";

function D3O9Button({
  admin, badgeDecoder,
}: Readonly<{ admin: boolean, badgeDecoder: BadgeDecoder }>) {
  if (admin || badgeDecoder.earnedBadges.has(BadgeCode.D3_O9)) {
    return (
      <Button
        color="orange"
        variant="solid"
        size="large"
        onClick={() =>
          (window.location.href =
            "https://cdn.botpress.cloud/webchat/v2.2/shareable.html?configUrl=https://files.bpcontent.cloud/2025/01/31/21/20250131211029-1AXZVGYT.json")
        }
      >
        Chat with D3-O9
      </Button>
    );
  } else {
    return null;
  }
}

export default D3O9Button;
