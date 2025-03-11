import React from "react";

export const Input = ({ type = "text", placeholder, className, ...props }) => {
    return (
      <input
        type={type}
        placeholder={placeholder}
        className={`border rounded-md px-3 py-2 ${className}`}
        {...props}
      />
    );
  };
  