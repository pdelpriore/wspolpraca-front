export const getTokenId = (credentials: any) => {
  const {
    _tokenResponse: { idToken },
  } = credentials;
  return idToken;
};
