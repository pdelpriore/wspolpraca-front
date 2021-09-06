import { gql } from "@apollo/client";

export const SIGNUP_YOUTUBER = gql`
  mutation ($signupYoutuberData: YoutuberInputType!) {
    signupYoutuber(data: $signupYoutuberData) {
      name
    }
  }
`;
