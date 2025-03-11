import React from "react";
export const Table = ({ children, className }) => {
    return <table className={`w-full border-collapse border ${className}`}>{children}</table>;
  };
  
  export const TableHead = ({ children }) => {
    return <thead className="bg-gray-100">{children}</thead>;
  };
  
  export const TableBody = ({ children }) => {
    return <tbody>{children}</tbody>;
  };
  
  export const TableRow = ({ children }) => {
    return <tr className="border border-gray-300">{children}</tr>;
  };
  
  export const TableCell = ({ children, header = false }) => {
    return header ? (
      <th className="border border-gray-300 px-4 py-2">{children}</th>
    ) : (
      <td className="border border-gray-300 px-4 py-2">{children}</td>
    );
  };
  