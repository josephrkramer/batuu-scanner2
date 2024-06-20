import { Card } from "antd";
import {
  Html5QrcodeScanType,
  Html5QrcodeScanner,
  Html5QrcodeSupportedFormats,
} from "html5-qrcode";
import { Html5QrcodeScannerConfig } from "html5-qrcode/esm/html5-qrcode-scanner";
import { useEffect, useLayoutEffect, useState } from "react";
import { unmountComponentAtNode } from "react-dom";

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

    function handleResize() {
      html5QrcodeScanner
        .clear()
        .then(() => {
          html5QrcodeScanner.render(
            props.qrCodeSuccessCallback,
            props.qrCodeErrorCallback,
          );
        })
        .catch((error) => {
          console.error("Failed to clear html5QrcodeScanner. ", error);
        });
    }

    window.addEventListener("resize", handleResize);
    screen.orientation.addEventListener("change", handleResize);

    // cleanup function when component will unmount
    return () => {
      html5QrcodeScanner
        .clear()
        .then(() => {
          window.removeEventListener("resize", handleResize);
          screen.orientation.removeEventListener("change", handleResize);
        })
        .catch((error) => {
          console.error("Failed to clear html5QrcodeScanner. ", error);
        });
    };
  }, [props]);

  if (props.render !== undefined && !props.render) {
    return null;
  }

  const style = {
    width: "85vw",
    height: "85vh",
    minWidth: "85vw",
    maxWidth: "85vw",
  } as React.CSSProperties;
  return (
    //<Card style={style}>
    <div id={qrcodeRegionId} style={style} />
    //</Card>
  );
};

export default Html5QrcodePlugin;
