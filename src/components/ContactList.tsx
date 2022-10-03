import React, { useState, useEffect } from "react";
import { Contact } from "../pages/ContactPage";
import ContactItem from "./ContactItem";

interface ContactListProps {
  contacts: Contact[];
}

export const ContactList = ({ contacts }: ContactListProps) => {
  const [page, setPage] = useState(0);
  
  const pages = new Array(Math.ceil(contacts.length / 3)).fill(" ");
  const changePage = (idx: number) => () => setPage(idx);

  return (
    <>
      {contacts
        .slice(0 + page * 3, 3 + page * 3)
        .map((contact: Contact, idx: number) => {
          return <ContactItem key={idx} {...contact} />;
        })}
      <div style={{ display: "flex", justifyContent: "center" }}>
        {pages.map((page: string, idx: number) => {
          return (
            <div
              style={{ marginRight: "2rem", cursor: "pointer" }}
              key={idx}
              onClick={changePage(idx)}
            >
              {idx + 1}
            </div>
          );
        })}
      </div>
    </>
  );
};
