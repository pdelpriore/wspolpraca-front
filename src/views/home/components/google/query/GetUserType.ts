import { gql } from "@apollo/client";

export const GET_USER_TYPE = gql`
  query ($getUserTypeEmail: String!) {
    getUserType(email: $getUserTypeEmail) {
      userType
    }
  }
`;
