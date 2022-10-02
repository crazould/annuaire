import { useQuery, gql } from "@apollo/client";

const EDIT_CONTACT = gql`
  mutation EditContact($id: Int!, $_set: contact_set_input) {
    update_contact_by_pk(pk_columns: { id: $id }, _set: $_set) {
      id
      first_name
      last_name
      phones {
        number
      }
    }
  }
`;

function useEditContact() {
  return useQuery(EDIT_CONTACT);
}

export default useEditContact;
