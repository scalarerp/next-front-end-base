import { SelectedStatus, TreeEntry } from "./types";

export const getAllChildIds = (data: TreeEntry): number[] => {
  let childIds: number[] = [];
  if (data.children) {
    for (const child of data.children) {
      childIds.push(child.key);
      childIds = childIds.concat(getAllChildIds(child));
    }
  }
  return childIds;
};

export const getSelectedStatus = (data: TreeEntry, selectedIds: number[]) => {
  const isSelected = selectedIds.includes(data.key);
  const currentKeyAndChildIds = [data.key, ...getAllChildIds(data)];
  const someChildrenSelected = currentKeyAndChildIds.some((x) =>
    selectedIds.includes(x)
  );
  const everyChildrenSelected = currentKeyAndChildIds.every((x) =>
    selectedIds.includes(x)
  );
  const status =
    !data.children || data.children.length === 0
      ? isSelected
      : areAllChildrenSelected(data, selectedIds);

  let selectedStatus: SelectedStatus = "selected";
  if (status === true) {
    // console.log("Todos os filhos estão selecionados.");
    selectedStatus = "selected";
  } else if (status === false) {
    // console.log("Nenhum filho está selecionado.");
    selectedStatus = "notSelected";
  } else {
    // console.log("Nem todos os filhos estão selecionados (indeterminado).");
    selectedStatus = "indeterminate";
  }

  if (someChildrenSelected && !status) selectedStatus = "indeterminate";

  if (data.key === 5) {
    console.log(
      "key",
      data.key,
      isSelected,
      status,
      selectedStatus,
      everyChildrenSelected,
      someChildrenSelected
    );
  }
  if (data.key === 55) {
    console.log(
      "key",
      data.key,
      isSelected,
      status,
      selectedStatus,
      everyChildrenSelected,
      someChildrenSelected
    );
  }

  const _isSelected = selectedStatus === "selected" ? true : false;

  const newSelectedIds =
    _isSelected && !selectedIds.includes(data.key)
      ? [...selectedIds, data.key]
      : selectedIds;

  return {
    isSelected: _isSelected,
    currentKeyAndChildIds,
    someChildrenSelected,
    everyChildrenSelected,
    selectedStatus,
    newSelectedIds,
  };
};

const areAllChildrenSelected = (
  data: TreeEntry,
  selectedIds: number[]
): boolean | null => {
  if (data.children) {
    let allSelected = true;
    let noneSelected = true;

    for (const child of data.children) {
      if (!selectedIds.includes(child.key)) {
        allSelected = false; // Pelo menos um filho não está selecionado
      } else {
        noneSelected = false; // Pelo menos um filho está selecionado
      }

      const childStatus = areAllChildrenSelected(child, selectedIds);
      if (childStatus === null) {
        allSelected = false;
        noneSelected = false;
      }
    }

    if (allSelected) {
      return true; // Todos os filhos estão selecionados
    } else if (noneSelected) {
      return false; // Nenhum filho está selecionado
    } else {
      return null; // Nem todos os filhos estão selecionados
    }
  }
  return true; // O nó folha é considerado selecionado
};
