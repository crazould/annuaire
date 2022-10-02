import React from "react";
import { Link, useParams } from "react-router-dom";
import useGetContactDetail from "../hooks/useGetContactDetail";
import { Contact, Phone } from "./ContactList";

const FormContact = () => {
  const { id } = useParams();
  const { loading, error, data } = useGetContactDetail(parseInt(id as string));

  if (id && (loading || error)) return <>...</>;

  const handleChange = () => console.log("");
  let contact: Contact = {
    id: "",
    first_name: "",
    last_name: "",
    phones: [{ number: "" }],
  };

  if (data) {
    Object.assign(contact, data.contact_by_pk);
  }

  const { first_name, last_name, phones } = contact;
  const phoneList = phones.map((phone: Phone) => (
    <input
      onChange={handleChange}
      placeholder="phone number"
      key={phone.number}
      type="tel"
      value={phone.number}
    />
  ));

  return (
    <div>
      <h1>Form Contact</h1>
      <form>
        <div>
          <input
            type="text"
            onChange={handleChange}
            placeholder="first name"
            value={first_name}
          />
        </div>
        <div>
          <input
            type="text"
            onChange={handleChange}
            placeholder="last name"
            value={last_name}
          />
        </div>
        <div>{phoneList}</div>
        <div>
          <Link to="/">cancel</Link>
          <input type="button" value="save" />
        </div>
      </form>
    </div>
  );
};

export default FormContact;
