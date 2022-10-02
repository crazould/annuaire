import React from "react";
import { Link } from "react-router-dom";
import { Contact } from "../pages/ContactPage";
import useGetContactList from "../hooks/useGetContactList";

export const ContactList = ({ searchQuery }: any) => {
  const { loading, error, data } = useGetContactList(searchQuery, 10, 1);
  if (error) console.log(error);
  if (loading || error) return <>...</>;
  return (
    <div>
      {data.contact.map(({ id, first_name, last_name, phones }: Contact) => (
        <div
          key={id}
          style={{
            margin: ".75rem 0px",
            padding: "1rem 2rem",
            background: "#60a5fa",
            color: "white",
            display: "flex",
            justifyContent: "space-between",
            borderRadius: "0.25rem",
          }}
        >
          <div>
            <div>{`${first_name} ${last_name}`}</div>
            <div>
              {phones[0].number}
              {phones.length > 1 ? ` +${phones.length - 1}` : ""}
            </div>
          </div>
          <div
            style={{
              display: "block",
            }}
          >
            <button>favorite</button>
            <Link to={`/edit/${id}`}>edit</Link>
            <button>delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};
