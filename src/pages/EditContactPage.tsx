import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import EditPhoneForm from "../components/PhoneForm";
import useEditContact from "../hooks/useEditContact";
import { Contact, ContactsContext } from "../App";
import ActionBtn from "../components/ActionBtn";

const EditContactPage = () => {
  const { id } = useParams();
  const { contacts, setContacts } = useContext(ContactsContext);
  const contact = contacts.find((c) => c.id == id);
  const { first_name, last_name } = contact
    ? contact
    : { first_name: "", last_name: "" };
  const [firstName, setFirstName] = useState(first_name);
  const [lastName, setLastName] = useState(last_name);
  const [editContact, { data }] = useEditContact(id, firstName, lastName);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (data) {
      const newContacts = [...contacts];
      let idx = newContacts.findIndex((c: Contact) => c.id == id);
      if (idx == -1) return;
      newContacts[idx] = {...newContacts[idx], ...data.update_contact_by_pk};
      localStorage.setItem("contacts", JSON.stringify(newContacts));
      setContacts(newContacts);
      alert("Edit contact success");
    }
  }, [data]);

  const changeFirstName = (e: React.ChangeEvent) => {
    setFirstName((e.target as HTMLInputElement).value);
  };

  const changeLastName = (e: React.ChangeEvent) => {
    setLastName((e.target as HTMLInputElement).value);
  };

  const saveContact = (e: React.FormEvent) => {
    e.preventDefault();

    const newName = `${firstName} ${lastName}`;
    const isExists = contacts.find(
      (c) => newName == `${c.first_name} ${c.last_name}`
    );
    if (isExists) {
      alert("name already used");
      return;
    }
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (specialChars.test(newName)) {
      alert("please don't use special characters");
      return;
    }
    editContact();
    setEditMode(!editMode);
  };

  return (
    <>
      <h1>Edit Contact Form</h1>
      <div>
        <form onSubmit={saveContact}>
          <div>
            <input
              type="text"
              onChange={changeFirstName}
              placeholder="first name"
              required
              value={firstName}
              disabled={!editMode}
            />
          </div>
          <div>
            <input
              type="text"
              onChange={changeLastName}
              placeholder="last name"
              required
              value={lastName}
              disabled={!editMode}
            />
          </div>
          <ActionBtn mode={editMode} setMode={setEditMode} />
        </form>
        {contact ? <EditPhoneForm contact={contact} /> : ""}
        <Link to="/">back</Link>
      </div>
    </>
  );
};

export default EditContactPage;
