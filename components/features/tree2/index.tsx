"use client";
import React, { useCallback, useState } from "react";
import { mockData } from "./data";
import Tree2 from "./tree";

const Tree1Example = () => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const onSelectionChange = useCallback((newValues: number[]) => {
    setSelectedIds(newValues);
    console.log(newValues);
  }, []);

  return (
    <ul>
      {mockData.map((entry) => (
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
  );
};

export default Tree1Example;
