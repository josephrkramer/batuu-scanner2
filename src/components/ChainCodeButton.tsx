import { Button } from "antd";
import { trackEvent } from "../services/analytics";

function ChainCodeButton({
  setRenderChainCodeValue,
  setRenderAlignmentQuestion,
}: Readonly<{
  setRenderChainCodeValue: React.Dispatch<React.SetStateAction<boolean>>;
  setRenderAlignmentQuestion: React.Dispatch<React.SetStateAction<boolean>>;
}>) {
  return (
    <Button
      type="primary"
      size="large"
      onClick={() => {
        setRenderAlignmentQuestion(true);
        setRenderChainCodeValue(true);
        trackEvent(
          "chain_code_button_click",
          "Clicks",
          "ChainCodeButton Clicked - Upload to Rayk",
        );
      }}
    >
      Upload chain code to Rayk
    </Button>
  );
}

export default ChainCodeButton;
