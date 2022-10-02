import React, { useState } from "react";
import { ContactList } from "../components/ContactList";
import { Link } from "react-router-dom";

export interface Phone {
  number: any;
}

export interface Contact {
  id: React.Key;
  first_name: string;
  last_name: string;
  phones: Phone[];
}

const ContactPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = (e: React.ChangeEvent) => {
    setSearchQuery((e.target as HTMLInputElement).value);
  };

  return (
    <div style={{ marginInline: "auto", maxWidth: 512 }}>
      <h1>Contact List</h1>
      <div>
        <input type="text" onChange={handleSearch} value={searchQuery} />
        <Link to="/add">New contact</Link>
      </div>
      <ContactList searchQuery={searchQuery} />
    </div>
  );
};

export default ContactPage;
