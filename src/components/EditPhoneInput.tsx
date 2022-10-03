import React, { useEffect, useState } from "react";
import useEditPhoneNumber from "../hooks/useEditPhoneNumber";

interface EditPhoneInputProps {
  changePhones(e: React.ChangeEvent, idx: number): void;
  idx: number;
  number: string;
}

const EditPhoneInput = ({ changePhones, idx, number }: EditPhoneInputProps) => {
  const [editMode, setEditMode] = useState(false);

  const handleAction = () => {
    setEditMode(!editMode);
  };

  const actionBtn = editMode ? (
    <button onClick={handleAction}>save</button>
  ) : (
    <button onClick={handleAction}>edit</button>
  );

  return (
    <div>
      <input
        onChange={(e) => changePhones(e, idx)}
        placeholder="phone number"
        type="tel"
        value={number}
        disabled={!editMode}
      />
      {actionBtn}
    </div>
  );
};

export default EditPhoneInput;
