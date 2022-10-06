import { createContext } from "react";

interface NotificationContextType {
  notif: string;
  setNotif: React.Dispatch<React.SetStateAction<string>>;
}

const NotificationContext = createContext<NotificationContextType>({
  notif: "",
  setNotif: () => {},
});

export default NotificationContext;
