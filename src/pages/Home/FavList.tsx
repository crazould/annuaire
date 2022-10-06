/** @jsxImportSource @emotion/react */
import { css, useTheme } from "@emotion/react";
import { Contact } from "../../App";
import ContactItem from "./ContactItem";

export const FavList = ({ contacts }: { contacts: Contact[] }) => {
  const theme = useTheme();

  const listTitleStyle = css`
    color: ${theme.text};
    font-size: 2.25rem;
  `;

  const favList = contacts.length ? (
    <div>
      <div css={listTitleStyle}>favorites</div>
      <div
        css={css`
          margin-bottom: 1rem;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
        `}
      >
        {contacts.map((contact: Contact, idx: number) => {
          return <ContactItem key={idx} {...contact} />;
        })}
      </div>
    </div>
  ) : (
    <div></div>
  );

  return <>{favList}</>;
};
