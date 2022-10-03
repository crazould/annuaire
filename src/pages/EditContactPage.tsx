import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import EditPhoneForm from "../components/EditPhoneForm";
import useEditContact from "../hooks/useEditContact";
import useGetContactDetail from "../hooks/useGetContactDetail";
import { Phone } from "./ContactPage";

const EditContactPage = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [numbers, setNumbers] = useState([""]);

  const { id } = useParams();
  const { data } = useGetContactDetail(id);
  const [editContact, editContactResult] = useEditContact(
    id,
    firstName,
    lastName
  );

  useEffect(() => {
    if (data && !editContactResult.data) {
      const { first_name, last_name, phones } = data.contact_by_pk;
      setFirstName(first_name);
      setLastName(last_name);
      setNumbers(phones.map((p: Phone) => p.number));
    }
    if (editContactResult.data) {
      alert("Edit contact success");
      navigate("/");
    }
  }, [data, editContactResult.data]);

  if (!data) return <>...</>;

  const changeFirstName = (e: React.ChangeEvent) => {
    setFirstName((e.target as HTMLInputElement).value);
  };

  const changeLastName = (e: React.ChangeEvent) => {
    setLastName((e.target as HTMLInputElement).value);
  };

  const saveContact = (e: React.FormEvent) => {
    e.preventDefault();
    editContact();
  };

  return (
    <>
      <h1>Edit Contact Form</h1>
      <div>
        <div>
          <div>
            <input
              type="text"
              onChange={changeFirstName}
              placeholder="first name"
              required
              value={firstName}
            />
          </div>
          <div>
            <input
              type="text"
              onChange={changeLastName}
              placeholder="last name"
              required
              value={lastName}
            />
          </div>
          <div>
            <input type="submit" value="save" onClick={saveContact} />
            <Link to="/">cancel</Link>
          </div>
        </div>
        <EditPhoneForm id={id} numbers={numbers} setNumbers={setNumbers} />
      </div>
    </>
  );
};

export default EditContactPage;
