import React from "react";
import { NavigateFunction } from "react-router-dom";

interface IFormContactProps {
  nav: NavigateFunction;
}

export default class FormContact extends React.Component<
  IFormContactProps,
  {}
> {
  render() {
    return (
      <div>
        <h1>Form Contact</h1>
        <button onClick={() => this.props.nav("/")}>cancel</button>
        <button>save</button>
      </div>
    );
  }
}
