import { gql } from "@apollo/client";

export const SIGNUP_BRAND = gql`
  mutation ($signupBrandData: BrandInputType!) {
    signupBrand(data: $signupBrandData) {
      name
    }
  }
`;
