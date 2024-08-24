import {
  Card,
  List,
  Typography,
  Image,
  CollapseProps,
  Collapse,
  Flex,
} from "antd";
import { CrewMember } from "../services/crew-manifest";
import { isNullOrUndefined } from "html5-qrcode/esm/core";

function CrewManifestDisplay(
  props: Readonly<{
    render: boolean;
    crewMembers: Map<string, Array<CrewMember>>;
  }>,
) {
  if (!props.render) {
    return null;
  }

  return (
    <Card>
      <Typography.Title level={3}>Dossiers</Typography.Title>
      {crewDisplay(props.crewMembers)}
    </Card>
  );
}

export default CrewManifestDisplay;

function crewDisplay(crewMembers: Map<string, Array<CrewMember>>) {
  const crewDisplayList = [];
  for (const crewType of crewMembers.keys()) {
    const dataSource = Array.from(crewMembers.get(crewType)!.values());
    const items: CollapseProps["items"] = dataSource.map((crewMember) => ({
      key: crewMember.name,
      label: (
        <Flex justify={"space-evenly"}>
          <Image
            src={crewMember.image}
            width={50}
            preview={{ toolbarRender: () => null }}
          />
          <Typography.Text>{crewMember.name}</Typography.Text>
        </Flex>
      ),
      children: (
        <div>
          <Image
            src={crewMember.image}
            preview={{ toolbarRender: () => null }}
          />
          <Typography.Title level={4}>{crewMember.name}</Typography.Title>
          {crewMemberAttribute("Occupation", crewMember.occupation)}
          {crewMemberAttribute("Affiliation", crewMember.affiliation)}
          {crewMemberAttribute("Homeworld", crewMember.homeworld)}
          {crewMemberAttribute("Companion", crewMember.companion)}
          {crewMemberAttribute("Vehicle", crewMember.vehicle)}
          {crewMemberAttribute("Species", crewMember.species)}
          {crewMemberAttribute("Biography", crewMember.biography)}
        </div>
      ),
    }));
    crewDisplayList.push(
      <div>
        <Typography.Title level={4}>{crewType}</Typography.Title>
        <Collapse items={items} />
      </div>,
    );
  }
  if (crewDisplayList.length == 0) {
    return <List itemLayout="horizontal" dataSource={[]} size="small" />;
  }
  return crewDisplayList;
}

function crewMemberAttribute(text: string, content: string) {
  if (isNullOrUndefined(content) || content === "") {
    return null;
  }
  return (
    <>
      <Typography.Text>
        <b>{text}:</b> {content}
      </Typography.Text>
      <br />
    </>
  );
}
