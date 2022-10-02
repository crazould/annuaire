import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Contact } from "../pages/ContactPage";
import useGetContactList from "../hooks/useGetContactList";
import useDeleteContact from "../hooks/useDeleteContact";

interface ContactProps {
  searchQuery: string;
}

export const ContactList = ({ searchQuery }: ContactProps) => {
  
  const [deleteId, setDeleteId] = useState<React.Key>(0);
  const { loading, error, data } = useGetContactList(searchQuery);
  const [deleteContact, deleteResult] = useDeleteContact(deleteId);

  const handleDelete = (id: number| React.Key) => {
    setDeleteId(id);
    deleteContact();
  };

  useEffect(() => {
    if (deleteResult.error) console.log(deleteResult.error);
    if (deleteResult.data) {
      console.log(deleteResult.data);
      alert("delete success");
    }
  }, [deleteResult]);

  if (loading || error) return <>...</>;

  return (
    <div>
      {data.contact.map(
        ({ id, first_name, last_name, phones }: Contact, idx: number) => (
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
              <div>{id}</div>
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
              <button onClick={() => handleDelete(id)}>delete</button>
            </div>
          </div>
        )
      )}
    </div>
  );
};
