import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import useDeleteContact from "../hooks/useDeleteContact";
import { Contact, ContactsContext } from "../App";

const ContactItem = ({
  id,
  first_name,
  last_name,
  phones,
  isFavorite,
}: Contact) => {
  const { contacts, setContacts } = useContext(ContactsContext);
  const [deleteContact, { data }] = useDeleteContact(id);
  const handleDelete = () => deleteContact();

  useEffect(() => {
    if (data) {
      const newContacts = [...contacts];
      const index = newContacts.findIndex(
        (c) => c.id == data.delete_contact_by_pk.id
      );
      newContacts.splice(index, 1);
      setContacts(newContacts);
      alert("delete success");
    }
  }, [data]);

  return (
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
        <button onClick={handleDelete}>delete</button>
      </div>
    </div>
  );
};

export default ContactItem;
