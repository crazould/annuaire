/** @jsxImportSource @emotion/react */
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import useDeleteContact from "../../hooks/useDeleteContact";
import { Contact } from "../../App";
import { ContactsContext } from "../../context/ContactsContext";
import { css } from "@emotion/react";

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
      localStorage.setItem("contacts", JSON.stringify(newContacts));
      setContacts(newContacts);
      alert("delete success");
    }
  }, [data]);

  const toggleFav = () => {
    const newContacts = [...contacts];
    let idx = newContacts.findIndex((c: Contact) => c.id == id);
    if (idx == -1) return;
    newContacts[idx].isFavorite = !newContacts[idx].isFavorite;
    localStorage.setItem("contacts", JSON.stringify(newContacts));
    setContacts(newContacts);
  };

  const bgColor = isFavorite ? "red" : "white";
  const facStyle = css`
    background-color: ${bgColor};
    &:hover {
      cursor: pointer;
    }
  `;

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
        <button onClick={toggleFav} css={facStyle}>
          favorite
        </button>
        <Link to={`/edit/${id}`}>edit</Link>
        <button onClick={handleDelete}>delete</button>
      </div>
    </div>
  );
};

export default ContactItem;
