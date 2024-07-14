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

function AdvancedDropdown({
  chainCodeDecoder,
  badgeDecoder,
  crateDecoder,
}: Readonly<{
  chainCodeDecoder: ChainCodeDecoder;
  badgeDecoder: BadgeDecoder;
  crateDecoder: CrateDecoder;
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
