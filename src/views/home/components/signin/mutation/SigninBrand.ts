import { gql } from "@apollo/client";

export const SIGNIN_BRAND = gql`
  mutation ($signinBrandData: SigninUserInputType!) {
    signinBrand(data: $signinBrandData) {
      id
      userType
      name
      email
      picture
    }
  }
`;
