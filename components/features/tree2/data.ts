import { TreeEntry } from "./types";
export const mockData: TreeEntry[] = [
  {
    key: 1,
    name: "Root",

    children: [
      {
        key: 2,
        name: "Child 2",
        children: [
          {
            key: 22,
            name: "Child 22",
          },
          {
            key: 25,
            name: "Child 25",
          },
        ],
      },
      {
        key: 3,
        name: "Child 3",
        children: [
          {
            key: 33,
            name: "Child 33",
          },
          {
            key: 37,
            name: "Child 37",
          },
        ],
      },
      {
        key: 5,
        name: "Child 5",
        children: [
          {
            key: 52,
            name: "Child 52",
          },
          {
            key: 55,
            name: "Child 55",
            children: [
              {
                key: 520,
                name: "Child 520",
              },
              {
                key: 550,
                name: "Child 550",
              },
            ],
          },
        ],
      },
    ],
  },
];
