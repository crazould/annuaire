/** @jsxImportSource @emotion/react */
import { css, useTheme, SerializedStyles } from "@emotion/react";
import React from "react";

const Button = ({
  type,
  onClick,
  children,
  styleProp,
}: {
  type: "button" | "submit" | "reset" | undefined;
  onClick?: (e: React.FormEvent) => void;
  children: React.ReactNode;
  styleProp?: SerializedStyles;
}) => {
  const theme = useTheme();

  const btnStyle = css`
    font-family: "Futura Md BT", sans-serif;
    color: #fafafa;
    font-size: 1rem;
    background-color: ${theme.accent};
    border: ${theme.border};
    cursor: pointer;
    border: ${theme.border};
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    :hover {
      background-color: ${theme.accentHover};
    }
  `;

  return (
    <button css={[btnStyle, styleProp]} type={type} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
