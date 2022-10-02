import { useEffect } from "react";
import { Link } from "react-router-dom";
import useDeleteContact from "../hooks/useDeleteContact";
import { Contact } from "../pages/ContactPage";

const ContactItem = ({ id, first_name, last_name, phones }: Contact) => {
  const [deleteContact, deleteResult] = useDeleteContact(id);

  const handleDelete = () => {
    deleteContact();
  };

  useEffect(() => {
    if (deleteResult.error) console.log(deleteResult.error);
    if (deleteResult.data) {
      console.log(deleteResult.data);
      alert("delete success");
    }
  }, [deleteResult]);

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
