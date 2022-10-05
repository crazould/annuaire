/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";
import Button from "./Button";

const IconBtn = ({
  type,
  onClick,
  children,
}: {
  type: "button" | "submit" | "reset" | undefined;
  onClick?: (e: React.FormEvent) => void;
  children: React.ReactNode;
}) => {
  
  const iconBtnStyle = css`
    padding: 0.25rem;
    margin-left: 0.25rem;
  `;

  return (
    <Button styleProp={iconBtnStyle} type={type} onClick={onClick}>
      {children}
    </Button>
  );
};

export default IconBtn;
