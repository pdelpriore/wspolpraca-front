interface ISigninYoutuber {
  signinYoutuber: string;
}

interface ISigninBrand {
  signinBrand: string;
}

export interface IUserSigninParams {
  email: string;
}

export interface ISigninVariables {
  signinYoutuberData: string;
  signinBrandData: string;
}

export type TUserSignin = ISigninYoutuber | ISigninBrand;
