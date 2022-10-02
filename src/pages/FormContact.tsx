import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import useGetContactDetail from "../hooks/useGetContactDetail";
import { Phone } from "./ContactList";

const FormContact = () => {
  const { id } = useParams();
  const { loading, error, data } = useGetContactDetail(parseInt(id as string));

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phones, setPhones] = useState([{ number: "" }]);

  if (id && (loading || error)) return <>...</>;

  const changeFirstName = (e: React.ChangeEvent) => {
    const input = e.target as HTMLInputElement;
    setFirstName(input.value);
  };

  const changeLastName = (e: React.ChangeEvent) => {
    const input = e.target as HTMLInputElement;
    setLastName(input.value);
  };

  const changePhone = (e: React.ChangeEvent, idx: number) => {
    const input = e.target as HTMLInputElement;
    let newPhones = [...phones];
    newPhones[idx].number = input.value;
    setPhones(newPhones);
  };

  if (data) {
    const { first_name, last_name, phones } = data.contact_by_pk;
    setFirstName(first_name);
    setLastName(last_name);
    setPhones(phones);
  }

  const phonesInput = phones.map(({ number }: Phone, idx) => (
    <input
      onChange={(e) => changePhone(e, idx)}
      placeholder="phone number"
      key={idx}
      type="tel"
      value={number}
    />
  ));

  const addPhoneInput = () => {
    setPhones([...phones, { number: "" }]);
  };

  return (
    <div>
      <h1>Form Contact</h1>
      <div>
        <div>
          <input
            type="text"
            onChange={changeFirstName}
            placeholder="first name"
            value={firstName}
          />
        </div>
        <div>
          <input
            type="text"
            onChange={changeLastName}
            placeholder="last name"
            value={lastName}
          />
        </div>
        <div>
          {phonesInput}
          <button onClick={addPhoneInput}>+</button>
        </div>
        <div>
          <Link to="/">cancel</Link>
          <input type="button" value="save" />
        </div>
      </div>
    </div>
  );
};

export default FormContact;
