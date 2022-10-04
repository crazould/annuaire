/** @jsxImportSource @emotion/react */
import { useEffect, useState} from "react";
import { RouteList } from "./components/RouteList";
import { ContactsContext } from "./context/ContactsContext";
import useGetContactList from "./hooks/useGetContactList";
export interface Phone {
  number: string;
}
export interface Contact {
  id: string | undefined;
  first_name: string;
  last_name: string;
  phones: Phone[];
  isFavorite: boolean;
}

function App() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const { data } = useGetContactList();

  useEffect(() => {
    if (data) {
      const localContacts = localStorage.getItem("contacts");
      let newContacts = data.contact;
      if (localContacts) {
        const parsedContacts = JSON.parse(localContacts);
        newContacts = newContacts.map((c: Contact) => {
          let newContact = c;
          const oldContact = parsedContacts.find(
            (oc: Contact) => oc.id == c.id
          );
          newContact = oldContact
            ? { ...newContact, isFavorite: oldContact.isFavorite }
            : { ...newContact, isFavorite: false };

          return newContact;
        });
        localStorage.setItem("contacts", JSON.stringify(newContacts));
        setContacts(newContacts);
      }
    } else {
      const localContacts = localStorage.getItem("contacts");
      localContacts
        ? setContacts(JSON.parse(localContacts))
        : localStorage.setItem("contacts", JSON.stringify([]));
    }
  }, [data]);

  if (!data) return <>...</>;

  return (
    <div>
      <h1>Annuaire</h1>
      <div style={{ marginBlock: "2rem" }}>
        <ContactsContext.Provider value={{ contacts, setContacts }}>
          <RouteList />
        </ContactsContext.Provider>
      </div>
    </div>
  );
}

export default App;
