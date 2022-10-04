/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import { RouteList } from "./components/RouteList";
import { ContactsContext } from "./context/ContactsContext";
import useGetContactList from "./hooks/useGetContactList";
import { css, ThemeProvider } from "@emotion/react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
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
  border: "1px solid #d4d4d8",
  accent: "#2563eb",
  accentHover: "#60a5fa",
};

const themeDark = {
  text: "#fafafa",
  bg: "#18181b",
  bgComponent: "#27272a",
  border: "1px solid #404040",
  accent: "#2563eb",
  accentHover: "#60a5fa",
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

  const wrapperStyle = css`
    color: ${isDark ? themeDark.text : themeLight.text};
    background-color: ${isDark ? themeDark.bg : themeLight.bg};
    padding-block: 2rem;
    min-height: 90vh;
  `

  return (
    <ThemeProvider theme={isDark ? themeDark : themeLight}>
      <Header isDark={isDark} setIsDark={setIsDark} />
      <main css={wrapperStyle}>
        <ContactsContext.Provider value={{ contacts, setContacts }}>
          <RouteList />
        </ContactsContext.Provider>
      </main>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
