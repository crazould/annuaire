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
    font-weight: bold;
    padding-bottom: 2.5px;
    margin-bottom: 10px;
    border-bottom: 1px solid ${theme.text};
  `;
  const favList = contacts.length ? (
    <div>
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
