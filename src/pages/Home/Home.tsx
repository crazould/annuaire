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

  const btnStyle = css`
    color: #fafafa;
    background-color: ${theme.accent};
    border: ${theme.border};
    padding: 0.25rem;
    cursor: pointer;
    border: ${theme.border};
    border-radius: 4px;
    margin-left: 0.25rem;
    :hover {
      background-color: ${theme.accentHover};
    }
  `;

  return (
    <PageLayout>
      <div
        css={css`
          display: flex;
          margin-bottom: 0.75rem;
        `}
      >
        <Input
          type="text"
          onChange={handleSearch}
          value={searchQuery}
          placeholder="search..."
        />
        <button onClick={() => nav("/add")} css={[btnStyle]}>
          <IconPlus size={20} />
        </button>
      </div>
      <FavList contacts={contacts.filter((c) => c.isFavorite)} />
      <ContactList contacts={contacts.filter((c) => !c.isFavorite)} />
    </PageLayout>
  );
};

export default Home;
