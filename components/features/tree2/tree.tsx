"use client";
import { useCallback, useEffect, useState } from "react";
import TreeItem from "./treeItem";
import { TreeEntry, TreeEntryWithUniqueKey } from "./types";
import { addKeys, filterRecursive } from "./util";

const Tree = ({
  data,
  selectedIds,
  onSelectionChange,
  isSingleSelect = false,
}: {
  data: TreeEntry[];
  selectedIds?: (number | string)[];
  onSelectionChange?: (newValues: number[]) => void;
  isSingleSelect?: boolean;
}) => {
  const [dataWithKey, setDataWithKey] = useState<TreeEntryWithUniqueKey[]>([]);
  const [selectedKeys, setselectedKeys] = useState<number[]>([]);
  const handleChangeSelectedKeys = useCallback((newValues: number[]) => {
    if (isSingleSelect) {
      setselectedKeys([newValues[0]]);
      // onSelectionChange(...)
      return;
    }
    // const newSelectedIds = onSelectionChange([]);
    setselectedKeys(newValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const handleSetSearchTerm = useCallback((newValue: string) => {
    setSearchTerm(newValue);
  }, []);

  const dataFiltered =
    searchTerm === "" ? dataWithKey : filterRecursive(dataWithKey, searchTerm);

  useEffect(() => {
    const initialData: TreeEntryWithUniqueKey[] = addKeys(data);
    setDataWithKey(initialData);
  }, [data]);

  return (
    <>
      <label htmlFor="searchTerm">
        Filter:
        <input
          id="searchTerm"
          value={searchTerm}
          onChange={(e) => handleSetSearchTerm(e.target.value)}
        />
      </label>
      <ul>
        {dataFiltered.map((entry) => (
          <li key={entry.key}>
            <TreeItem
              data={entry}
              depth={0}
              selectedKeys={selectedKeys}
              onSelectionChange={handleChangeSelectedKeys}
              parents={[]}
              isSingleSelect={isSingleSelect}
            />
          </li>
        ))}
      </ul>
    </>
  );
};

export default Tree;
