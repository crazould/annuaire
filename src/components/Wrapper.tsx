/** @jsxImportSource @emotion/react */
import { css, useTheme } from "@emotion/react";
import React from "react";

interface wrapperProps {
  children: React.ReactNode;
}

const Wrapper = ({ children }: wrapperProps) => {
  const theme = useTheme();
  const wrapperStyle = css`
    color: ${theme.text};
    background-color: ${theme.bg};
    padding-block: 2rem;
    min-height: 90vh;
  `;
  return <main css={wrapperStyle}>{children}</main>;
};

export default Wrapper;
