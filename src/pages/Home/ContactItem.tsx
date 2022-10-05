/** @jsxImportSource @emotion/react */
import { css, useTheme } from "@emotion/react";

import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useDeleteContact from "../../hooks/useDeleteContact";
import { Contact } from "../../App";
import ContactsContext from "../../context/ContactsContext";
import {
  IconStar,
  IconTrash,
  IconEdit,
  IconUserCircle,
} from "@tabler/icons";

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

  const cardStyle = css`
    margin-bottom: 0.75rem;
    padding: 1rem 0.5rem;
    background: ${theme.bgComponent};
    color: ${theme.text};
    border-radius: 0.5rem;
    border: ${theme.border};
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 3rem;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    @media (max-width: 768px) {
      font-size: 0.825rem;
    }
  `;

  const cardTitleStyle = css`
    font-weight: bold;
  `;

  const btnStyle = css`
    color: #fafafa;
    background-color: ${theme.accent};
    border: ${theme.border};
    padding: 0.25rem;
    cursor: pointer;
    border: ${theme.border};
    border-radius: 4px;
    margin-left: 0.25rem;
    :hover {
      background-color: ${theme.accentHover};
    }
  `;

  return (
    <div key={id} css={cardStyle}>
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
        <div
          css={css`
          `}
        >
          <div css={cardTitleStyle}>{`${first_name} ${last_name}`}</div>
          <div>
            <div>{phones[0].number}</div>
            <div>{phones.length > 1 ? ` +${phones.length - 1}` : ""}</div>
          </div>
        </div>
      </div>
      <div>
        <button onClick={toggleFav} css={btnStyle}>
          <IconStar size={20} />
        </button>
        <button css={btnStyle} onClick={() => nav(`/edit/${id}`)}>
          <IconEdit size={20} />
        </button>
        <button css={btnStyle} onClick={handleDelete}>
          <IconTrash size={20} />
        </button>
      </div>
    </div>
  );
};

export default ContactItem;
