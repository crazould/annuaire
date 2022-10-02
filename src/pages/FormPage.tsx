import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useAddContactWithPhones from "../hooks/useAddContactWithPhones";
import useGetContactDetail from "../hooks/useGetContactDetail";
import { Phone } from "./ContactPage";

const FormContact = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { loading, error, data } = useGetContactDetail(parseInt(id as string));
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [numbers, setNumbers] = useState([""]);
  const [addContact, AddResult] = useAddContactWithPhones(
    firstName,
    lastName,
    numbers
  );

  useEffect(() => {
    if (AddResult.data) {
      alert("add Contact success");
      navigate("/");
    }
    if (!data) return;
    const { first_name, last_name, phones } = data.contact_by_pk;
    setFirstName(first_name);
    setLastName(last_name);
    setNumbers(phones.map((p: Phone) => p.number));
  }, [data, AddResult, navigate]);

  if (id && (loading || error)) return <>...</>;


  const changeFirstName = (e: React.ChangeEvent) => {
    setFirstName((e.target as HTMLInputElement).value);
  };

  const changeLastName = (e: React.ChangeEvent) => {
    setLastName((e.target as HTMLInputElement).value);
  };

  const changePhone = (e: React.ChangeEvent, idx: number) => {
    let newPhones = [...numbers];
    newPhones[idx] = (e.target as HTMLInputElement).value;
    setNumbers(newPhones);
  };

  const addPhoneInput = () => {
    setNumbers([...numbers, ""]);
  };

  const handleSave = () => {
    if (!id) addContact();
  };

  const phonesInput = numbers.map((number, idx) => (
    <input
      onChange={(e) => changePhone(e, idx)}
      placeholder="phone number"
      key={idx}
      type="tel"
      value={number}
    />
  ));

  return (
    <>
      <h1>Form Contact</h1>
      <div>
        <div>
          <input
            type="text"
            onChange={changeFirstName}
            placeholder="first name"
            value={firstName}
          />
        </div>
        <div>
          <input
            type="text"
            onChange={changeLastName}
            placeholder="last name"
            value={lastName}
          />
        </div>
        <div>
          {phonesInput}
          <button onClick={addPhoneInput}>+</button>
        </div>
        <div>
          <input type="button" value="save" onClick={handleSave} />
          <Link to="/">cancel</Link>
        </div>
      </div>
    </>
  );
};

export default FormContact;
