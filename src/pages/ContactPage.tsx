import React, { useState, useEffect } from "react";
import { ContactList } from "../components/ContactList";
import { Link } from "react-router-dom";
import useGetContactList from "../hooks/useGetContactList";

export interface Phone {
  number: string;
}

export interface Contact {
  id: string | undefined;
  first_name?: string;
  last_name?: string;
  phones: Phone[];
  isFavorite: boolean;
}

const ContactPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [contacts, setContacts] = useState<Contact[]>([]);
  const { data } = useGetContactList();

  useEffect(() => {
    console.log(data);
    if (data) {
      setContacts(data.contact);
      localStorage.setItem("contacts", JSON.stringify(data.contact));
    } else {
      const localContacts = localStorage.getItem("contacts");
      localContacts
        ? setContacts(JSON.parse(localContacts))
        : localStorage.setItem("contacts", JSON.stringify(contacts));
    }
  }, [data]);

  const handleSearch = (e: React.ChangeEvent) => {
    const newSearchQuery = (e.target as HTMLInputElement).value;
    let filteredContacts: Contact[] = [];
    
    if (newSearchQuery.length) {
      filteredContacts = [...contacts]
      filteredContacts = filteredContacts.filter(
        (c) =>
          c.first_name?.includes(newSearchQuery) ||
          c.last_name?.includes(newSearchQuery)
      );
    } else {
      const localContacts = localStorage.getItem("contacts");
      if (localContacts) filteredContacts = [...JSON.parse(localContacts)];
    }

    setContacts(filteredContacts);
    setSearchQuery(newSearchQuery);
  };

  if (!data) return <>...</>;

  return (
    <div style={{ marginInline: "auto", maxWidth: 512 }}>
      <h1>Contact List</h1>
      <div>
        <input type="text" onChange={handleSearch} value={searchQuery} />
        <Link to="/add">New contact</Link>
      </div>
      <ContactList contacts={contacts} />
    </div>
  );
};

export default ContactPage;
