import { Card } from "antd";
import {
  Html5QrcodeScanType,
  Html5QrcodeScanner,
  Html5QrcodeSupportedFormats,
} from "html5-qrcode";
import { Html5QrcodeScannerConfig } from "html5-qrcode/esm/html5-qrcode-scanner";
import { useEffect, useLayoutEffect } from "react";
import { unmountComponentAtNode } from "react-dom";
import useWindowDimensions from "./WindowDimensions";

const qrcodeRegionId = "html5qr-code-full-region";

// Square QR box with edge size = 70% of the smaller edge of the viewfinder.
const qrboxFunction = function (
  viewfinderWidth: number,
  viewfinderHeight: number,
) {
  const minEdgePercentage = 0.7; // 70%
  const minEdgeSize = Math.min(viewfinderWidth, viewfinderHeight);
  const qrboxSize = Math.floor(minEdgeSize * minEdgePercentage);
  return {
    width: qrboxSize,
    height: qrboxSize,
  };
};

// Creates the configuration object for Html5QrcodeScanner.
const createConfig = (props: {
  fps?: number;
  aspectRatio?: number;
  disableFlip?: boolean;
}) => {
  const config: Html5QrcodeScannerConfig = {
    fps: undefined,
    rememberLastUsedCamera: true,
    // Only support camera scan type.
    supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
    formatsToSupport: [Html5QrcodeSupportedFormats.AZTEC],
    qrbox: qrboxFunction,
  };
  if (props.fps) {
    config.fps = props.fps;
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
  aspectRatio?: number;
  disableFlip?: boolean;
  render?: boolean;
}) => {
  const { height, width } = useWindowDimensions();
  // when component mounts
  useEffect(() => {
    // when component mounts
    const config = createConfig(props);
    const verbose = props.verbose === true;
    if (!props.aspectRatio) {
      config.aspectRatio = width / height;
      console.log(`setting aspect ratio to ${config.aspectRatio}`);
    }
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

  const style = {
    width: "80vw",
    height: "80vh",
    minWidth: "80vw",
    maxWidth: "80vw",
  } as React.CSSProperties;
  return (
    //<Card style={style}>
    <div id={qrcodeRegionId} style={style} />
    //</Card>
  );
};

export default Html5QrcodePlugin;
