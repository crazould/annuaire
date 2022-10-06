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
    width: 100%;
    margin-top: 2rem;
    padding-top: 2.25rem;
    padding-inline: 0.75rem;
    display: flex;
    justify-content: space-between;
    position: relative;
    @media (min-width: 768px) {
      width: calc(98% / 2);
    }
    @media (min-width: 1024px) {
      display: block;
      .contact-info {
        min-height: 70px;
        margin-bottom: 1.5rem;
      }
    }
  `;

  const screenWidth = window.screen.width;

  return (
    <Card styleProp={itemStyle}>
      <div
        css={css`
          background-color: ${theme.accent};
          color: #fafafa;
          border-radius: 9999px;
          padding: 0.5rem 1rem;
          font-size: 1.5rem;
          font-weight: 600;
          position: absolute;
          text-transform: uppercase;
          box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1),
            0 2px 4px -2px rgb(0 0 0 / 0.1);
          top: -1.25rem;
        `}
      >
        {first_name[0]}
      </div>
      <div className="contact-info">
        <div
          css={css`
            font-weight: bold;
            margin-bottom: 0.25rem;
            @media (min-width: 1024px) {
              font-size: 1.25rem
            }
          `}
        >{`${first_name} ${last_name}`}</div>
        <div
          css={css`
            margin-bottom: 0.25rem;
          `}
        >
          {phones[0].number}
        </div>
        {phones.length > 1 ? (
          <span
            css={css`
              border-radius: 0.5rem;
              font-size: 0.625rem;
              padding: 0.25rem;
              background-color: ${theme.bg};
              color: ${theme.text};
              border: ${theme.border};
            `}
          >
            +{phones.length - 1} more
          </span>
        ) : (
          ""
        )}
      </div>
      <div
        css={css`
          min-width: 102px;
        `}
      >
        <IconBtn type="button" onClick={toggleFav}>
          <IconStar size={screenWidth >= 768 ? 24 : 20} />
        </IconBtn>
        <IconBtn type="button" onClick={() => nav(`/edit/${id}`)}>
          <IconEdit size={screenWidth >= 768 ? 24 : 20} />
        </IconBtn>
        <IconBtn type="button" onClick={handleDelete}>
          <IconTrash size={screenWidth >= 768 ? 24 : 20} />
        </IconBtn>
      </div>
    </Card>
  );
};

export default ContactItem;
