import Draggable from "react-draggable";
import NodeType from "../../utils/types/nodeTypes";
interface NodePropTypes {
  id: string;
  name: string;
  type?: string;
  x?: number;
  y?: number;
  handleDrag: (id: string, data: any) => void;
  handleAddNode: (id: string, position: string) => void;
  handleNameChange: (e: any) => void;
}
import { GrAddCircle } from "react-icons/gr";

const Node = ({
  id,
  name,
  x,
  y,
  handleDrag,
  handleAddNode,
  handleNameChange,
}: NodePropTypes) => {
  return (
    <Draggable
      position={x != undefined && y != undefined && { x, y }}
      onDrag={(e, ui) => handleDrag(id, ui)}
    >
      <div className="absolute card-container rounded-sm border-spacing-1 border border-red-400 border-solid">
        <GrAddCircle
          id="up-add-arrow"
          className="absolute left-1/2 transform -translate-y-1/2 arrows"
          onClick={() => handleAddNode(id, "top")}
        />

        <input
          className="text-center"
          value={name}
          id={id}
          onChange={handleNameChange}
        />

        <GrAddCircle
          id="left-add-arrow"
          className="absolute left-0 top-1/2 transform -translate-y-1/2 arrows"
          onClick={() => handleAddNode(id, "left")}
        />
        <GrAddCircle
          id="right-add-arrow"
          className="absolute right-0 top-1/2 transform -translate-y-1/2 arrows"
          onClick={() => handleAddNode(id, "right")}
        />
        <GrAddCircle
          id="bottom-add-arrow"
          className="absolute left-1/2 transform -translate-x-1 arrows"
          onClick={() => handleAddNode(id, "bottom")}
        />
      </div>
    </Draggable>
  );
};
export default Node;
