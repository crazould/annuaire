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
    if(!data) return
    setContacts(data.contact)
  }, [data]);

  const handleSearch = (e: React.ChangeEvent) => {
    setSearchQuery((e.target as HTMLInputElement).value);
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
