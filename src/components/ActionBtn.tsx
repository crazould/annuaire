/** @jsxImportSource @emotion/react */
import { css, useTheme } from "@emotion/react";
import { IconPlus } from "@tabler/icons";

interface ActionBtnProps {
  mode: boolean;
  isAddMode?: boolean;
  setMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const ActionBtn = ({ mode, setMode, isAddMode }: ActionBtnProps) => {
  const theme = useTheme();

  const toggleMode = (e: React.FormEvent) => {
    e.preventDefault();
    setMode(!mode);
  };

  const btnTextStyle = css`
    color: #fafafa;
    font-size: 1rem;
    background-color: ${theme.accent};
    border: ${theme.border};
    padding: 0.5rem 1rem;
    margin-right: 0.5rem;
    cursor: pointer;
    border: ${theme.border};
    border-radius: .5rem;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    :hover {
      background-color: ${theme.accentHover};
    }
  `;

  const btnStyle = css`
    color: #fafafa;
    background-color: ${theme.accent};
    border: ${theme.border};
    padding: 0.25rem;
    cursor: pointer;
    border: ${theme.border};
    border-radius: 0.5rem;
    margin-left: 0.25rem;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    :hover {
      background-color: ${theme.accentHover};
    }
  `;
  const actions = mode ? (
    <>
      <button css={btnTextStyle} type="submit">
        save
      </button>
      <button css={btnTextStyle} type="button" onClick={toggleMode}>
        cancel
      </button>
    </>
  ) : (
    <button
      css={btnTextStyle}
      type="button"
      onClick={toggleMode}
    >
      {isAddMode ? "add number": "edit"}
    </button>
  );
  return (
    <div
      css={css`
        margin-bottom: 1rem;
      `}
    >
      {actions}
    </div>
  );
};

export default ActionBtn;
