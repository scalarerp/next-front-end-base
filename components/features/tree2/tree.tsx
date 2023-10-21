"use client";

import { TreeEntry } from "./types";
import { getChildrenSelectedStatus, treeHelper } from "./util";

interface Props {
  data: TreeEntry;
  depth: number;
  selectedIds: number[];
  onSelectionChange: (selectedIds: number[]) => void;
  parents: TreeEntry[];
}

const Tree2 = ({
  data,
  depth,
  selectedIds,
  onSelectionChange,
  parents = [],
}: Props) => {
  const {
    isSelected,
    selectedStatus,
    currentKeyAndChildIds,
    everyChildrenSelected,
    newSelectedIds,
  } = treeHelper(data, selectedIds);

  const toggleSelect = () => {
    let result: number[] = [];

    if (!everyChildrenSelected) {
      //add
      result = [...newSelectedIds, ...currentKeyAndChildIds];
    }
    if (everyChildrenSelected) {
      //remove
      result = newSelectedIds.filter((x) => !currentKeyAndChildIds.includes(x));
    }

    result = [...new Set(result)];

    //todo passar este for par useCallback ou useMemo
    for (const parent of parents) {
      const parentStatus = getChildrenSelectedStatus(parent, result);
      if (parentStatus === "selected" && !result.includes(parent.key)) {
        result = [parent.key, ...result];
      } else {
        result = result.filter((x) => x !== parent.key);
      }
    }

    onSelectionChange(result);
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
              parents={[data, ...parents]}
            />
          );
        })}
      </li>
    </ul>
  );
};

export default Tree2;
