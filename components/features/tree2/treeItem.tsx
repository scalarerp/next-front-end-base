import React, { useCallback, useState } from "react";
import { TreeEntryWithUniqueKey } from "./types";
import { treeHelper, getChildrenSelectedStatus } from "./util";

interface Props {
  data: TreeEntryWithUniqueKey;
  depth: number;
  selectedKeys: number[];
  onSelectionChange: (selectedKeys: number[]) => void;
  parents: TreeEntryWithUniqueKey[];
  isSingleSelect: boolean;
}

const TreeItem = (props: Props) => {
  const {
    data,
    depth,
    selectedKeys,
    onSelectionChange,
    parents = [],
    isSingleSelect = false,
  } = props;
  const {
    // isSelected,
    selectedStatus,
    currentKeyAndChildIds,
    everyChildrenSelected,
    newselectedKeys,
  } = treeHelper(data, selectedKeys);

  // const [expanded, setExpanded] = useState(false);
  // const handleChangeExpanded = useCallback((newValue: boolean) => {
  //   setExpanded(newValue);
  // }, []);

  const toggleSelect = () => {
    let result: number[] = [];

    if (isSingleSelect) {
      console.log(data);
      if (!data.children || data.children.length === 0) {
        onSelectionChange([data.key]);
      } else {
        onSelectionChange([]);
      }
      return;
    }

    if (!everyChildrenSelected) {
      //add
      result = [...newselectedKeys, ...currentKeyAndChildIds];
    }
    if (everyChildrenSelected) {
      //remove
      result = newselectedKeys.filter(
        (x) => !currentKeyAndChildIds.includes(x)
      );
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
            fontWeight: selectedStatus === "notSelected" ? "normal" : "bold",
            cursor: "pointer",
            marginLeft: `${depth * 10}px`,
          }}
        >
          <span>
            {!isSingleSelect && (
              <input
                type="checkbox"
                checked={selectedStatus === "selected" ? true : false}
                onChange={() => console.log("onchange", data)}
                ref={(input) => {
                  if (input) {
                    input.indeterminate = selectedStatus === "indeterminate";
                  }
                }}
              />
            )}
            {data.name}
            {/* ---- {isSelected ? "isSelected" : "notSelected"} ------{" "} */}
            {selectedStatus}
          </span>
        </span>
        {data.children?.map((entry) => {
          return (
            <TreeItem
              key={entry.key}
              data={entry}
              depth={depth + 1}
              selectedKeys={selectedKeys}
              onSelectionChange={onSelectionChange}
              parents={[data, ...parents]}
              isSingleSelect={isSingleSelect}
            />
          );
        })}
      </li>
    </ul>
  );
};

export default TreeItem;
