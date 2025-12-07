import { MoreOutlined } from "@ant-design/icons";
import {
  Button,
  Dropdown,
  MenuProps,
  message,
  Popconfirm,
  PopconfirmProps,
  Modal,
} from "antd";
import { ChainCodeDecoder } from "../services/chain-code";
import { BadgeDecoder } from "../services/badge-decoder";
import { CrateDecoder } from "../services/crate-decoder";
import React, { useEffect } from "react";

function AdvancedDropdown({
  chainCodeDecoder,
  badgeDecoder,
  crateDecoder,
  scanResult,
  admin,
  setAdmin,
  postPasswordCheck,
  checkThisPassword,
  adminRequested,
  setAdminRequested,
  setAlignment,
}: Readonly<{
  chainCodeDecoder: ChainCodeDecoder;
  badgeDecoder: BadgeDecoder;
  crateDecoder: CrateDecoder;
  scanResult: string | undefined;
  admin: boolean;
  setAdmin: React.Dispatch<React.SetStateAction<boolean>>;
  postPasswordCheck: boolean;
  checkThisPassword: (checkMe: string) => void;
  adminRequested: boolean;
  setAdminRequested: React.Dispatch<React.SetStateAction<boolean>>;
  setAlignment: React.Dispatch<React.SetStateAction<string | undefined>>;
}>) {
  const confirmReset: PopconfirmProps["onConfirm"] = (e) => {
    console.log(e);
    localStorage.clear();
    chainCodeDecoder.reset();
    badgeDecoder.reset();
    crateDecoder.reset();
    message.success("Reset ALL data");
  };

  const confirmNewEvent: PopconfirmProps["onConfirm"] = (e) => {
    console.log(e);
    chainCodeDecoder.reset();
    crateDecoder.reset();
    message.success("Reset crate and chain code data");
  };

  const cancel: PopconfirmProps["onCancel"] = (e) => {
    console.log(e);
    message.error("Data unchanged");
  };

  const confirmAdmin: PopconfirmProps["onConfirm"] = (e) => {
    console.log(e);
    if (admin) {
      setAdmin(false);
      message.success(`Admin mode disabled`);
    } else {
      setAdminRequested(true);
      checkThisPassword("admin");
    }
  };

  /*
  const navigate = useNavigate();
  const confirmExperimental: PopconfirmProps["onConfirm"] = (e) => {
    console.log(e);
    if (admin) {
      message.success(`Experimental functionality enabled.`);
      navigate("/ar/JK_RS.html");
      window.location.reload();
    } else {
      message.error(`Access denied. Admin access required.`);
    }
  };
  */

  useEffect(() => {
    if (
      adminRequested === true &&
      postPasswordCheck &&
      scanResult === undefined
    ) {
      setAdminRequested(false);
      setAdmin(true);
    }
  }, [
    postPasswordCheck,
    scanResult,
    setAdmin,
    adminRequested,
    setAdminRequested,
  ]);

  const resetQuiz = () => {
    setAlignment(undefined);
  };

  const [isCreditsOpen, setIsCreditsOpen] = React.useState(false);

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Popconfirm
          title="New event"
          description="This will reset your scanned crates, chain code, and alignment. All your badges will remain. Do you want to reset for a new event?"
          onConfirm={confirmNewEvent}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
        >
          <Button type="primary">New Event</Button>
        </Popconfirm>
      ),
    },
    {
      key: "2",
      label: (
        <Popconfirm
          title="Reset all data"
          description="This will reset ALL data in the datapad. Are you sure you want to reset all data?"
          onConfirm={confirmReset}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
        >
          <Button danger>Reset</Button>
        </Popconfirm>
      ),
    },
    {
      key: "3",
      label: (
        <Popconfirm
          title="Toggle Admin Mode"
          description="This will change base functionality of the app and is not intended for players. Are you sure you want to continue?"
          onConfirm={confirmAdmin}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
        >
          <Button>Admin</Button>
        </Popconfirm>
      ),
    },
    {
      key: "4",
      label: (
        <Button type="primary" onClick={resetQuiz}>
          Quiz
        </Button>
      ),
    },
    {
      key: "5",
      label: <Button onClick={() => setIsCreditsOpen(true)}>Credits</Button>,
    },
    /*
    {
      key: "6",
      label: (
        <Popconfirm
          title="Experimental Functionality"
          description="This is functionality under active development. Are you sure you want to continue?"
          onConfirm={confirmExperimental}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
        >
          <Button danger>Experimental</Button>
        </Popconfirm>
      ),
    },
    */
  ];

  return (
    <>
      <Dropdown menu={{ items }} placement="bottomRight">
        <Button>
          <MoreOutlined />
        </Button>
      </Dropdown>
      <Modal
        title="Credits"
        open={isCreditsOpen}
        onCancel={() => setIsCreditsOpen(false)}
        footer={[
          <Button key="close" onClick={() => setIsCreditsOpen(false)}>
            Close
          </Button>,
        ]}
      >
        <p>
          "Ahsoka" (
          <a
            href="https://skfb.ly/6UAvY"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://skfb.ly/6UAvY
          </a>
          ) by inkrose is licensed under Creative Commons Attribution (
          <a
            href="http://creativecommons.org/licenses/by/4.0/"
            target="_blank"
            rel="noopener noreferrer"
          >
            http://creativecommons.org/licenses/by/4.0/
          </a>
          ).
        </p>
        <p>
          x-wing by Alberto Calvo [CC-BY] (
          <a
            href="https://creativecommons.org/licenses/by/3.0/"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://creativecommons.org/licenses/by/3.0/
          </a>
          ) via Poly Pizza (
          <a
            href="https://poly.pizza/m/d6Xadlg51aC"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://poly.pizza/m/d6Xadlg51aC
          </a>
          )
        </p>
      </Modal>
    </>
  );
}

export default AdvancedDropdown;
