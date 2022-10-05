/** @jsxImportSource @emotion/react */
import { css, useTheme } from "@emotion/react";
import { Contact } from "../../App";
import ContactItem from "./ContactItem";

interface FavListProps {
  contacts: Contact[];
}

export const FavList = ({ contacts }: FavListProps) => {
  const theme = useTheme();

  const listTitleStyle = css`
    color: ${theme.text};
    font-size: 2.25rem;
  `;

  const favList = contacts.length ? (
    <div
      css={css`
        margin-bottom: 1rem;
      `}
    >
      <div css={listTitleStyle}>favorites</div>
      {contacts.map((contact: Contact, idx: number) => {
        return <ContactItem key={idx} {...contact} />;
      })}
    </div>
  ) : (
    <div></div>
  );

  return <>{favList}</>;
};
