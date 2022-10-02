import FormContact from "../pages/FormPage";
import { useRoutes } from "react-router-dom";
import ContactPage from "../pages/ContactPage";

export const RouteList = () => {
  return useRoutes([
    { path: "/", element: <ContactPage /> },
    { path: "/add", element: <FormContact /> },
    { path: "/edit/:id", element: <FormContact /> },
  ]);
};
