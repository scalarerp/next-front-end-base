export interface TreeEntry {
  id: number | string;
  name: string;
  searchString?: string;
  children?: TreeEntry[];
  className?: string;
  component?: React.ReactNode;
}

export interface TreeEntryWithUniqueKey extends TreeEntry {
  key: number; //preenchido automaticamente
  children?: TreeEntryWithUniqueKey[];
}

export type SelectedStatus = "selected" | "notSelected" | "indeterminate";
