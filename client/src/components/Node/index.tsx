import Draggable from "react-draggable";
import NodeType from "../../utils/types/nodeTypes";

const Node = ({ id, name, type }: NodeType) => {
  return (
    <Draggable>
      <div className="border-sky-100">
        <div id={id}>{name}</div>
      </div>
    </Draggable>
  );
};
export default Node;
