/** @jsxImportSource @emotion/react */
import { css, useTheme } from "@emotion/react";
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ContactList } from "./ContactList";
import { FavList } from "./FavList";
import ContactsContext from "../../context/ContactsContext";
import { Contact } from "../../App";
import { IconPlus } from "@tabler/icons";
import PageLayout from "../../components/PageLayout";
import Input from "../../components/Input";
import Button from "../../components/Button";
import TextBtn from "../../components/TextBtn";

const Home = () => {
  const nav = useNavigate();
  const theme = useTheme();
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

  const addBtnStyle = css`
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    z-index: 5;
    border-radius: 9999px;
    padding: 1rem;
    @media (min-width: 1024px) {
      position: static;
      font-family: "Futura Md BT", sans-serif;
      padding: 0.5rem 1rem;
      margin-right: 0.5rem;
      border-radius: 0.5rem;
      margin-bottom: 1rem;
    }
  `;

  const screenWidth = window.screen.width;

  return (
    <PageLayout>
      <div>
        <Button
          styleProp={addBtnStyle}
          onClick={() => nav("/add")}
          type="button"
        >
          {screenWidth >= 1024 ? (
            "Create contact"
          ) : (
            <IconPlus size={20} stroke={3} />
          )}
        </Button>
        <Input
          type="text"
          onChange={handleSearch}
          value={searchQuery}
          placeholder="search..."
        />
      </div>
      <FavList contacts={contacts.filter((c) => c.isFavorite)} />
      <ContactList contacts={contacts.filter((c) => !c.isFavorite)} />
    </PageLayout>
  );
};

export default Home;
