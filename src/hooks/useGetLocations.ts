import { useQuery, gql } from "@apollo/client";

const GET_LOCATIONS = gql`
  query GetLocations {
    locations {
      id
      name
      description
      photo
    }
  }
`;

function useGetLocations(){
  return useQuery(GET_LOCATIONS);
}

export default useGetLocations