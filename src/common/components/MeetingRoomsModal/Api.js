// import { URLSearchParams } from 'whatwg-url';
import { jsonFetch, getUrl } from '../../Helper';

const getRooms = async (page, start, workspaceId, authToken, filterValue) => {
  const filters = [];
  filters.push({
    property: 'isPublic',
    operator: '=', // Comment this line for response like portal
    value: false
  });
  filters.push({
    property: 'typeCode',
    value: '',
    operator: '='
  });
  //  Comment this block for the response like portal
  if (filterValue) {
    filters.push({
      property: 'accessType',
      value: filterValue === 'OWNED' ? ['OWNED'] : ['SHARED'],
      operator: 'in',
      rightFilter: true
    });
  }

  const formData = new URLSearchParams();
  formData.append('page', page);
  formData.append('start', start);
  formData.append('limit', 10);
  formData.append('filter', JSON.stringify(filters));
  formData.append('workspaceId', workspaceId);
  const baseUrl = await getUrl('BASE_URL');
  const response = await jsonFetch(`${baseUrl}/WebRtc/GetMeetingRooms`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${authToken}`
    },
    body: formData.toString(),
    json: true,
  });
  return response;
};

export default getRooms;
