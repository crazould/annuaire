/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import TextBtn from "./TextBtn";

const ActionBtnGroup = ({
  mode,
  setMode,
  isAddMode,
}: {
  mode: boolean;
  isAddMode?: boolean;
  setMode: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const toggleMode = (e: React.FormEvent) => {
    e.preventDefault();
    setMode(!mode);
  };

  const actions = mode ? (
    <>
      <TextBtn type="submit">save</TextBtn>
      <TextBtn type="button" onClick={toggleMode}>
        cancel
      </TextBtn>
    </>
  ) : (
    <TextBtn type="button" onClick={toggleMode}>
      {isAddMode ? "add number" : "edit"}
    </TextBtn>
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

export default ActionBtnGroup;
