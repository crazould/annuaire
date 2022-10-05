/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      css={css`
        padding-inline: 1rem;
        margin: auto;
        max-width: 1024px;
      `}
    >
      {children}
    </div>
  );
};

export default PageLayout;
