/** @jsxImportSource @emotion/react */
import { css, useTheme } from "@emotion/react";
import { IconPlus } from "@tabler/icons";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ContactsContext } from "../../context/ContactsContext";
import useAddContactWithPhones from "../../hooks/useAddContactWithPhones";
import { checkName } from "../../utils/checkName";

const AddContactPage = () => {
  const nav = useNavigate();
  const theme = useTheme();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [numbers, setNumbers] = useState([""]);
  const { contacts, setContacts } = useContext(ContactsContext);
  const [addContact, { data }] = useAddContactWithPhones(
    firstName,
    lastName,
    numbers
  );

  useEffect(() => {
    if (!data) return;
    const newContacts = [...contacts, data.insert_contact.returning[0]];
    localStorage.setItem("contacts", JSON.stringify(newContacts));
    setContacts(newContacts);
    alert("Add contact success");
    setFirstName("");
    setLastName("");
    setNumbers([""]);
  }, [data]);

  const changeFirstName = (e: React.ChangeEvent) => {
    setFirstName((e.target as HTMLInputElement).value);
  };

  const changeLastName = (e: React.ChangeEvent) => {
    setLastName((e.target as HTMLInputElement).value);
  };

  const changePhones = (e: React.ChangeEvent, idx: number) => {
    let newNumbers = [...numbers];
    newNumbers[idx] = (e.target as HTMLInputElement).value;
    setNumbers(newNumbers);
  };

  const addPhoneInput = () => {
    setNumbers([...numbers, ""]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = checkName(`${firstName} ${lastName}`, contacts);
    if (msg) {
      alert(msg);
      return;
    }
    addContact();
  };

  const formTitleStyle = css`
    font-weight: 300;
    font-size: 2rem;
    margin: 0;
    margin-bottom: 1rem;
  `;

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

  const pageStyle = css`
    padding-inline: 1rem;
    margin: auto;
    max-width: 1024px;
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

  const btnStyle = css`
    color: #fafafa;
    background-color: ${theme.accent};
    border: ${theme.border};
    padding: 0.25rem;
    cursor: pointer;
    border: ${theme.border};
    border-radius: 0.5rem;
    margin-left: 0.25rem;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    :hover {
      background-color: ${theme.accentHover};
    }
  `;

  const phonesInput = numbers.map((number, idx) => (
    <input
      onChange={(e) => changePhones(e, idx)}
      placeholder="phone number"
      key={idx}
      type="tel"
      value={number}
      required
      css={inputStyle}
    />
  ));

  return (
    <div css={pageStyle}>
      <div css={cardStyle}>
        <h1 css={formTitleStyle}>Add Contact Form</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              css={inputStyle}
              type="text"
              onChange={changeFirstName}
              placeholder="first name"
              value={firstName}
              required
            />
          </div>
          <div>
            <input
              css={inputStyle}
              type="text"
              onChange={changeLastName}
              placeholder="last name"
              value={lastName}
              required
            />
          </div>
          <div css={css`margin-bottom: 1rem;`}>
            {phonesInput}
            <button type="button" onClick={addPhoneInput} css={btnStyle}>
              <IconPlus size={20} />
            </button>
          </div>
          <div css={css``}>
            <button css={btnTextStyle} type="submit">
              save
            </button>
            <button css={btnTextStyle} onClick={() => nav("/")}>
              back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddContactPage;
