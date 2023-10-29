export const mapPositionType = {
  left: "left",
  right: "right",
  top: "top",
  bottom: "bottom",
};
interface NodeType {
  id: string;
  name: string;
  type?: string;
  children?: NodeType[];
  parent?: NodeType;
  parentMapToPosition?: string;
  parentMapFromPosition?: string;
}

export default NodeType;
