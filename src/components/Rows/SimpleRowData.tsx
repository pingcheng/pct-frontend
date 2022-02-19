import React, { ReactNode } from "react";

export type SimpleRowDataProps = {
  label: string;
  children?: ReactNode;
};

export function SimpleRowData({
  label,
  children,
}: SimpleRowDataProps): JSX.Element {
  return (
    <div className="flex mb-4">
      <div
        className="text-gray-400 w-1/3 text-right pr-2"
        style={{
          minWidth: "33.33333%",
        }}
      >
        {label.trim().toUpperCase()}
      </div>

      <div className="flex-1 pl-2">{children}</div>
    </div>
  );
}
