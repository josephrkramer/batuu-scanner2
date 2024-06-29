import { Card, List, Typography, Image } from "antd";
import { CrewMember } from "./crew-manifest";
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
    const list = (
      <List
        itemLayout="horizontal"
        dataSource={dataSource}
        size="small"
        //bordered
        header={<Typography.Title level={4}>{crewType}</Typography.Title>}
        key={crewType}
        renderItem={(crewMember) => (
          <List.Item>
            <Image
              src={crewMember.image}
              width={50}
              preview={{
                imageRender: () => (
                  <div>
                    <Image src={crewMember.image} preview={false} />
                    <Typography.Title level={3}>
                      {crewMember.name}
                    </Typography.Title>
                    {crewMemberAttribute("Occupation", crewMember.occupation)}
                    {crewMemberAttribute("Affiliation", crewMember.affiliation)}
                    {crewMemberAttribute("Homeworld", crewMember.homeworld)}
                    {crewMemberAttribute("Companion", crewMember.companion)}
                    {crewMemberAttribute("Vehicle", crewMember.vehicle)}
                    {crewMemberAttribute("Species", crewMember.species)}
                  </div>
                ),
                toolbarRender: () => null,
              }}
            />
            <Typography.Text>{crewMember.name}</Typography.Text>
          </List.Item>
        )}
      />
    );
    crewDisplayList.push(list);
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
    <br/>
    </>
  );
}
