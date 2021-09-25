interface ISigninYoutuber {
  signinYoutuber: string;
}

interface ISigninBrand {
  signinBrand: string;
}

export interface ISigninVariables {
  signinYoutuberData: string;
}

export type TUserSignin = ISigninYoutuber | ISigninBrand;
