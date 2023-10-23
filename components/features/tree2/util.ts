import { SelectedStatus, TreeEntry, TreeEntryWithUniqueKey } from "./types";

export const treeHelper = (
  data: TreeEntryWithUniqueKey,
  selectedKeys: number[]
) => {
  const isSelected = selectedKeys.includes(data.key);

  const currentKeyAndChildKeys = [data.key, ...getChildrenKeys(data)];

  const someChildrenSelected = currentKeyAndChildKeys.some((x) =>
    selectedKeys.includes(x)
  );

  const everyChildrenSelected = currentKeyAndChildKeys.every((x) =>
    selectedKeys.includes(x)
  );

  const hasChildren = data.children && data.children.length > 0;

  let selectedStatus: SelectedStatus =
    !hasChildren && isSelected
      ? "selected"
      : !hasChildren && !isSelected
      ? "notSelected"
      : getChildrenSelectedStatus(data, selectedKeys);

  if (someChildrenSelected && selectedStatus === "notSelected")
    selectedStatus = "indeterminate";

  const _isSelected = selectedStatus === "selected" ? true : false;

  const newselectedKeys =
    _isSelected && !selectedKeys.includes(data.key)
      ? [...selectedKeys, data.key]
      : selectedKeys;

  return {
    isSelected: _isSelected,
    currentKeyAndChildIds: currentKeyAndChildKeys,
    someChildrenSelected,
    everyChildrenSelected,
    selectedStatus,
    newselectedKeys,
  };
};

export const getChildrenSelectedStatus = (
  data: TreeEntryWithUniqueKey,
  selectedKeys: number[]
): SelectedStatus => {
  if (data.children) {
    let allSelected = true;
    let noneSelected = true;

    for (const child of data.children) {
      if (!selectedKeys.includes(child.key)) {
        allSelected = false;
      } else {
        noneSelected = false;
      }

      const childStatus = getChildrenSelectedStatus(child, selectedKeys);
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

export const getChildrenKeys = (data: TreeEntryWithUniqueKey): number[] => {
  //nao é useCallback por que é um reduce
  const _getAllChildKeys = (acc: number[], curr: TreeEntryWithUniqueKey) => {
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
  data: TreeEntryWithUniqueKey[],
  searchTerm: string
): TreeEntryWithUniqueKey[] => {
  //nao é useCallback por que é um reduce
  const filterRecursiveNodes = (
    acc: TreeEntryWithUniqueKey[],
    curr: TreeEntryWithUniqueKey
  ) => {
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

export const addKeys = (data: TreeEntry[]): TreeEntryWithUniqueKey[] => {
  let currKey = 1;
  //nao é useCallback por que é um reduce
  const addRecursiveNodes = (
    acc: TreeEntryWithUniqueKey[],
    curr: TreeEntry
  ) => {
    const children =
      curr.children && curr.children.length > 0
        ? curr.children.reduce(addRecursiveNodes, [])
        : [];

    acc.push({ ...curr, key: ++currKey, children });

    return acc;
  };

  const result = data.reduce(addRecursiveNodes, []);
  return result;
};
