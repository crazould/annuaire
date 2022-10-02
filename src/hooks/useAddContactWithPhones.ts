import { gql, useMutation } from "@apollo/client";

const ADD_CONTACT_WITH_PHONES = gql`
  mutation AddContactWithPhones(
    $first_name: String!
    $last_name: String!
    $phones: [phone_insert_input!]!
  ) {
    insert_contact(
      objects: {
        first_name: $first_name
        last_name: $last_name
        phones: { data: $phones }
      }
    ) {
      returning {
        first_name
        last_name
        id
        phones {
          number
        }
      }
    }
  }
`;

function useAddContactWithPhones(
  first_name: string,
  last_name: string,
  numbers: string[]
) {
  const phones = numbers.map((n) => {
    return { number: n };
  });
  return useMutation(ADD_CONTACT_WITH_PHONES, {
    variables: {
      first_name,
      last_name,
      phones,
    },
  });
}

export default useAddContactWithPhones;
