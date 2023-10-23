"use client";
import TreeItem from "./treeItem";
import { TreeEntry } from "./types";
import { getChildrenSelectedStatus, treeHelper } from "./util";

const Tree = ({
  data,
  selectedIds,
  onSelectionChange,
}: {
  data: TreeEntry[];
  selectedIds: number[];
  onSelectionChange: (newValues: number[]) => void;
}) => {
  return (
    <ul>
      {data.map((entry) => (
        <li key={entry.key}>
          <TreeItem
            data={entry}
            depth={0}
            selectedIds={selectedIds}
            onSelectionChange={onSelectionChange}
            parents={[]}
          />
        </li>
      ))}
    </ul>
  );
};

export default Tree;
