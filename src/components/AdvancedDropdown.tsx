import { MoreOutlined } from "@ant-design/icons";
import {
  Button,
  Dropdown,
  MenuProps,
  message,
  Popconfirm,
  PopconfirmProps,
} from "antd";
import { ChainCodeDecoder } from "../services/chain-code";
import { BadgeDecoder } from "../services/badge-decoder";
import { CrateDecoder } from "../services/crate-decoder";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
  const confirmChat: PopconfirmProps["onConfirm"] = (e) => {
    console.log(e);
    if (admin) {
      message.success(`D3-O9 chat enabled.`);
      window.location.href =
        "https://cdn.botpress.cloud/webchat/v2.2/shareable.html?configUrl=https://files.bpcontent.cloud/2025/01/31/21/20250131211029-1AXZVGYT.json";
    } else {
      message.error(`Access denied. Admin access required.`);
    }
  };

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

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Popconfirm
          title="New event"
          description="This will reset your scanned crates and chain code. All your badges will remain. Are you want to reset for a new event?"
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
          description="This will reset ALL data in the datapad. Are you sure to reset all data?"
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
          description="This will change base functionality of the app and is not intended for players. Are you sure want to continue?"
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
        <Popconfirm
          title="Experimental Functionality"
          description="This is functionality under active development. Are you sure want to continue?"
          onConfirm={confirmExperimental}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
        >
          <Button danger>Experimental</Button>
        </Popconfirm>
      ),
    },
    {
      key: "5",
      label: (
        <Popconfirm
          title="Chat Functionality"
          description="This is functionality under active development. Are you sure want to continue?"
          onConfirm={confirmChat}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
        >
          <Button danger>Chat</Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <Dropdown menu={{ items }} placement="bottomRight">
      <Button>
        <MoreOutlined />
      </Button>
    </Dropdown>
  );
}

export default AdvancedDropdown;
