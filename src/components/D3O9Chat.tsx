import {
  Configuration,
  Fab,
  getClient,
  Webchat,
  WebchatProvider,
} from "@botpress/webchat";
import { buildTheme } from "@botpress/webchat-generator";
import { useState } from "react";

const clientId = "9834e9c9-48c3-4646-8a16-ab4d7e16f950";
const client = getClient({ clientId });

const { theme } = buildTheme({
  themeName: "midnight",
  themeColor: "#f76b15",
});

const configuration: Configuration = {
  color: "#000",
};

const [isWebchatOpen, setIsWebchatOpen] = useState(false);

const toggleWebchat = () => {
  setIsWebchatOpen((prevState) => !prevState);
};

function D3O9Chat() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <WebchatProvider client={client} configuration={configuration}>
        <Fab onClick={toggleWebchat} />
        <div
          style={{
            display: isWebchatOpen ? "block" : "none",
          }}
        >
          <Webchat />
        </div>
      </WebchatProvider>
    </div>
  );
}

export default D3O9Chat;
