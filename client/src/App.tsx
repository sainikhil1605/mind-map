import { useState, useMemo, useCallback } from "react";
import ReactBezier from "react-bezier";
import "./App.css";
import Node from "./components/Node";
import NodeType, { mapPositionType } from "./utils/types/nodeTypes";
import MapType from "./utils/types/mapTypes";
import { v4 as uuidv4 } from "uuid";
function App() {
  const [nodes, setNodes] = useState<NodeType>({
    id: "card1",
    name: "Card 1",
    type: "card",
    x: 70,
    y: 240,
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
                x: 80,
                y: 130,
              },
            ],

            x: 90,
            y: 140,
          },
          {
            id: "card6",
            name: "Card 6",
            parentMapFromPosition: mapPositionType.right,
            parentMapToPosition: mapPositionType.left,
            x: 100,
            y: 150,
          },
        ],
        x: 110,
        y: 150,
      },
      {
        id: "card3",
        name: "Card 3",
        parentMapFromPosition: mapPositionType.right,
        parentMapToPosition: mapPositionType.left,
        x: 120,
        y: 150,
      },
      {
        id: "card4",
        name: "Card 4",
        parentMapFromPosition: mapPositionType.right,
        parentMapToPosition: mapPositionType.left,
        x: 130,
        y: 160,
      },
    ],
  });
  const flattenNodes = useCallback((node: NodeType | NodeType[], arr) => {
    if (!Array.isArray(node)) {
      arr.push(node);
    }
    node?.children?.map((child) => {
      flattenNodes(child, arr);
    });
    return arr;
  }, []);
  const buildMapSettings = useCallback(
    (node: NodeType | NodeType[], arr: MapType[], parentId: string) => {
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
    },
    []
  );
  const parsedNodes = useMemo(() => {
    const arr: NodeType[] = [];
    flattenNodes(nodes, arr);
    return arr;
  }, [flattenNodes, nodes]);
  const mapSettings = useMemo(() => {
    const ar: MapType[] = [];
    buildMapSettings(nodes, ar, nodes.id);
    return ar.slice(1);
  }, [buildMapSettings, nodes]);

  const changeCordinates = (
    nodes: NodeType,
    id: string,
    x: number,
    y: number
  ) => {
    if (!Array.isArray(nodes)) {
      if (nodes.id === id) {
        nodes.x = x;
        nodes.y = y;
      }
    }
    nodes?.children?.map((child) => {
      changeCordinates(child, id, x, y);
    });
  };
  const addNewNode = (nodes: NodeType, id: string, position: string) => {
    if (nodes.id === id) {
      nodes.children = nodes.children || [];
      nodes.children.push({
        id: `${uuidv4()}`,
        name: `Enter new node`,
        parentMapFromPosition: mapPositionType[position],
        parentMapToPosition: mapPositionType.left,
        x: nodes?.x + 10,
        y: 0,
      });
      mapSettings.push({
        from: id, // Parent node ID
        to: `${id}1`, // New node ID
        positions: {
          start: {
            side: mapPositionType[position],
          },
          end: {
            side: mapPositionType.left,
          },
        },
        style: "red",
      });
      return;
    }
    nodes?.children?.map((child) => {
      addNewNode(child, id, position);
    });
  };
  const handleAddNode = (id: string, position: string) => {
    addNewNode(nodes, id, position);
    // console.log(nodes);
    setNodes({ ...nodes });
  };
  const handleDrag = (id: string, ui: any) => {
    const { x, y } = ui;
    changeCordinates(nodes, id, x, y);
    setNodes({ ...nodes });
  };
  const nameChange = (nodes: NodeType, id: string, value: string) => {
    if (nodes.id === id) {
      nodes.name = value;
      return;
    }
    nodes?.children?.map((child) => {
      nameChange(child, id, value);
    });
  };
  const handleNameChange = (e) => {
    nameChange(nodes, e.target.id, e.target.value);
    setNodes({ ...nodes });
  };

  return (
    <>
      <ReactBezier settings={mapSettings}>
        {parsedNodes?.map((node) => (
          <Node
            key={node.id}
            id={node.id}
            name={node.name}
            x={node.x}
            y={node.y}
            handleDrag={handleDrag}
            handleAddNode={handleAddNode}
            handleNameChange={handleNameChange}
          />
        ))}
      </ReactBezier>
    </>
  );
}

export default App;
