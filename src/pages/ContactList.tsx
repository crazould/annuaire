import React from "react";
import { Link } from "react-router-dom";
import useGetContactList from "../hooks/useGetContactList";

export interface Phone {
  number: any;
}

export interface Contact {
  id: React.Key;
  first_name: string;
  last_name: string;
  phones: Phone[];
}

const ContactList = () => {
  const { loading, error, data } = useGetContactList();

  if (loading || error) return <>...</>;

  const contactList = data.contact.map(
    ({ id, first_name, last_name, phones }: Contact) => (
      <div
        key={id}
        style={{
          margin: ".75rem 0px",
          padding: "1rem 2rem",
          background: "#60a5fa",
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          borderRadius: '0.25rem',
        }}
      >
        <div>
          <div>{`${first_name} ${last_name}`}</div>
          <div>
            {phones[0].number}
            {phones.length > 1 ? ` +${phones.length - 1}` : ""}
          </div>
        </div>
        <div style={{ display: "block" }}>
          <button>favorite</button>
          <Link to={`/edit/${id}`}>edit</Link>
          <button>delete</button>
        </div>
      </div>
    )
  );

  return (
    <div style={{ marginInline: "auto", maxWidth: 512 }}>
      <h1>Contact List</h1>
      <Link to="/add">Add contact</Link>
      {contactList}
    </div>
  );
};

export default ContactList;
