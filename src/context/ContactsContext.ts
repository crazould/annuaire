import { createContext } from "react";
import { Contact } from "../App";

interface ContactsContextType {
  contacts: Contact[];
  setContacts: React.Dispatch<React.SetStateAction<Contact[]>>;
}

const ContactsContext = createContext<ContactsContextType>({
  contacts: [],
  setContacts: () => {},
});

export default ContactsContext