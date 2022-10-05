/** @jsxImportSource @emotion/react */
import { css, useTheme } from "@emotion/react";
import { SetStateAction } from "react";
import { IconSun, IconMoon } from "@tabler/icons";

interface HeaderProps {
  isDark: boolean;
  setIsDark: React.Dispatch<SetStateAction<boolean>>;
}

const Header = ({ isDark, setIsDark }: HeaderProps) => {
  const theme = useTheme();
  const toggleTheme = () => {
    const newTheme = !isDark;
    localStorage.setItem("theme", JSON.stringify(newTheme));
    setIsDark(newTheme);
  };

  const headerStyle = css`
    background-color: ${theme.bgComponent};
    color: ${theme.accent};
    border: ${theme.border};
    user-select: none;
    font-style: italic;
    > div {
      display: flex;
      max-width: 1024px;
      justify-content: space-between;
      align-items: center;
      margin: 0 auto;
      padding: 1.25rem;
      font-size: 1.5rem;
      > button {
        color: ${theme.accent};
        background-color: ${theme.bg};
        border: ${theme.border};
        padding: 0.25rem;
        cursor: pointer;
        border-radius: 4px;
      }
      > button:hover {
        background-color: ${theme.bgComponent};
      }
    }
  `;

  return (
    <header css={headerStyle}>
      <div>
        <div>Annuaire</div>
        <button onClick={toggleTheme}>
          {isDark ? <IconSun size={20} /> : <IconMoon size={20} />}
        </button>
      </div>
    </header>
  );
};

export default Header
