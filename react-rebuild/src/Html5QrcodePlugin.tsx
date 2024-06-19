import { Card } from "antd";
import { Html5QrcodeScanner } from "html5-qrcode";
import { Html5QrcodeScannerConfig } from "html5-qrcode/esm/html5-qrcode-scanner";
import { useEffect, useLayoutEffect } from "react";
import { unmountComponentAtNode } from "react-dom";

const qrcodeRegionId = "html5qr-code-full-region";

// Creates the configuration object for Html5QrcodeScanner.
const createConfig = (props: {
  fps?: number;
  qrbox?: number;
  aspectRatio?: number;
  disableFlip?: boolean;
}) => {
  const config: Html5QrcodeScannerConfig = {
    fps: undefined,
  };
  if (props.fps) {
    config.fps = props.fps;
  }
  if (props.qrbox) {
    config.qrbox = props.qrbox;
  }
  if (props.aspectRatio) {
    config.aspectRatio = props.aspectRatio;
  }
  if (props.disableFlip !== undefined) {
    config.disableFlip = props.disableFlip;
  }
  return config;
};

const Html5QrcodePlugin = (props: {
  verbose?: any;
  qrCodeSuccessCallback?: any;
  qrCodeErrorCallback?: any;
  fps?: number;
  qrbox?: number;
  aspectRatio?: number;
  disableFlip?: boolean;
  render?: boolean;
}) => {
  let htmlScannerCleanup: Html5QrcodeScanner | undefined = undefined;
  // when component mounts
  useEffect(() => {
    // when component mounts
    const config = createConfig(props);
    const verbose = props.verbose === true;
    const html5QrcodeScanner = new Html5QrcodeScanner(
      qrcodeRegionId,
      config,
      verbose,
    );
    // Suceess callback is required.
    if (!props.qrCodeSuccessCallback) {
      throw "qrCodeSuccessCallback is required callback.";
    }

    html5QrcodeScanner.render(
      props.qrCodeSuccessCallback,
      props.qrCodeErrorCallback,
    );

    // cleanup function when component will unmount
    return () => {
      html5QrcodeScanner.clear().catch((error) => {
        console.error("Failed to clear html5QrcodeScanner. ", error);
      });
    };
  }, []);

  if (!props.render) {
    return null;
  }

  return (
    <Card>
      <div id={qrcodeRegionId} />
    </Card>
  );
};

export default Html5QrcodePlugin;
