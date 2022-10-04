/** @jsxImportSource @emotion/react */
import { Contact } from "../App";
import ContactItem from "./ContactItem";

interface FavListProps {
  contacts: Contact[];
}

export const FavList = ({ contacts }: FavListProps) => {
  const favList = contacts.length ? (
    <div>
      <strong>favorite</strong>
      {contacts.map((contact: Contact, idx: number) => {
        return <ContactItem key={idx} {...contact} />;
      })}
    </div>
  ) : (
    <div></div>
  );

  return <>{favList}</>;
};
