/** @jsxImportSource @emotion/react */
import React, { useContext, useEffect, useState } from "react";
import { Contact } from "../../App";
import ContactsContext from "../../context/ContactsContext";
import useEditPhoneNumber from "../../hooks/useEditPhoneNumber";
import ActionBtn from "../../components/ActionBtnGroup";
import Input from "../../components/Input";
import { formStyle } from "../../styles/components";

const PhoneInput = ({
  id,
  number,
  idx,
}: {
  id: number;
  number: string;
  idx: number;
}) => {
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
    <form onSubmit={savePhone} css={formStyle}>
      <div className="input-group">
        <label htmlFor={`phone${idx}`}>{`phone ${idx + 1}`}</label>
        <Input
          id={`phone${idx}`}
          onChange={changePhones}
          placeholder="ex: +628123456789"
          type="tel"
          value={newNumber}
          disabled={!editMode}
          required
        />
        <ActionBtn mode={editMode} setMode={setEditMode} />
      </div>
    </form>
  );
};

export default PhoneInput;
