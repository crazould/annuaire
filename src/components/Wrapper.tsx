/** @jsxImportSource @emotion/react */
import { css, useTheme } from "@emotion/react";
import React from "react";

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme();
  return (
    <main
      css={css`
        color: ${theme.text};
        background-color: ${theme.bg};
        padding-block: 2rem;
        min-height: 90vh;
      `}
    >
      {children}
    </main>
  );
};

export default Wrapper;
