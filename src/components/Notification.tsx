/** @jsxImportSource @emotion/react */
import { css, useTheme } from "@emotion/react";
import NotificationContext from "../context/NotificationContext";
import React, { useContext, useEffect } from "react";

const Notification = () => {
  const theme = useTheme();
  const { notif, setNotif } = useContext(NotificationContext);

  useEffect(() => {
    if (notif.length) {
      setInterval(() => {
        setNotif("");
      }, 5000);
    }
  }, [notif]);

  const notifStyle = css`
    padding: 1rem;
    background-color: ${theme.bgComponent};
    color: ${theme.text};
    border: ${theme.border};
    border-left: 6px solid ${theme.accent};
    position: fixed;
    width: 300px;
    top: 10%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10;
  `;

  const activeStyle = css`
    visibility: visible;
    opacity: 1;
    transition: 500ms;
  `;

  const disableStyle = css`
    visibility: hidden;
    opacity: 0;
    transition: 500ms;
  `;

  const style = notif.length
    ? [notifStyle, activeStyle]
    : [notifStyle, disableStyle];

  return (
    <div css={style}>
      <div>{notif}</div>
    </div>
  );
};

export default Notification;
