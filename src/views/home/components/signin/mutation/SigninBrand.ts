import { gql } from "@apollo/client";

export const SIGNIN_BRAND = gql`
  mutation ($signinBrandData: SigninUserInputType!) {
    signinBrand(data: $signinBrandData) {
      name
      email
      picture
    }
  }
`;
