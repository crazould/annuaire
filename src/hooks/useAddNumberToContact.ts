import { useQuery, gql } from "@apollo/client";

const ADD_NUMBER_TO_CONTACT = gql`
  mutation AddNumberToContact($contact_id: Int!, $phone_number: String!) {
    insert_phone(objects: { contact_id: $contact_id, number: $phone_number }) {
      returning {
        contact {
          id
          last_name
          first_name
          phones {
            number
          }
        }
      }
    }
  }
`;

function useAddNumberToContact() {
  return useQuery(ADD_NUMBER_TO_CONTACT);
}

export default useAddNumberToContact;
