export interface TreeEntry {
  key: number;
  name: string;
  children?: TreeEntry[];
  className?: string;
  component?: React.ReactNode;
}

export type SelectedStatus = "selected" | "notSelected" | "indeterminate";
