/** @jsxImportSource @emotion/react */
import { css, useTheme } from "@emotion/react";
import { IconBrandLinkedin, IconBrandGithub } from "@tabler/icons";

export const Footer = () => {
  const theme = useTheme();

  const footerStyle = css`
    background-color: ${theme.bgComponent};
    border: ${theme.border};
    color: ${theme.accent};
    font-size: 1rem;
    > div {
      display: flex;
      max-width: 1024px;
      justify-content: space-between;
      align-items: center;
      margin: 0 auto;
      padding: 1.25rem;
      div {
        display: flex;
        align-items: center;
        flex-direction: row-reverse;
        svg {
          color: ${theme.accent};
          cursor: pointer;
          margin-left: 1rem;
        }
        svg:hover {
          color: ${theme.accentHover};
        }
      }
    }
  `;

  return (
    <footer css={footerStyle}>
      <div>
        <span>© {new Date().getFullYear()} Thariq, All rights reserved</span>
        <div>
          <IconBrandLinkedin
            size={28}
            target="_blank"
            href="https://www.linkedin.com/in/muhammad-filardi/"
          />
          <IconBrandGithub
            size={28}
            target="_blank"
            href="https://github.com/crazould"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
