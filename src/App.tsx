/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import { RouteList } from "./components/RouteList";
import { ContactsContext } from "./context/ContactsContext";
import useGetContactList from "./hooks/useGetContactList";
import { ThemeProvider } from "@emotion/react";
import { Header } from "./components/Header";
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

const themeLight = {
  text: "#18181b",
  bg: "#e4e4e7",
  bgComponent: "#fafafa",
  borderComponent: "1px solid #d4d4d8",
  accent: "#2563eb",
};

const themeDark = {
  text: "#fafafa",
  bg: "#18181b",
  bgComponent: "#27272a",
  borderComponent: "1px solid #404040",
  accent: "#2563eb",
};

function App() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isDark, setIsDark] = useState(false);
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
    } else if (!data) {
      const localContacts = localStorage.getItem("contacts");
      localContacts
        ? setContacts(JSON.parse(localContacts))
        : localStorage.setItem("contacts", JSON.stringify([]));
    }

    const localTheme = localStorage.getItem("theme");
    localTheme
      ? setIsDark(JSON.parse(localTheme))
      : localStorage.setItem("theme", JSON.stringify(isDark));

  }, [data]);

  if (!data) return <>...</>;

  return (
    <ThemeProvider theme={isDark ? themeDark : themeLight}>
      <Header isDark={isDark} setIsDark={setIsDark} />
      <div>
        <div style={{ marginBlock: "2rem" }}>
          <ContactsContext.Provider value={{ contacts, setContacts }}>
            <RouteList />
          </ContactsContext.Provider>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
