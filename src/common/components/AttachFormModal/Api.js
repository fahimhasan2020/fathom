import { jsonFetch, buildQuery, getUrl } from '../../Helper';

const getForms = async (
  pageValue,
  startValue,
  workspaceId,
  authToken
) => {
  const queryString = buildQuery({
    page: pageValue.toString(),
    start: startValue.toString(),
    limit: '25',
    role: '0',
    workspaceId
  });
  const baseUrl = await getUrl('BASE_URL');
  const url = `${baseUrl}/FormBuilder/Form/GetAll?${queryString}`;
  const response = await jsonFetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authToken}`
    },
    json: true,
  });
  return response;
};

export default getForms;
