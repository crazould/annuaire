import { Contact } from "../pages/ContactPage";
import useGetContactList from "../hooks/useGetContactList";
import ContactItem from "./ContactItem";

interface ContactListProps {
  searchQuery: string;
}

export const ContactList = ({ searchQuery }: ContactListProps) => {
  const { loading, error, data } = useGetContactList(searchQuery);
  if (loading || error) return <>...</>;

  return (
    <>
      {data.contact.map((contact: Contact, idx: number) => {
        return <ContactItem key={idx} {...contact} />;
      })}
    </>
  );
};
