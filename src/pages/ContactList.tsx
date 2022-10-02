import React from "react";
import { Link } from "react-router-dom";
import useGetContactList from "../hooks/useGetContactList";

interface Phone {
  number: any;
}

interface Contact {
  id: React.Key;
  first_name: String;
  last_name: String;
  phones: Phone[];
}

const ContactList = () => {
  const { loading, error, data } = useGetContactList();

  let contactList;

  if (loading || error) return <>...</>;

  console.log(data);
  contactList = data.contact.map((contact: Contact) => (
    <div
      key={contact.id}
      style={{ margin: "5px", background: "#60a5fa", color: "white" }}
    >
      <div>
        <div>{contact.first_name}</div>
        <div>{contact.last_name}</div>
      </div>
      <div>
        {contact.phones.map((phone: Phone) => {
          return <span key={phone.number}>{phone.number}</span>;
        })}
      </div>
      <div>
        <button>favorite</button>
        <Link to={`/edit/${contact.id}`}>edit</Link>
        <button>delete</button>
      </div>
    </div>
  ));

  return (
    <div>
      <h1>Contact List</h1>
      <Link to="/add">Add contact</Link>
      {contactList}
    </div>
  );
};

export default ContactList;
