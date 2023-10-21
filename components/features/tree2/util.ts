import { SelectedStatus, TreeEntry } from "./types";

export const treeHelper = (data: TreeEntry, selectedIds: number[]) => {
  const isSelected = selectedIds.includes(data.key);
  const currentKeyAndChildIds = [data.key, ...getAllChildIds(data)];
  const someChildrenSelected = currentKeyAndChildIds.some((x) =>
    selectedIds.includes(x)
  );
  const everyChildrenSelected = currentKeyAndChildIds.every((x) =>
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

  // if (data.key === 5) {
  //   console.log(
  //     "key",
  //     data.key,
  //     isSelected,
  //     selectedStatus,
  //     everyChildrenSelected,
  //     someChildrenSelected,
  //     newSelectedIds
  //   );
  // }
  // if (data.key === 55) {
  //   console.log(
  //     "key",
  //     data.key,
  //     isSelected,
  //     selectedStatus,
  //     everyChildrenSelected,
  //     someChildrenSelected,
  //     newSelectedIds
  //   );
  // }

  return {
    isSelected: _isSelected,
    currentKeyAndChildIds,
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
        allSelected = false; // Pelo menos um filho não está selecionado
      } else {
        noneSelected = false; // Pelo menos um filho está selecionado
      }

      const childStatus = getChildrenSelectedStatus(child, selectedIds);
      if (childStatus === null) {
        allSelected = false;
        noneSelected = false;
      }
    }

    if (allSelected) {
      return "selected"; // Todos os filhos estão selecionados
    } else if (noneSelected) {
      return "notSelected"; // Nenhum filho está selecionado
    } else {
      return "indeterminate"; // Nem todos os filhos estão selecionados
    }
  }
  return "selected"; // O nó folha é considerado selecionado
};

const getAllChildIds = (data: TreeEntry): number[] => {
  let childIds: number[] = [];
  if (data.children) {
    for (const child of data.children) {
      childIds.push(child.key);
      childIds = childIds.concat(getAllChildIds(child));
    }
  }
  return childIds;
};
