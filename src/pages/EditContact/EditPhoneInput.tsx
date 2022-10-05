/** @jsxImportSource @emotion/react */
import { css, useTheme } from "@emotion/react";
import React, { useContext, useEffect, useState } from "react";
import { Contact } from "../../App";
import ContactsContext from "../../context/ContactsContext";
import useEditPhoneNumber from "../../hooks/useEditPhoneNumber";
import ActionBtn from "../../components/ActionBtn";

interface EditPhoneInputProps {
  id: number;
  number: string;
}

const EditPhoneInput = ({ id, number }: EditPhoneInputProps) => {
  const theme = useTheme();
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

  const inputStyle = css`
    font-family: "Futura Md BT", sans-serif;
    border-radius: 0.5rem;
    border: ${theme.border};
    padding: 0.5rem;
    font-size: 1rem;
    margin-bottom: 1rem;
    width: 80%;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  `;

  const changePhones = (e: React.ChangeEvent) => {
    setNewNumber((e.target as HTMLInputElement).value);
  };

  const savePhone = (e: React.FormEvent) => {
    e.preventDefault();
    editPhone();
    setEditMode(!editMode);
  };

  return (
    <div >
      <form onSubmit={savePhone}>
        <input
          css={inputStyle}
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
