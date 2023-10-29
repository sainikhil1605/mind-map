import { useState, useEffect, useMemo } from "react";
import ReactBezier from "react-bezier";
import "./App.css";
import Draggable from "react-draggable";
import Node from "./components/Node";
import NodeType, {
  mapPositionType,
  mapPositionTypeType,
} from "./utils/types/nodeTypes";
import MapType from "./utils/types/mapTypes";
function App() {
  const [count, setCount] = useState(0);
  const [nodes, setNodes] = useState<NodeType[] | NodeType>({
    id: "card1",
    name: "Card 1",
    type: "card",
    children: [
      {
        id: "card2",
        name: "Card 2",
        parentMapFromPosition: mapPositionType.right,
        parentMapToPosition: mapPositionType.left,
        children: [
          {
            id: "card5",
            name: "Card 5",
            parentMapFromPosition: mapPositionType.right,
            parentMapToPosition: mapPositionType.left,
            children: [
              {
                id: "card7",
                name: "Card 7",
                parentMapFromPosition: mapPositionType.right,
                parentMapToPosition: mapPositionType.left,
              },
            ],
          },
          {
            id: "card6",
            name: "Card 6",
            parentMapFromPosition: mapPositionType.right,
            parentMapToPosition: mapPositionType.left,
          },
        ],
      },
      {
        id: "card3",
        name: "Card 3",
        parentMapFromPosition: mapPositionType.right,
        parentMapToPosition: mapPositionType.left,
      },
      {
        id: "card4",
        name: "Card 4",
        parentMapFromPosition: mapPositionType.right,
        parentMapToPosition: mapPositionType.left,
      },
    ],
  });
  // const [parsedNodes, setParsedNodes] = useState<NodeType[]>([]);
  // const [mapSettings, setMapSettings] = useState<MapType[]>([]);
  const flattenNodes = (node: NodeType | NodeType[], arr) => {
    if (!Array.isArray(node)) {
      arr.push(node);
    }
    node?.children?.map((child) => {
      flattenNodes(child, arr);
    });
    return arr;
  };
  const buildMapSettings = (node, arr, parentId) => {
    if (!Array.isArray(node)) {
      arr.push({
        from: parentId,
        to: node.id,
        positions: {
          start: {
            side: node.parentMapFromPosition,
          },
          end: {
            side: node.parentMapToPosition,
          },
        },
        style: "red",
      });
    }
    if (!node) return arr;
    node?.children?.map((child) => {
      buildMapSettings(child, arr, node?.id);
    });
    return arr;
  };
  const parsedNodes = useMemo(() => {
    const arr = [];
    flattenNodes(nodes, arr);
    return arr;
  }, [nodes]);
  const mapSettings = useMemo(() => {
    const ar = [];
    buildMapSettings(nodes, ar, nodes.id);
    return ar.slice(1);
  }, [nodes]);

  const addNewNode = () => {
    setNodes([
      ...nodes,
      {
        id: "card2",
        name: "Card 2",
        type: "card",
      },
    ]);
  };

  console.log(parsedNodes);
  console.log(mapSettings);
  return (
    <>
      <ReactBezier settings={mapSettings}>
        {parsedNodes?.map((node) => (
          <Node key={node.id} id={node.id} name={node.name} />
        ))}
      </ReactBezier>
      <button onClick={() => addNewNode()}>Add New Node</button>
    </>
  );
}

export default App;
