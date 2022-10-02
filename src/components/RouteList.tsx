import { useRoutes } from "react-router-dom";
import ContactPage from "../pages/ContactPage";
import AddContactPage from "../pages/AddContactPage";
import EditContactPage from "../pages/EditContactPage";

export const RouteList = () => {
  return useRoutes([
    { path: "/", element: <ContactPage /> },
    { path: "/add", element: <AddContactPage /> },
    { path: "/edit/:id", element: <EditContactPage /> },
  ]);
};
