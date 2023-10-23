"use client";
import React, { useCallback, useState } from "react";
import { mockData } from "./data";
import Tree from "./tree";

const Tree1Example = () => {
  const [selectedIds, setselectedIds] = useState<(number | string)[]>([]);

  const onSelectionChange = useCallback((newValues: (number | string)[]) => {
    setselectedIds(newValues);
    console.log("seletedIds:", newValues);
  }, []);

  return (
    <>
      <Tree
        data={mockData}
        selectedIds={selectedIds}
        onSelectionChange={onSelectionChange}
        // isSingleSelect={true}
      />
    </>
  );
};

export default Tree1Example;
