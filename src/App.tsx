/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import RouteList from "./components/RouteList";
import ContactsContext from "./context/ContactsContext";
import NotificationContext from "./context/NotificationContext";
import useGetContactList from "./hooks/useGetContactList";
import { ThemeProvider } from "@emotion/react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Wrapper from "./components/Wrapper";
import { themeDark, themeLight } from "./styles/theme";
import Notification from "./components/Notification";

export interface Phone {
  number: string;
}
export interface Contact {
  id: number;
  first_name: string;
  last_name: string;
  phones: Phone[];
  isFavorite: boolean;
}

function App() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [notif, setNotif] = useState<string>("");
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
            (oc: Contact) => oc.id === c.id
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
      <ContactsContext.Provider value={{ contacts, setContacts }}>
        <NotificationContext.Provider value={{ notif, setNotif }}>
          <Notification/>
          <Header isDark={isDark} setIsDark={setIsDark} />
          <Wrapper>
            <RouteList />
          </Wrapper>
          <Footer />
        </NotificationContext.Provider>
      </ContactsContext.Provider>
    </ThemeProvider>
  );
}

export default App;
