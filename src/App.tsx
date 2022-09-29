import React from "react";
import "./App.css";
import ContactList from "./component/ContactList";
import { Route, Routes, useNavigate } from "react-router-dom";
import FormContact from "./component/FormContact";

function App() {
  const nav = useNavigate();

  return (
    <div>
      <h1>Phone book</h1>
      <Routes>
        <Route path="/" element={<ContactList nav={nav} />} />
        <Route path="/form" element={<FormContact nav={nav} />} />
      </Routes>
    </div>
  );
}

export default App;
