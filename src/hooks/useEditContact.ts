import { gql, useMutation } from "@apollo/client";
import { Contact } from "../pages/ContactPage";

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

function useEditContact(
  id: string | undefined,
  firstName: string,
  lastName: string
) {
  const _set = {
    first_name: firstName,
    last_name: lastName,
  };

  return useMutation(EDIT_CONTACT, {
    variables: {
      id,
      _set,
    },
  });
}

export default useEditContact;
