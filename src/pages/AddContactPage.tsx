import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ContactsContext } from "../App";
import useAddContactWithPhones from "../hooks/useAddContactWithPhones";

const AddContactPage = () => {
  const navigate = useNavigate();
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
    setContacts([...contacts, data.insert_contact.returning[0]]);
    alert("Add contact success");
    navigate("/");
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
    const isExists = contacts.find(
      (c) => `${firstName} ${lastName}` == `${c.first_name} ${c.last_name}`
    );
    if (isExists) {
      alert("name already used");
      return;
    }
    addContact();
  };

  const phonesInput = numbers.map((number, idx) => (
    <input
      onChange={(e) => changePhones(e, idx)}
      placeholder="phone number"
      key={idx}
      type="tel"
      value={number}
      required
    />
  ));

  return (
    <>
      <h1>Add Contact Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            onChange={changeFirstName}
            placeholder="first name"
            value={firstName}
            required
          />
        </div>
        <div>
          <input
            type="text"
            onChange={changeLastName}
            placeholder="last name"
            value={lastName}
            required
          />
        </div>
        <div>
          {phonesInput}
          <button onClick={addPhoneInput}>+</button>
        </div>
        <div>
          <input type="submit" value="save" />
          <Link to="/">cancel</Link>
        </div>
      </form>
    </>
  );
};

export default AddContactPage;
