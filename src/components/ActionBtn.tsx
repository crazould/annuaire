/** @jsxImportSource @emotion/react */
import { css, useTheme } from "@emotion/react";
interface ActionBtnProps {
  mode: boolean;
  isAddMode?: boolean;
  setMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const ActionBtn = ({ mode, setMode, isAddMode }: ActionBtnProps) => {
  const toggleMode = (e: React.FormEvent) => {
    e.preventDefault();
    setMode(!mode);
  };
  const actions = mode ? (
    <>
      <button type="submit">save</button>
      <button onClick={toggleMode}>cancel</button>
    </>
  ) : (
    <button onClick={toggleMode}>
      {isAddMode? "add number" : "edit"}
    </button>
  );
  return <div>{actions}</div>;
};

export default ActionBtn;
