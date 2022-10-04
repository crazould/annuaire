/** @jsxImportSource @emotion/react */
import { css, useTheme } from "@emotion/react";
import { IconBrandLinkedin, IconBrandGithub } from "@tabler/icons";

export const Footer = () => {
  const theme = useTheme();

  const footerStyle = css`
    background-color: ${theme.bgComponent};
    border: ${theme.borderComponent};
    color: ${theme.text};
    font-size: 1rem;
    > div {
      display: flex;
      max-width: 1024px;
      justify-content: space-between;
      align-items: center;
      margin: 0 auto;
      padding: 1.25rem;
      div {
        width: 70px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        svg {
          color: ${theme.accent};
          cursor: pointer;
        }
      }
    }
  `;

  return (
    <footer css={footerStyle}>
      <div>
        <span>© {new Date().getFullYear()} Thariq, All rights reserved</span>
        <div>
          <IconBrandGithub
            size={28}
            target="_blank"
            href="https://github.com/crazould"
          />
          <IconBrandLinkedin
            size={28}
            target="_blank"
            href="https://www.linkedin.com/in/muhammad-filardi/"
          />
        </div>
      </div>
    </footer>
  );
};
