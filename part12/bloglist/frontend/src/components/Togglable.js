import React from "react";
import { useState, forwardRef, useImperativeHandle } from "react";
import { Button } from "react-bootstrap";

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);
  let buttonVisible = { display: visible ? "none" : "" };
  let contentVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return { toggleVisibility };
  });

  return (
    <>
      <div style={buttonVisible}>
        <Button onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </div>
      <div style={contentVisible}>
        {props.children}
        <Button onClick={toggleVisibility}>Cancel</Button>
      </div>
    </>
  );
});

Togglable.displayName = "Togglable";

export default Togglable;
