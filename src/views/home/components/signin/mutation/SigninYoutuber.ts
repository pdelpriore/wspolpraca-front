import { gql } from "@apollo/client";

export const SIGNIN_YOUTUBER = gql`
  mutation ($signinYoutuberData: SigninUserInputType!) {
    signinYoutuber(data: $signinYoutuberData) {
      userType
      name
      email
      picture
    }
  }
`;
