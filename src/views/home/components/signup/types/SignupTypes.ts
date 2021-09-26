interface ISignupYoutuber {
  signupYoutuber: string;
}

interface ISignupBrand {
  signupBrand: string;
}

export interface IUserSignupParams {
  userType: string;
  name: string;
  email: string;
  picture?: string;
}

export interface ISignupVariables {
  signupYoutuberData: string;
  signupBrandData: string;
}

export type TUserSignup = ISignupYoutuber | ISignupBrand;
