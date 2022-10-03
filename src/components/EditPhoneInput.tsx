import React, { useEffect, useState } from "react";
import useEditPhoneNumber from "../hooks/useEditPhoneNumber";

interface EditPhoneInputProps {
  id: string | undefined;
  number: string;
}

const EditPhoneInput = ({ id, number }: EditPhoneInputProps) => {
  const [editMode, setEditMode] = useState(false);
  const [newNumber, setNewNumber] = useState(number);
  const [editPhone, editPhoneResult] = useEditPhoneNumber(
    id,
    number,
    newNumber
  );

  useEffect(() => {
    if (editPhoneResult.data) {
      alert("Edit phone number success");
    }
  }, [editPhoneResult.data]);

  const changePhones = (e: React.ChangeEvent) => {
    setNewNumber((e.target as HTMLInputElement).value);
  };

  const handleAction = () => {
    if (editMode) editPhone();
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
        onChange={changePhones}
        placeholder="phone number"
        type="tel"
        value={newNumber}
        disabled={!editMode}
      />
      {actionBtn}
    </div>
  );
};

export default EditPhoneInput;
