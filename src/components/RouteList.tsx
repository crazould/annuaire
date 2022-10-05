import { useRoutes } from "react-router-dom";
import Home from "../pages/Home/Home";
import AddContact from "../pages/AddContact/AddContact";
import EditContact from "../pages/EditContact/EditContact";

const RouteList = () => {
  return useRoutes([
    { path: "/", element: <Home /> },
    { path: "/add", element: <AddContact /> },
    { path: "/edit/:contact_id", element: <EditContact /> },
  ]);
};

export default RouteList;
