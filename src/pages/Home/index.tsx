import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { ContactList } from "./ContactList";
import { FavList } from "./FavList";
import { ContactsContext } from "../../context/ContactsContext";
import { Contact } from "../../App";

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { contacts, setContacts } = useContext(ContactsContext);

  const handleSearch = (e: React.ChangeEvent) => {
    const newSearchQuery = (e.target as HTMLInputElement).value;
    let filteredContacts: Contact[] = [];
    if (newSearchQuery.length) {
      filteredContacts = [...contacts];
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

  return (
    <div style={{ marginInline: "auto", maxWidth: 512 }}>
      <div>
        <input
          type="text"
          onChange={handleSearch}
          value={searchQuery}
          placeholder="search..."
        />
        <Link to="/add">New contact</Link>
      </div>
      <FavList contacts={contacts.filter((c) => c.isFavorite)} />
      <ContactList contacts={contacts.filter((c) => !c.isFavorite)} />
    </div>
  );
};

export default HomePage;
