const getAuthToken = async (email, token) => {
  const body = {
    email,
    token,
  };
  const response = await fetch('https://tm.intelliagent.com/apiv2/auth/sso', {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain',
      'Content-Type': 'application/json;charset=UTF-8',
      // 'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  return response;
};
export default getAuthToken;
