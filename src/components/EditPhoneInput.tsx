import React, { useContext, useEffect, useState } from "react";
import { ContactsContext, Phone } from "../App";
import useEditPhoneNumber from "../hooks/useEditPhoneNumber";
import ActionBtn from "./ActionBtn";

interface EditPhoneInputProps {
  id: string | undefined;
  number: string;
}

const EditPhoneInput = ({ id, number }: EditPhoneInputProps) => {
  const { contacts, setContacts } = useContext(ContactsContext);
  const [editMode, setEditMode] = useState(false);
  const [newNumber, setNewNumber] = useState(number);
  const [editPhone, {data}] = useEditPhoneNumber(
    id,
    number,
    newNumber
  );

  useEffect(() => {
    if (data) {
      setContacts([...contacts, data.update_phone_by_pk]);
      alert("Edit phone number success");
    }
  }, [data]);

  const changePhones = (e: React.ChangeEvent) => {
    setNewNumber((e.target as HTMLInputElement).value);
  };

  const savePhone = (e: React.FormEvent) => {
    e.preventDefault();
    editPhone();
    setEditMode(!editMode);
  };

  return (
    <div>
      <form onSubmit={savePhone}>
        <input
          onChange={changePhones}
          placeholder="phone number"
          type="tel"
          value={newNumber}
          disabled={!editMode}
        />
        <ActionBtn mode={editMode} setMode={setEditMode} />
      </form>
    </div>
  );
};

export default EditPhoneInput;
