/** @jsxImportSource @emotion/react */
import { css, useTheme } from "@emotion/react";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PhoneForm from "./PhoneForm";
import ActionBtn from "../../components/ActionBtn";
import ContactsContext from "../../context/ContactsContext";
import useEditContact from "../../hooks/useEditContact";
import { Contact } from "../../App";
import checkName from "../../utils/checkName";
import PageLayout from "../../components/PageLayout";
import { formTitleStyle } from "../../styles/components";

const EditContact = () => {
  const nav = useNavigate();
  const theme = useTheme();
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

  const cardStyle = css`
    margin-bottom: 0.75rem;
    padding: 1rem;
    background: ${theme.bgComponent};
    color: ${theme.text};
    border-radius: 0.5rem;
    border: ${theme.border};
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  `;

  const btnTextStyle = css`
    color: #fafafa;
    font-size: 1rem;
    background-color: ${theme.accent};
    border: ${theme.border};
    padding: 0.5rem 1rem;
    margin-right: 1rem;
    cursor: pointer;
    border: ${theme.border};
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    :hover {
      background-color: ${theme.accentHover};
    }
  `;

  return (
    <PageLayout>
      <div css={cardStyle}>
        <h1 css={formTitleStyle}>Edit Contact Form</h1>
        <div>
          <form onSubmit={saveContact}>
            <div>
              <input
                css={inputStyle}
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
                css={inputStyle}
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
          <button css={btnTextStyle} type="button" onClick={() => nav("/")}>
            back
          </button>
        </div>
      </div>
    </PageLayout>
  );
};

export default EditContact;
