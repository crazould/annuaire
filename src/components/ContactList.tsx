/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { Contact } from "../App";
import ContactItem from "./ContactItem";

interface ContactListProps {
  contacts: Contact[];
}

export const ContactList = ({ contacts }: ContactListProps) => {
  const [page, setPage] = useState(0);
  const itemShow = 10;
  const pages = new Array(Math.ceil(contacts.length / itemShow)).fill(" ");
  const changePage = (idx: number) => () => setPage(idx);

  return (
    <div>
      <strong>contacts</strong>
      {contacts
        .slice(0 + page * itemShow, itemShow + page * itemShow)
        .map((contact: Contact, idx: number) => {
          return <ContactItem key={idx} {...contact} />;
        })}
      <div style={{ display: "flex", justifyContent: "center" }}>
        {pages.map((_: string, idx: number) => {
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
    </div>
  );
};
