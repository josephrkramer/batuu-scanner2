import { Button, Card, Row } from "antd";
import {
  Html5Qrcode,
  Html5QrcodeSupportedFormats,
  QrcodeErrorCallback,
  QrcodeSuccessCallback,
} from "html5-qrcode";
import { useEffect, useState } from "react";

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
  const [rearCamera, setRearCamera] = useState(true);
  const [torchEnabled, setTorchEnabled] = useState(false);

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

    function startCamera() {
      html5QrCode
        .start(
          { facingMode: rearCamera ? "environment" : "user" },
          config,
          props.qrCodeSuccessCallback,
          props.qrCodeErrorCallback,
        )
        .then(() => {
          //Handle torch toggle after camera scanning is initiated
          const torch = html5QrCode
            .getRunningTrackCameraCapabilities()
            .torchFeature();
          if (torch.isSupported()) {
            torch.apply(torchEnabled);
          }
        });
    }

    startCamera();

    function handleResize() {
      html5QrCode.stop().then(() => {
        html5QrCode.clear();
        startCamera();
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
  }, [props, rearCamera, torchEnabled]);

  if (props.render !== undefined && !props.render) {
    return null;
  }

  return (
    <Card>
      <div id={qrcodeRegionId} />
      <Row>
        <Button
          size="large"
          onClick={() => {
            setRearCamera(!rearCamera);
          }}
        >
          Toggle Camera
        </Button>
        <Button
          size="large"
          onClick={() => {
            setTorchEnabled(!torchEnabled);
          }}
        >
          Toggle Torch
        </Button>
      </Row>
    </Card>
  );
};

export default Html5QrcodePlugin;
