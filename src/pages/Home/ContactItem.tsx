/** @jsxImportSource @emotion/react */
import { css, useTheme } from "@emotion/react";

import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useDeleteContact from "../../hooks/useDeleteContact";
import { Contact } from "../../App";
import { ContactsContext } from "../../context/ContactsContext";
import {
  IconStar,
  IconTrash,
  IconEdit,
  IconUserCircle,
  IconThermometer,
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

  const cardStyle = css`
    margin-bottom: 0.75rem;
    padding: 1rem 0.5rem;
    background: ${theme.bgComponent};
    color: ${theme.text};
    border-radius: 4px;
    border: ${theme.border};
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    min-height: 3rem;
    :hover {
      transform: translateY(-0.5rem);
    }
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
    position: relative;
    margin-left: 0.25rem;
    z-index: 2;
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
            max-width: 125px;
          `}
        >
          <div css={cardTitleStyle}>{`${first_name} ${last_name}`}</div>
          <div>
            <div>{phones[0].number}</div>
            <div>{phones.length > 1 ? ` +${phones.length - 1}` : ""}</div>
          </div>
        </div>
      </div>
      <div css={css``}>
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
