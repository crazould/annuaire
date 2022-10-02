import { useQuery, gql } from "@apollo/client";

const GET_CONTACT_DETAIL = gql`
  query GetContactDetail($id: Int!) {
    contact_by_pk(id: $id) {
      last_name
      id
      first_name
      created_at
      phones {
        number
      }
    }
  }
`;

function useGetContactDetail(id: number) {
  return useQuery(GET_CONTACT_DETAIL, {
    variables: {
      id,
    },
  });
}

export default useGetContactDetail;
