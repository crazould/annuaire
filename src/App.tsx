import { useEffect, useState, createContext } from "react";
import "./App.css";
import { RouteList } from "./components/RouteList";
import useGetContactList from "./hooks/useGetContactList";
export interface Phone {
  number: string;
}
export interface Contact {
  id: string | undefined;
  first_name?: string;
  last_name?: string;
  phones: Phone[];
  isFavorite: boolean;
}

interface ContactsContextType{
  contacts: Contact[],
  setContacts: React.Dispatch<React.SetStateAction<Contact[]>>
}

export const ContactsContext = createContext<ContactsContextType>({
  contacts:[], 
  setContacts: () => {}
});

function App() {

  const [contacts, setContacts] = useState<Contact[]>([]);
  const { data } = useGetContactList();

  useEffect(() => {
    console.log(data);
    if (data) {
      setContacts(data.contact);
      localStorage.setItem("contacts", JSON.stringify(data.contact));
    } else {
      const localContacts = localStorage.getItem("contacts");
      localContacts
        ? setContacts(JSON.parse(localContacts))
        : localStorage.setItem("contacts", JSON.stringify(contacts));
    }
  }, [data]);

  if (!data) return <>...</>;

  return (
    <div>
      <h1>Phone book</h1>
      <div style={{marginBlock: '2rem'}}>
        <ContactsContext.Provider value={{contacts, setContacts}}>
          <RouteList/>
        </ContactsContext.Provider>
      </div>
    </div>
  );
}

export default App;
