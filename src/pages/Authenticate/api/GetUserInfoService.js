import {jsonFetch} from '../../../common/Helper';

export const getUserInfo = async (token) => {
  const response = await jsonFetch(
    'https://tm.intelliagent.com/apiv2/user/detail?option=current',
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response;
};

export const getAuth0Token = async (email, password) => {
  var formBody = [];
  var details = {
    grant_type: 'password',
    client_id: 'wfzc8Ilhvy5wY8jDJrzx0v85b3QI4fQT',
    username: email,
    password: password,
    connection: 'Username-Password-Authentication',
  };
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + '=' + encodedValue);
  }
  formBody = formBody.join('&');

  const response = await jsonFetch(
    'https://auth0.intelliagent.com/oauth/token',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formBody,
    },
  );
  return response;
};
