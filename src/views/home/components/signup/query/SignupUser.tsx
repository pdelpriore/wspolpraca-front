import { gql } from "@apollo/client";

export const SIGNUP_USER = gql`
  mutation ($signupYoutuberData: YoutuberInputType!) {
    signupYoutuber(data: $signupYoutuberData) {
      name
    }
  }
`;
