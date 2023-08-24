import {useState} from "react";
import TreeView from "../components/common/TreeView.jsx";

function Home() {
    const [nodes, setNodes] = useState([]);

    const getFiberNode = (element) => {
        const instanceId = Object.keys(element).find(
            key => key.startsWith('__reactInternalInstance') || key.startsWith('__reactFiber') ||
                key.startsWith('__reactContainer')
        )
        return element?.[instanceId];
    }

    const getNameFiberNode = (fiberNode) => {
        return fiberNode?.type?.name || fiberNode?.type || 'UNKNOW';
    }

    const getTreeFiberNode = (fiberNode) => {
        if(!fiberNode) return null
        let tree = [];
        const children = getTreeFiberNode(fiberNode?.child) || [];
        tree = [{name: getNameFiberNode(fiberNode), children}];
        if (fiberNode?.sibling) {
            const near = getTreeFiberNode(fiberNode?.sibling);
            tree = [...tree, ...near]
        }
        return tree;
    }

  return (
    <div className="w-full min-h-screen flex gap-10">
      <aside className="w-72 bg-slate-900">
          <TreeView nodes={nodes} />
      </aside>
      <iframe
          onLoad={(event) =>{
              const element = event.target.contentDocument.querySelector('#root > div')
              const fiberNode = getFiberNode(element);
              setNodes(getTreeFiberNode(fiberNode));
          }}
        className="flex flex-1 m-10 rounded-2xl shadow-lg"
        src="/template"
      />
    </div>
  );
}

export default Home;
