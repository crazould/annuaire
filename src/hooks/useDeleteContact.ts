import { useQuery, gql } from "@apollo/client";

const DELETE_CONTACT = gql`
  mutation DeleteContact($id: Int!) {
    delete_contact_by_pk(id: $id) {
      first_name
      last_name
      id
    }
  }
`;

function useDeleteContact() {
  return useQuery(DELETE_CONTACT);
}

export default useDeleteContact;
