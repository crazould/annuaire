import React from "react";
import { NavigateFunction } from "react-router-dom";

interface IContactListProps {
  nav: NavigateFunction;
}

export default class ContactList extends React.Component<
  IContactListProps,
  {}
> {
  render() {
    return (
      <div>
        <h1>Contact List</h1>
        <button onClick={() => this.props.nav("/form")}>Add contact</button>
      </div>
    );
  }
}
