import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
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
  const [editContact, editResult] = useEditContact(id, firstName, lastName);

  useEffect(() => {
    if (data && !editResult.data){
      const { first_name, last_name, phones } = data.contact_by_pk;
      setFirstName(first_name);
      setLastName(last_name);
      setNumbers(phones.map((p: Phone) => p.number));
    }
    if(editResult.data){
      alert("Edit contact success")
      navigate("/")
    }
  }, [data, editResult.data]);

  if (!data) return <>...</>;

  const changeFirstName = (e: React.ChangeEvent) => {
    setFirstName((e.target as HTMLInputElement).value);
  };

  const changeLastName = (e: React.ChangeEvent) => {
    setLastName((e.target as HTMLInputElement).value);
  };

  const changePhones = (e: React.ChangeEvent, idx: number) => {
    let newNumbers = [...numbers];
    newNumbers[idx] = (e.target as HTMLInputElement).value;
    setNumbers(newNumbers);
  };

  const addPhoneInput = () => {
    setNumbers([...numbers, ""]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    editContact();
  };

  const phonesInput = numbers.map((number, idx) => (
    <input
      onChange={(e) => changePhones(e, idx)}
      placeholder="phone number"
      key={idx}
      type="tel"
      value={number}
    />
  ));

  return (
    <>
      <h1>Edit Contact Form</h1>
      <form onSubmit={handleSubmit}>
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
          {phonesInput}
          <button onClick={addPhoneInput}>+</button>
        </div>
        <div>
          <input type="submit" value="save" />
          <Link to="/">cancel</Link>
        </div>
      </form>
    </>
  );
};

export default EditContactPage;
