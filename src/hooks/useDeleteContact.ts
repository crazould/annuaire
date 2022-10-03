import { gql, useMutation } from "@apollo/client";

const DELETE_CONTACT = gql`
  mutation MyMutation($id: Int!) {
    delete_contact_by_pk(id: $id) {
      first_name
      last_name
      id
    }
  }
`;

function useDeleteContact(id: string | undefined) {
  return useMutation(DELETE_CONTACT, { variables: { id } });
}

export default useDeleteContact;
