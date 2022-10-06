/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { IconPlus } from "@tabler/icons";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ContactsContext from "../../context/ContactsContext";
import useAddContactWithPhones from "../../hooks/useAddContactWithPhones";
import { formStyle, formTitleStyle } from "../../styles/components";
import PageLayout from "../../components/PageLayout";
import checkName from "../../utils/checkName";
import Input from "../../components/Input";
import TextBtn from "../../components/TextBtn";
import IconBtn from "../../components/IconBtn";
import Card from "../../components/Card";

const AddContact = () => {
  const nav = useNavigate();
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

  const phonesInput = numbers.map((number, idx) => (
    <div className="input-group" key={idx}>
      <label htmlFor={`number-${idx}`}>{`phone ${idx+1}`}</label>
      <Input
        id={`number-${idx}`}
        onChange={(e) => changePhones(e, idx)}
        placeholder="ex: +628123456789"
        type="tel"
        value={number}
        required
      />
    </div>
  ));

  return (
    <PageLayout>
      <Card>
        <form onSubmit={handleSubmit} css={formStyle}>
          <h1 >Add Contact</h1>
          <div className="input-group">
            <label htmlFor="firstName">first name</label>
            <Input
              type="text"
              onChange={changeFirstName}
              placeholder="ex: John"
              value={firstName}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="firstName">last name</label>
            <Input
              type="text"
              onChange={changeLastName}
              placeholder="ex: Doe"
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
      </Card>
    </PageLayout>
  );
};

export default AddContact;
