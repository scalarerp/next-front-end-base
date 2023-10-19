"use client";
import React from "react";

interface TEntry {
  name: string;
  children?: TEntry[];
}

const files = {
  children: [
    {
      name: "src",
      children: [
        {
          name: "components",
          children: [
            {
              name: "Tree",
              children: [
                {
                  name: "Entry.jsx",
                },
              ],
            },
            {
              name: "App.jsx",
            },
          ],
        },
      ],
    },

    {
      name: "public",
      children: [
        {
          name: "components",
          children: [
            {
              name: "Tree",
              children: [
                {
                  name: "Entry.jsx",
                },
              ],
            },
            {
              name: "App.jsx",
            },
          ],
        },
      ],
    },

    {
      name: "node_modules",
      children: [
        {
          name: "components",
          children: [
            {
              name: "Tree",
              children: [
                {
                  name: "Entry.jsx",
                  children: [
                    {
                      name: "components",
                      children: [
                        {
                          name: "Tree",
                          children: [
                            {
                              name: "Entry.jsx",
                            },
                          ],
                        },
                        {
                          name: "App.jsx",
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              name: "App.jsx",
            },
          ],
        },
      ],
    },
  ],
};
const TreeExample = () => {
  //   const [files, setFiles] = React.useState<TEntry[]>();

  return (
    <div className="w-full h-full text-white w-1/2 h-1/2 p-5 text-left bg-blue-500/50 rounded-lg overflow-scroll">
      <h1 className="text-center text-white p-2 font-bold w-full">
        Root Folder
      </h1>
      {files.children.map((entry, i) => (
        <Entry entry={entry} depth={1} key={i} />
      ))}
    </div>
  );
};
const Entry = ({ entry, depth }: { entry: TEntry; depth: number }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  return (
    <>
      <div className="bg-slate-500/50 rounded-lg mb-3 p-2 mt-3">
        {entry.children ? (
          <button
            className="font-bold"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {entry.children && "+ "}
            {entry.name}
          </button>
        ) : (
          <div className="font-bold">{entry.name}</div>
        )}

        {isExpanded && (
          <div className="ml-5 mt-2 rounded-lg">
            {entry.children?.map((entry, i) => (
              <Entry entry={entry} depth={depth + 1} key={i} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default TreeExample;
