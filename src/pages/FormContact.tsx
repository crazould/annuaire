import React from "react";
import { Link, useParams } from "react-router-dom";
import useGetContactDetail from "../hooks/useGetContactDetail";

const FormContact = () => {
  const { id } = useParams();
  const { loading, error, data } = useGetContactDetail(id);

  if ( (loading || error) ) return <>...</>;
  const handleChange = () => console.log("")

  const { first_name, last_name, phones } = data.contact_by_pk;
  const phoneList = phones.map(({number}: any) => (
    <input onChange={handleChange} key={number} type="tel" value={number} />
  ));

  return (
    <div>
      <h1>Form Contact</h1>
      <form >
        <div>
          <input type="text" onChange={handleChange} value={first_name} />
        </div>
        <div>
          <input type="text" onChange={handleChange} value={last_name} />
        </div>
        <div>
          {phoneList}
        </div>
        <div>
          <input type="button" value="save" />
          <Link to="/">cancel</Link>
        </div>
      </form>
    </div>
  );
};

export default FormContact;
