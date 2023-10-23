"use client";
import React, { useCallback, useState } from "react";
import { mockData } from "./data";
import Tree from "./tree";
import { filterRecursive } from "./util";

const Tree1Example = () => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const onSelectionChange = useCallback((newValues: number[]) => {
    setSelectedIds(newValues);
    console.log(newValues);
  }, []);

  const data =
    searchTerm === "" ? mockData : filterRecursive(mockData, searchTerm);

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
      <Tree
        data={data}
        selectedIds={selectedIds}
        onSelectionChange={onSelectionChange}
      />
    </>
  );
};

export default Tree1Example;
