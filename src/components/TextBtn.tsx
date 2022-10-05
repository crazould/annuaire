/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";
import Button from "./Button";

const TextBtn = ({
  type,
  onClick,
  children,
}: {
  type: "button" | "submit" | "reset" | undefined;
  onClick?: (e: React.FormEvent) => void;
  children: React.ReactNode;
}) => {
  const textBtnStyle = css`
    font-family: "Futura Md BT", sans-serif;
    padding: 0.5rem 1rem;
    margin-right: 0.5rem;
  `;

  return (
    <Button styleProp={textBtnStyle} type={type} onClick={onClick}>
      {children}
    </Button>
  );
};

export default TextBtn;
