/** @jsxImportSource @emotion/react */
import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EditPhone from "./EditPhone";
import ActionBtn from "../../components/ActionBtnGroup";
import ContactsContext from "../../context/ContactsContext";
import useEditContact from "../../hooks/useEditContact";
import { Contact } from "../../App";
import checkName from "../../utils/checkName";
import PageLayout from "../../components/PageLayout";
import { formStyle } from "../../styles/components";
import Input from "../../components/Input";
import TextBtn from "../../components/TextBtn";
import Card from "../../components/Card";
import NotificationContext from "../../context/NotificationContext";


const EditContact = () => {
  const nav = useNavigate();
  const { contact_id } = useParams();
  const id = contact_id ? parseInt(contact_id) : -1;
  const { contacts, setContacts } = useContext(ContactsContext);
  const { setNotif } = useContext(NotificationContext);
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
      setNotif("Edit contact success");
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
      setNotif(msg);
      return;
    }
    editContact();
    setEditMode(!editMode);
  };

  return (
    <PageLayout>
      <Card>
        <form css={formStyle} onSubmit={saveContact}>
          <h1>Edit Detail</h1>
          <div className="input-group">
            <label htmlFor="Name">first name</label>
            <Input
              id="firstName"
              type="text"
              onChange={changeFirstName}
              placeholder="ex: John"
              required
              value={firstName}
              disabled={!editMode}
            />
          </div>
          <div className="input-group">
            <label htmlFor="lastName">last name</label>
            <Input
              id="lastName"
              type="text"
              onChange={changeLastName}
              placeholder="ex: Doe"
              required
              value={lastName}
              disabled={!editMode}
            />
          </div>
          <ActionBtn mode={editMode} setMode={setEditMode} />
        </form>
        <div css={[formStyle]} style={{marginBlock: "2rem"}} >
          <h1>Edit Phones</h1>
          {contact ? <EditPhone contact={contact} /> : ""}
        </div>
        <TextBtn type="button" onClick={() => nav("/")}>
          back
        </TextBtn>
      </Card>
    </PageLayout>
  );
};

export default EditContact;
