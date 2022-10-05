/** @jsxImportSource @emotion/react */
import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PhoneForm from "./EditPhone";
import ActionBtn from "../../components/ActionBtnGroup";
import ContactsContext from "../../context/ContactsContext";
import useEditContact from "../../hooks/useEditContact";
import { Contact } from "../../App";
import checkName from "../../utils/checkName";
import PageLayout from "../../components/PageLayout";
import { formTitleStyle } from "../../styles/components";
import Input from "../../components/Input";
import TextBtn from "../../components/TextBtn";
import Card from "../../components/Card";

const EditContact = () => {
  const nav = useNavigate();
  const { contact_id } = useParams();
  const id = contact_id ? parseInt(contact_id) : -1;
  const { contacts, setContacts } = useContext(ContactsContext);
  const contact = contacts.find((c) => c.id === id);
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
      let idx = newContacts.findIndex((c: Contact) => c.id === id);
      if (idx === -1) return;
      newContacts[idx] = { ...newContacts[idx], ...data.update_contact_by_pk };
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
    const msg = checkName(`${firstName} ${lastName}`, contacts);
    if (msg) {
      alert(msg);
      return;
    }
    editContact();
    setEditMode(!editMode);
  };

  return (
    <PageLayout>
      <Card>
        <h1 css={formTitleStyle}>Edit Contact Form</h1>
        <div>
          <form onSubmit={saveContact}>
            <div>
              <Input
                type="text"
                onChange={changeFirstName}
                placeholder="first name"
                required
                value={firstName}
                disabled={!editMode}
              />
            </div>
            <div>
              <Input
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
          {contact ? <PhoneForm contact={contact} /> : ""}
          <TextBtn type="button" onClick={() => nav("/")}>
            back
          </TextBtn>
        </div>
      </Card>
    </PageLayout>
  );
};

export default EditContact;
