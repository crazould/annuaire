import { gql, useMutation } from "@apollo/client";
import React from "react";

const DELETE_CONTACT = gql`
  mutation MyMutation($id: Int!) {
    delete_contact_by_pk(id: $id) {
      first_name
      last_name
      id
    }
  }
`;

function useDeleteContact(id: number | React.Key) {
  return useMutation(DELETE_CONTACT, { variables: { id } });
}

export default useDeleteContact;
