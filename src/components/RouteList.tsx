import ContactList from "../pages/ContactList";
import FormContact from "../pages/FormContact";
import { useRoutes } from "react-router-dom";

export const RouteList = () => {
  return useRoutes([
    { path: "/", element: <ContactList /> },
    { path: "/add", element: <FormContact /> },
    { path: "/edit/:id", element: <FormContact /> },
  ]);
};
