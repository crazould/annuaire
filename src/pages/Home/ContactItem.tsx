/** @jsxImportSource @emotion/react */
import { css, useTheme } from "@emotion/react";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useDeleteContact from "../../hooks/useDeleteContact";
import { Contact } from "../../App";
import ContactsContext from "../../context/ContactsContext";
import { IconStar, IconTrash, IconEdit, IconUserCircle } from "@tabler/icons";
import IconBtn from "../../components/IconBtn";
import Card from "../../components/Card";

const ContactItem = ({
  id,
  first_name,
  last_name,
  phones,
  isFavorite,
}: Contact) => {
  const theme = useTheme();
  const nav = useNavigate();
  const { contacts, setContacts } = useContext(ContactsContext);
  const [deleteContact, { data }] = useDeleteContact(id);
  const handleDelete = () => deleteContact();

  useEffect(() => {
    if (data) {
      const newContacts = [...contacts];
      const index = newContacts.findIndex(
        (c) => c.id === data.delete_contact_by_pk.id
      );
      newContacts.splice(index, 1);
      localStorage.setItem("contacts", JSON.stringify(newContacts));
      setContacts(newContacts);
      alert("delete success");
    }
  }, [data]);

  const toggleFav = () => {
    const newContacts = [...contacts];
    let idx = newContacts.findIndex((c: Contact) => c.id === id);
    if (idx === -1) return;
    newContacts[idx].isFavorite = !newContacts[idx].isFavorite;
    localStorage.setItem("contacts", JSON.stringify(newContacts));
    setContacts(newContacts);
  };

  const itemStyle = css`
    margin-bottom: 0.75rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 3rem;
    @media (max-width: 768px) {
      font-size: 0.825rem;
    }
  `;

  return (
    <Card styleProp={itemStyle}>
      <div
        css={css`
          display: flex;
        `}
      >
        <IconUserCircle
          size={40}
          stroke={1}
          css={css`
            margin-right: 0.25rem;
            color: ${theme.accent};
          `}
        />
        <div>
          <div
            css={css`
              font-weight: bold;
            `}
          >{`${first_name} ${last_name}`}</div>
          <div>
            <div>{phones[0].number}</div>
            <div>{phones.length > 1 ? ` +${phones.length - 1}` : ""}</div>
          </div>
        </div>
      </div>
      <div>
        <IconBtn type="button" onClick={toggleFav}>
          <IconStar size={20} />
        </IconBtn>
        <IconBtn type="button" onClick={() => nav(`/edit/${id}`)}>
          <IconEdit size={20} />
        </IconBtn>
        <IconBtn type="button" onClick={handleDelete}>
          <IconTrash size={20} />
        </IconBtn>
      </div>
    </Card>
  );
};

export default ContactItem;
