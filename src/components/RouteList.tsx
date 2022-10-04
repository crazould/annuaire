import { useRoutes } from "react-router-dom";
import ContactPage from "../pages/Home";
import AddContactPage from "../pages/AddContact";
import EditContactPage from "../pages/EditContact";

export const RouteList = () => {
  return useRoutes([
    { path: "/", element: <ContactPage /> },
    { path: "/add", element: <AddContactPage /> },
    { path: "/edit/:id", element: <EditContactPage /> },
  ]);
};
