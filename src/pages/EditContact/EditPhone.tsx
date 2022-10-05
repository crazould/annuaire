/** @jsxImportSource @emotion/react */
import React, { useEffect, useState, useContext } from "react";
import { Contact } from "../../App";
import ContactsContext from "../../context/ContactsContext";
import useAddNumberToContact from "../../hooks/useAddNumberToContact";
import ActionBtn from "../../components/ActionBtnGroup";
import EditPhoneInput from "./PhoneInput";
import Input from "../../components/Input";

const EditPhone = ({ contact }: { contact: Contact }) => {
  const { contacts, setContacts } = useContext(ContactsContext);
  const id = contact.id;
  const [addMode, setAddMode] = useState(false);
  const [newNumber, setNewNumber] = useState("");
  const [addNumber, { data }] = useAddNumberToContact(id, newNumber);

  useEffect(() => {
    if (data) {
      const newContacts = [...contacts];
      let idx = newContacts.findIndex((c: Contact) => c.id === id);
      if (idx === -1) return;
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
    const props = { number, id, idx };
    return <EditPhoneInput key={idx} {...props} />;
  });

  const newNumberInput = addMode ? (
    <div className="input-group">
      <label htmlFor={`newNumber`}>{`new phone`}</label>
      <Input
        id={`newNumber`}
        placeholder="ex: +628123456789"
        type="tel"
        value={newNumber}
        onChange={changeNewNumber}
        required
      />
    </div>
  ) : (
    ""
  );

  return (
    <div>
      <form onSubmit={saveNewPhone}>
        {newNumberInput}
        <ActionBtn mode={addMode} setMode={setAddMode} isAddMode={true} />
      </form>
      {phonesInput}
    </div>
  );
};

export default EditPhone;
