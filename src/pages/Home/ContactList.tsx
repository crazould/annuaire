/** @jsxImportSource @emotion/react */
import { css, useTheme } from "@emotion/react";
import { useState } from "react";
import { Contact } from "../../App";
import ContactItem from "./ContactItem";

interface ContactListProps {
  contacts: Contact[];
}

export const ContactList = ({ contacts }: ContactListProps) => {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const itemShow = 10;
  const pages = new Array(Math.ceil(contacts.length / itemShow)).fill(" ");
  const changePage = (idx: number) => () => setPage(idx);

  const listTitleStyle = css`
    color: ${theme.text};
    font-size: 2.25rem;
  `;

  const paginationStyle = css`
    display: flex;
    justify-content: center;
    div {
      color: #fafafa;
      margin-inline: 0.25rem;
      cursor: pointer;
      border: ${theme.border};
      padding: 0.25rem 0.5rem;
      border-radius: 0.5rem;
      box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1),
        0 2px 4px -2px rgb(0 0 0 / 0.1);
    }
  `;

  const pagination =
    pages.length === 1 ? (
      <div></div>
    ) : (
      <div css={paginationStyle}>
        {pages.map((_: string, idx: number) => {
          return (
            <div
              key={idx}
              onClick={changePage(idx)}
              css={css`
                background-color: ${page === idx
                  ? theme.accentHover
                  : theme.accent};
              `}
            >
              {idx + 1}
            </div>
          );
        })}
      </div>
    );

  return (
    <div>
      <div css={listTitleStyle}>contacts</div>
      <div css={css`margin-bottom: 1rem`}>
        {contacts
          .slice(0 + page * itemShow, itemShow + page * itemShow)
          .map((contact: Contact, idx: number) => {
            return <ContactItem key={idx} {...contact} />;
          })}
      </div>
      {pagination}
    </div>
  );
};
