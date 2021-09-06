import { SIGNUP_YOUTUBER } from "../mutation/SignupYoutuber";
import { SIGNUP_BRAND } from "../mutation/SignupBrand";

const getMutation = (userType: string) =>
  userType === "Youtuber" ? SIGNUP_YOUTUBER : SIGNUP_BRAND;

export default getMutation;
