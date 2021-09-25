import { gql } from "@apollo/client";

export const SIGNUP_YOUTUBER = gql`
  mutation ($signupYoutuberData: SignupUserInputType!) {
    signupYoutuber(data: $signupYoutuberData) {
      name
    }
  }
`;
