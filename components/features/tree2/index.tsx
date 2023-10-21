"use client";
import React, { useCallback, useState } from "react";
import { mockData } from "./data";
import Tree2 from "./tree";
import { TreeEntry } from "./types";

const Tree1Example = () => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const onSelectionChange = useCallback((newValues: number[]) => {
    setSelectedIds(newValues);
    console.log(newValues);
  }, []);

  //nao é useCallback por que é um reduce
  const recursiveFilterNodes = (
    filteredData: TreeEntry[],
    currentEntry: TreeEntry
  ) => {
    const children = (currentEntry.children || []).reduce(
      recursiveFilterNodes,
      []
    );

    if (
      // Node's label matches the search string
      currentEntry.name
        .toLocaleLowerCase()
        .indexOf(searchTerm.toLocaleLowerCase()) > -1 ||
      // Or a children has a matching node
      children.length
    ) {
      filteredData.push({ ...currentEntry, children });
    }

    return filteredData;
  };

  const data =
    searchTerm === "" ? mockData : mockData.reduce(recursiveFilterNodes, []);

  return (
    <>
      <label htmlFor="searchTerm">
        Filter:{" "}
        <input
          id="searchTerm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </label>
      <ul>
        {data.map((entry) => (
          <li key={entry.key}>
            <Tree2
              data={entry}
              depth={0}
              selectedIds={selectedIds}
              onSelectionChange={onSelectionChange}
              parents={[]}
            />
          </li>
        ))}
      </ul>
    </>
  );
};

export default Tree1Example;
