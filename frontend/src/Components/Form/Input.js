import React, { useEffect, useRef } from "react";
import { useField } from "@unform/core";

export default function Input({ name, ...rest }) {
  const inputRef = useRef(null);
  const { fieldName, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "value",
    });
  }, [fieldName, registerField]);

  const style = {
    color: "#e02040",
    display: "block",
    margin: 10,
    fontWeight: 500,
  };

  return (
    <>
      <input ref={inputRef} {...rest} />
      {error && <span style={style}>{error}</span>}
    </>
  );
}
