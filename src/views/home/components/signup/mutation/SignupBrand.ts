import { gql } from "@apollo/client";

export const SIGNUP_BRAND = gql`
  mutation ($signupBrandData: SignupUserInputType!) {
    signupBrand(data: $signupBrandData) {
      name
    }
  }
`;
