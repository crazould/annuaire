/** @jsxImportSource @emotion/react */
import React, { useContext, useEffect, useState } from "react";
import { Contact } from "../../App";
import ContactsContext from "../../context/ContactsContext";
import useEditPhoneNumber from "../../hooks/useEditPhoneNumber";
import ActionBtn from "../../components/ActionBtn";
import Input from "../../components/Input";

interface EditPhoneInputProps {
  id: number;
  number: string;
}

const EditPhoneInput = ({ id, number }: EditPhoneInputProps) => {
  const { contacts, setContacts } = useContext(ContactsContext);
  const [editMode, setEditMode] = useState(false);
  const [newNumber, setNewNumber] = useState(number);
  const [editPhone, { data }] = useEditPhoneNumber(id, number, newNumber);

  useEffect(() => {
    if (data) {
      const newContacts = [...contacts];
      let idx = newContacts.findIndex((c: Contact) => c.id === id);
      if (idx === -1) return;
      newContacts[idx] = { ...newContacts[idx], ...data.update_phone_by_pk };
      localStorage.setItem("contacts", JSON.stringify(newContacts));
      setContacts(newContacts);
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
        <Input
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
