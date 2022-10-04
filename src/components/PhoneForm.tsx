import React, { useEffect, useState, useContext } from "react";
import { ContactsContext, Contact } from "../App";
import useAddNumberToContact from "../hooks/useAddNumberToContact";
import ActionBtn from "./ActionBtn";
import EditPhoneInput from "./EditPhoneInput";

interface EditPhoneFormProps {
  contact: Contact;
}

const EditPhoneForm = ({ contact }: EditPhoneFormProps) => {
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
      newContacts[idx] = {...newContacts[idx], ...data.insert_phone.returning[0]};
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

  const newNumberInput = addMode ? (
    <input type="text" value={newNumber} onChange={changeNewNumber} />
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

export default EditPhoneForm;
