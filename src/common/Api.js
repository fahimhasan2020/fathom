// import { URLSearchParams } from 'whatwg-url';
import { Platform } from 'react-native';
import moment from 'moment';
import { jsonFetch, getUrl } from './Helper';

export const GetCategories = async (workspaceId, authToken) => {
  const filters = [];
  filters.push({ property: 'channelTypeCode', operator: '=', value: 'RQS' });
  const formData = new URLSearchParams();
  formData.append(
    'filter',
    '[{"property":"channelTypeCode","value":"RQS","operator":"="}]'
  ); // JSON.stringify(filters));
  formData.append('workspaceId', workspaceId);
  const baseUrl = await getUrl('BASE_URL');
  const response = await jsonFetch(
    `${baseUrl}/ChannelPostApi/GetChannelRootCategories`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${authToken}`
      },
      body: formData.toString(),
      json: true,
    }
  );
  return response;
};

export const GetMasterData = async () => {
  const baseUrl = await getUrl('BASE_URL');
  const response = await jsonFetch(`${baseUrl}/UtilityApi/GetRefmValuesList`, {
    method: 'POST',
    json: true,
  });
  return response;
};

export const getWorkspace = async (email, authToken) => {
  const formData = new URLSearchParams();
  formData.append('email', email);
  const baseUrl = await getUrl('BASE_URL');
  const response = await jsonFetch(
    `${baseUrl}/UserApi/GetUserDetailsByEmailForOAuth`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${authToken}`
      },
      body: formData.toString(),
      json: true,
    }
  );
  return response;
};

export const registrationService = async (id, token, authToken) => {
  const formData = new URLSearchParams();
  const platform = Platform.select({ ios: 'I', android: 'A' });
  const date = moment().format();
  formData.append('UserID', id);
  formData.append('FCMToken', token);
  formData.append('PlateForm', platform);
  formData.append('TokenExpire', date);
  const baseUrl = await getUrl('BASE_URL');
  const response = await jsonFetch(
    `${baseUrl}/FCM/RegisterDevice`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${authToken}`
      },
      body: formData.toString(),
      json: true,
    }
  );
  return response;
};

export const registrationTGGService = async (email, token, authToken) => {
  const data = {
    Key: 'PUSH_NOTIFICATION_TOKEN',
    SycnUrl: 'testtgg.goodgrid.com',
    Token: 'x0x223262hhoosqsdfjwssawnhsx',
    Data: {
      email,
      notify_token: token
    }
  };
  const signupGlobalUrl = await getUrl('SIGNUP_GLOBAL_URL');
  const response = await jsonFetch(`${signupGlobalUrl}/provider`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`
    },
    body: JSON.stringify(data),
    json: true,
  });
  return response;
};

export const unregistrationService = async (seqId, authToken) => {
  const formData = new URLSearchParams();
  formData.append('SeqId', seqId);
  const baseUrl = await getUrl('BASE_URL');
  const response = await jsonFetch(
    `${baseUrl}/FCM/RemoveRegisterDevice`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${authToken}`
      },
      body: formData.toString(),
      json: true,
    }
  );
  return response;
};

export const unregistrationTGGService = async (email, authToken) => {
  const data = {
    Key: 'REMOVE_NOTIFICATION_TOKEN',
    SycnUrl: 'testtgg.goodgrid.com',
    Token: 'x0x223262hhoosqsdfjwssawnhsx',
    Data: {
      email
    }
  };
  const signupGlobalUrl = await getUrl('SIGNUP_GLOBAL_URL');
  const response = await jsonFetch(`${signupGlobalUrl}/provider`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`
    },
    body: JSON.stringify(data),
    json: true,
  });
  return response;
};
