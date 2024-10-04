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
            height={"auto"}
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
          {crewMemberAttribute("Recent sightings", crewMember.npcLocation)}
          {crewMemberBiography("Biography", crewMember.biography)}
        </div>
      ),
    }));
    crewDisplayList.push(
      <div key={crewType}>
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

function crewMemberBiography(text: string, content: string[]) {
  if (isNullOrUndefined(content)) {
    return null;
  }

  const paragraphs = [];
  for (const paragraph of content) {
    paragraphs.push(
      <Typography.Paragraph key={paragraphs.length}>
        {paragraph}
      </Typography.Paragraph>,
    );
  }

  return (
    <>
      <Typography.Text>
        <b>{text}:</b>
      </Typography.Text>
      {paragraphs}
    </>
  );
}
