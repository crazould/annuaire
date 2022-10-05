/** @jsxImportSource @emotion/react */
import { css, useTheme } from "@emotion/react";
import React, { useEffect, useState, useContext } from "react";
import { Contact } from "../../App";
import ContactsContext from "../../context/ContactsContext";
import useAddNumberToContact from "../../hooks/useAddNumberToContact";
import ActionBtn from "../../components/ActionBtn";
import EditPhoneInput from "./EditPhoneInput";

interface PhoneFormProps {
  contact: Contact;
}

const PhoneForm = ({ contact }: PhoneFormProps) => {
  const theme = useTheme();
  const { contacts, setContacts } = useContext(ContactsContext);
  const id = contact.id;
  const [addMode, setAddMode] = useState(false);
  const [newNumber, setNewNumber] = useState("");
  const [addNumber, { data }] = useAddNumberToContact(id, newNumber);

  useEffect(() => {
    if (data) {
      const newContacts = [...contacts];
      let idx = newContacts.findIndex((c: Contact) => c.id == id);
      if (idx == -1) return;
      newContacts[idx] = {
        ...newContacts[idx],
        ...data.insert_phone.returning[0],
      };
      localStorage.setItem("contacts", JSON.stringify(newContacts));
      setContacts(newContacts);
      alert("Add number to contact success");
    }
  }, [data]);

  const saveNewPhone = (e: React.FormEvent) => {
    e.preventDefault();
    addNumber();
    setAddMode(!addMode);
  };

  const changeNewNumber = (e: React.ChangeEvent) => {
    setNewNumber((e.target as HTMLInputElement).value);
  };

  const phonesInput = contact.phones.map(({ number }, idx) => {
    const props = { number, id };
    return <EditPhoneInput key={idx} {...props} />;
  });

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

  const newNumberInput = addMode ? (
    <input
      css={inputStyle}
      placeholder="new number"
      type="tel"
      value={newNumber}
      onChange={changeNewNumber}
    />
  ) : (
    ""
  );

  return (
    <div>
      <form onSubmit={saveNewPhone}>
        <div>{newNumberInput}</div>
        <ActionBtn mode={addMode} setMode={setAddMode} isAddMode={true} />
      </form>
      {phonesInput}
    </div>
  );
};

export default PhoneForm;
