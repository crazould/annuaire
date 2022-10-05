/** @jsxImportSource @emotion/react */
import { css, useTheme } from "@emotion/react";
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ContactList } from "./ContactList";
import { FavList } from "./FavList";
import { ContactsContext } from "../../context/ContactsContext";
import { Contact } from "../../App";
import { IconPlus } from "@tabler/icons";

const HomePage = () => {
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

  const inputStyle = css`
    font-family: "Futura Md BT", sans-serif;
    display: block;
    border-radius: 4px;
    border: ${theme.border};
    padding: 0.25rem;
    padding-left: rem;
    width: 85%;
  `;

  const pageStyle = css`
    padding-inline: 1rem;
    margin:auto;
    max-width: 1024px;
  `;
  return (
    <div css={pageStyle}>
      <div
        css={css`
          display: flex;
          margin-bottom: .75rem;
        `}
      >
        <input
          type="text"
          onChange={handleSearch}
          value={searchQuery}
          placeholder="search..."
          css={inputStyle}
        />
        <button onClick={() => nav("/add")} css={btnStyle}>
          <IconPlus size={20} />
        </button>
      </div>
      <FavList contacts={contacts.filter((c) => c.isFavorite)} />
      <ContactList contacts={contacts.filter((c) => !c.isFavorite)} />
    </div>
  );
};

export default HomePage;
