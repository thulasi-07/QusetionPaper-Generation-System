import React from "react";

export const Select = ({ value, onChange, className, children }) => {
  return (
    <select
      className={`border rounded-md px-3 py-2 w-full ${className}`}
      value={value}
      onChange={onChange}
    >
      <option value="" disabled>Select an option</option>
      {children}
    </select>
  );
};

export const SelectItem = ({ value, children }) => {
  return <option value={value}>{children}</option>;
};
