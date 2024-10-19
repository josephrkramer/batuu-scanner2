import { Card, Typography } from "antd";
import {
  Html5Qrcode,
  Html5QrcodeSupportedFormats,
  QrcodeErrorCallback,
  QrcodeSuccessCallback,
} from "html5-qrcode";
import { useEffect } from "react";

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

const Html5QrcodePlugin = (props: {
  qrCodeSuccessCallback: QrcodeSuccessCallback;
  qrCodeErrorCallback?: QrcodeErrorCallback;
  fps?: number;
  aspectRatio?: number;
  disableFlip?: boolean;
  render?: boolean;
}) => {
  // when component mounts
  useEffect(() => {
    // when component mounts
    const config = {
      fps: props.fps,
      aspectRatio: props.aspectRatio,
      disableFlip: props.disableFlip,
      qrbox: qrboxFunction,
      formatsToSupport: [Html5QrcodeSupportedFormats.AZTEC],
      verbose: true,
    };

    const html5QrCode = new Html5Qrcode(qrcodeRegionId);

    // Suceess callback is required.
    if (!props.qrCodeSuccessCallback) {
      throw new Error("qrCodeSuccessCallback is required callback.");
    }

    html5QrCode.start(
      { facingMode: "environment" },
      config,
      props.qrCodeSuccessCallback,
      props.qrCodeErrorCallback,
    );

    function handleResize() {
      html5QrCode.stop().then(() => {
        html5QrCode.clear();
        html5QrCode.start(
          { facingMode: "environment" },
          config,
          props.qrCodeSuccessCallback,
          props.qrCodeErrorCallback,
        );
      });
    }

    window.addEventListener("resize", handleResize);
    screen.orientation.addEventListener("change", handleResize);

    // cleanup function when component will unmount
    return () => {
      html5QrCode.stop().then(() => {
        html5QrCode.clear();
        window.removeEventListener("resize", handleResize);
        screen.orientation.removeEventListener("change", handleResize);
      });
    };
  }, [props]);

  if (props.render !== undefined && !props.render) {
    return null;
  }

  return (
    <Card>
      <div id={qrcodeRegionId} />
      <Typography.Text>
        To switch cameras, press "Stop Scanning" above and use the "Select
        Camera" drop down menu.
      </Typography.Text>
    </Card>
  );
};

export default Html5QrcodePlugin;
