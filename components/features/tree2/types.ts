export interface TreeEntry {
  key: number;
  name: string;
  children?: TreeEntry[];
  // selected: boolean;
}

export type SelectedStatus = "selected" | "notSelected" | "indeterminate";
