"use client";

import { TreeEntry } from "./types";
import { getSelectedStatus, getAllChildIds } from "./util";

interface Props {
  data: TreeEntry;
  depth: number;
  selectedIds: number[];
  onSelectionChange: (selectedIds: number[]) => void;
}

const Tree2 = ({ data, depth, selectedIds, onSelectionChange }: Props) => {
  const {
    isSelected,
    currentKeyAndChildIds,
    // someChildrenSelected,
    everyChildrenSelected,
    selectedStatus,
    newSelectedIds,
  } = getSelectedStatus(data, selectedIds);

  const toggleSelect = () => {
    if (!everyChildrenSelected) {
      //add
      onSelectionChange([...newSelectedIds, ...currentKeyAndChildIds]);
      return;
    }
    if (everyChildrenSelected) {
      //remove
      onSelectionChange(
        newSelectedIds.filter((x) => !currentKeyAndChildIds.includes(x))
      );
      return;
    }
  };

  return (
    <ul>
      <li>
        <span
          onClick={() => toggleSelect()}
          style={{
            // fontWeight: someChildrenSelected ? "bold" : "normal",
            cursor: "pointer",
            marginLeft: `${depth * 10}px`,
          }}
        >
          <span>
            <input
              type="checkbox"
              checked={selectedStatus === "selected" ? true : false}
              onChange={() => console.log("onchange", data, isSelected)}
              ref={(input) => {
                if (input) {
                  input.indeterminate = selectedStatus === "indeterminate";
                }
              }}
            />
            {data.name} ---- {isSelected ? "isSelected" : "notSelected"} ------{" "}
            {selectedStatus}
          </span>
        </span>
        {data.children?.map((entry) => {
          return (
            <Tree2
              key={entry.key}
              data={entry}
              depth={depth + 1}
              selectedIds={selectedIds}
              onSelectionChange={onSelectionChange}
            />
          );
        })}
      </li>
    </ul>
  );
};

export default Tree2;
