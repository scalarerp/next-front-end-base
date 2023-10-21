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

  const filterNodes = (filtered: TreeEntry[], node: TreeEntry) => {
    const children = (node.children || []).reduce(filterNodes, []);

    if (
      // Node's label matches the search string
      node.name.toLocaleLowerCase().indexOf(searchTerm.toLocaleLowerCase()) >
        -1 ||
      // Or a children has a matching node
      children.length
    ) {
      filtered.push({ ...node, children });
    }

    return filtered;
  };

  const data = searchTerm === "" ? mockData : mockData.reduce(filterNodes, []);
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
