import { SIGNUP_YOUTUBER } from "../mutation/SignupYoutuber";
import { SIGNUP_BRAND } from "../mutation/SignupBrand";

const getSignupMutation = (userType: string) =>
  userType === "Youtuber" ? SIGNUP_YOUTUBER : SIGNUP_BRAND;

export default getSignupMutation;
