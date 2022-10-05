/** @jsxImportSource @emotion/react */
import { css, useTheme } from "@emotion/react";
import { IconPlus } from "@tabler/icons";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ContactsContext from "../../context/ContactsContext";
import useAddContactWithPhones from "../../hooks/useAddContactWithPhones";
import { formTitleStyle } from "../../styles/components";
import PageLayout from "../../components/PageLayout";
import checkName from "../../utils/checkName";
import Input from "../../components/Input";
import TextBtn from "../../components/TextBtn";
import IconBtn from "../../components/IconBtn";

const AddContact = () => {
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
    setFirstName("");
    setLastName("");
    setNumbers([""]);
  };

  const cardStyle = css`
    margin-bottom: 0.75rem;
    padding: 1rem;
    background: ${theme.bgComponent};
    color: ${theme.text};
    border-radius: 0.5rem;
    border: ${theme.border};
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  `;

  const phonesInput = numbers.map((number, idx) => (
    <Input
      onChange={(e) => changePhones(e, idx)}
      placeholder="phone number"
      key={idx}
      type="tel"
      value={number}
      required
    />
  ));

  return (
    <PageLayout>
      <div css={cardStyle}>
        <h1 css={formTitleStyle}>Add Contact Form</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <Input
              type="text"
              onChange={changeFirstName}
              placeholder="first name"
              value={firstName}
              required
            />
          </div>
          <div>
            <Input
              type="text"
              onChange={changeLastName}
              placeholder="last name"
              value={lastName}
              required
            />
          </div>
          <div
            css={css`
              margin-bottom: 1rem;
            `}
          >
            {phonesInput}
            <IconBtn type="button" onClick={addPhoneInput}>
              <IconPlus size={20} />
            </IconBtn>
          </div>
          <div>
            <TextBtn type="submit">save</TextBtn>
            <TextBtn type="button" onClick={() => nav("/")}>
              back
            </TextBtn>
          </div>
        </form>
      </div>
    </PageLayout>
  );
};

export default AddContact;
