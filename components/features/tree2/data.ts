import { TreeEntry } from "./types";
export const mockData: TreeEntry[] = [
  {
    id: "Root 1",
    name: "Root 1",

    children: [
      {
        id: 2,
        name: "Child 1 2",
        children: [
          {
            id: 22,
            name: "Child 1 22",
          },
          {
            id: 25,
            name: "Child 1 25",
          },
        ],
      },
      {
        id: 3,
        name: "Child 1 3",
        children: [
          {
            id: 33,
            name: "Child 1 33",
          },
          {
            id: 37,
            name: "Child 1 37",
          },
        ],
      },
      {
        id: 5,
        name: "Child 1 5",
        children: [
          {
            id: 52,
            name: "Child 1 52",
          },
          {
            id: 55,
            name: "Child 1 55",
            children: [
              {
                id: 520,
                name: "Child 1 520",
              },
              {
                id: 550,
                name: "Child 1 550",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "Root2",
    name: "Root 2",

    children: [
      {
        id: "Roo 2 Childt 5",
        name: "Child 2 5",
        children: [
          {
            id: "Root 2 Child 52",
            name: "Child 2 52",
          },
          {
            id: "Root 2 Child 55",
            name: "Child 2 55",
            children: [
              {
                id: "Root  2 Child 520",
                name: "Child 2 520",
              },
              {
                id: "Root  2 Child 550",
                name: "Child 2 550",
              },
            ],
          },
        ],
      },
    ],
  },
];
