import { FaRegFolder, FaRegFolderOpen } from "react-icons/fa";
import { PiTextT, PiImage, PiList, PiCircle, PiCursorClick, PiSquare } from "react-icons/pi";
import TreeView, { flattenTree } from "react-accessible-treeview";

const FolderIcon = ({ isOpen }) =>
    isOpen ? (
        <FaRegFolderOpen color="e8a87c" className="icon" />
    ) : (
        <FaRegFolder color="e8a87c" className="icon" />
    );

const FileIcon = ({ filename }) => {
    console.log(filename)
    switch (filename) {
        case 'span':
        case 'p':
        case 'h1':
        case 'h2':
            return <PiTextT color="white" />;
        case 'img':
            return <PiImage color="PiImage" />;
        case 'button':
            return <PiCursorClick color="PiImage" />;
        case 'li':
        case 'ul':
            return <PiList color="PiImage" />;
        case 'svg':
        case 'path':
            return <PiCircle color="PiImage" />;
        default:
            return <PiSquare color="white"  />;
    }
};

function DirectoryTreeView({nodes}) {
    const data = flattenTree({name: 'Wrapper Component', children: nodes});

    return (
        <div className="text-sm text-white p-4">
            <TreeView
                data={data}
                aria-label="directory tree"
                nodeRenderer={({
                   element,
                   isBranch,
                   isExpanded,
                   getNodeProps,
                   level,
               }) => (
                    <div {...getNodeProps()} className="flex flex-row items-center my-2 cursor-pointer" style={{ paddingLeft: 20 * (level - 1) }}>
                        {isBranch ? (
                            <FolderIcon isOpen={isExpanded} />
                        ) : (
                            <FileIcon filename={element.name} />
                        )}
                        <span className="ml-1">{element.name}</span>
                    </div>
                )}
            />
        </div>
    );
}

export default DirectoryTreeView;