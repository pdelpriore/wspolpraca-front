import { SIGNIN_YOUTUBER } from "../mutation/SigninYoutuber";
import { SIGNIN_BRAND } from "../mutation/SigninBrand";

const getSigninMutation = (userType: string) =>
  userType === "Youtuber" ? SIGNIN_YOUTUBER : SIGNIN_BRAND;

export default getSigninMutation;
