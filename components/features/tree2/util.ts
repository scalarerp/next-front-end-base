import { SelectedStatus, TreeEntry } from "./types";

export const treeHelper = (data: TreeEntry, selectedIds: number[]) => {
  const isSelected = selectedIds.includes(data.key);

  const currentKeyAndChildKeys = [data.key, ...getChildrenKeys(data)];

  const someChildrenSelected = currentKeyAndChildKeys.some((x) =>
    selectedIds.includes(x)
  );

  const everyChildrenSelected = currentKeyAndChildKeys.every((x) =>
    selectedIds.includes(x)
  );

  const hasChildren = data.children && data.children.length > 0;

  let selectedStatus: SelectedStatus =
    !hasChildren && isSelected
      ? "selected"
      : !hasChildren && !isSelected
      ? "notSelected"
      : getChildrenSelectedStatus(data, selectedIds);

  if (someChildrenSelected && selectedStatus === "notSelected")
    selectedStatus = "indeterminate";

  const _isSelected = selectedStatus === "selected" ? true : false;

  const newSelectedIds =
    _isSelected && !selectedIds.includes(data.key)
      ? [...selectedIds, data.key]
      : selectedIds;

  return {
    isSelected: _isSelected,
    currentKeyAndChildIds: currentKeyAndChildKeys,
    someChildrenSelected,
    everyChildrenSelected,
    selectedStatus,
    newSelectedIds,
  };
};

export const getChildrenSelectedStatus = (
  data: TreeEntry,
  selectedIds: number[]
): SelectedStatus => {
  if (data.children) {
    let allSelected = true;
    let noneSelected = true;

    for (const child of data.children) {
      if (!selectedIds.includes(child.key)) {
        allSelected = false;
      } else {
        noneSelected = false;
      }

      const childStatus = getChildrenSelectedStatus(child, selectedIds);
      if (childStatus === null) {
        allSelected = false;
        noneSelected = false;
      }
    }

    if (allSelected) {
      return "selected";
    } else if (noneSelected) {
      return "notSelected";
    } else {
      return "indeterminate";
    }
  }
  return "selected";
};

export const getChildrenKeys = (data: TreeEntry): number[] => {
  //nao é useCallback por que é um reduce
  const _getAllChildKeys = (acc: number[], curr: TreeEntry) => {
    const children =
      (curr.children &&
        curr.children.length > 0 &&
        curr.children.reduce(_getAllChildKeys, [])) ||
      [];

    acc.push(curr.key, ...children);
    return acc;
  };

  const result = data.children?.reduce(_getAllChildKeys, []);
  return result || [];
};

export const filterRecursive = (
  data: TreeEntry[],
  searchTerm: string
): TreeEntry[] => {
  //nao é useCallback por que é um reduce
  const filterRecursiveNodes = (acc: TreeEntry[], curr: TreeEntry) => {
    const children =
      curr.children && curr.children.length > 0
        ? curr.children.reduce(filterRecursiveNodes, [])
        : [];

    if (
      curr.name.toLocaleLowerCase().indexOf(searchTerm.toLocaleLowerCase()) >
        -1 ||
      // Or a children
      (children && children.length > 0)
    ) {
      acc.push({ ...curr, children });
    }

    return acc;
  };

  const result = data.reduce(filterRecursiveNodes, []);
  return result;
};
