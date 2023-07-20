import {
  Dimensions,
  Platform
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

const buildError = (error = '') => ({ success: false, error });

export const jsonFetch = async (url, request, timeout, tag) => {
  try {
    if (!timeout) {
      Object.assign(request, { timeout: 30000 });
    } else {
      Object.assign(request, { timeout: parseInt(timeout, 10) });
    }
    console.log('URL', url);
    console.log('REQUEST', request);
    let response = null;
    response = await fetch(url, request);
    const jsonResponse = await response.json();
    // console.log('jsonResponse', jsonResponse);
    // console.log('response', response);
    if (response.status >= 400 || jsonResponse.error || jsonResponse.errors) {
      throw jsonResponse.error || jsonResponse.errors || jsonResponse;
    }
    return Object.assign({ success: true }, jsonResponse);
  } catch (error) {
    return buildError(error);
  }
};

const headers = authToken => {
  const returnValue = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  };
  if (authToken) {
    returnValue.Authorization = authToken;
  }
  return returnValue;
};

export const jsonFetchGet = async (url, options = {}, authToken = '') => {
  try {
    const response = await fetch(url, {
      ...options,
      headers: headers(authToken),
    });
    console.log('URL', url);
    const jsonResponse = await response.json();
    if (response.status >= 400 || jsonResponse.error || jsonResponse.errors) {
      throw jsonResponse.error || jsonResponse.errors || jsonResponse;
    }
    return jsonResponse;
  } catch (error) {
    return buildError(error);
  }
};

export const buildQuery = queryObject => {
  const keys = Object.keys(queryObject);
  return keys
    .map(key => {
      let value = queryObject[key];
      if (!value) {
        return '';
      }
      if (Array.isArray(value)) {
        value = value.map(item => encodeURIComponent(item)).join(',');
      } else {
        value = encodeURIComponent(value);
      }
      return `${encodeURIComponent(key)}=${value}`;
    })
    .filter(has => !!has)
    .join('&');
};

export const font = (fontSize, fontWeight = '', fontFamily = 'Roboto') => ({
  fontSize: getResponsiveFont(fontSize),
  fontFamily: fontWeight ? `${fontFamily}-${fontWeight}` : `${fontFamily}`,
});

export const { width: fullWidth, height: fullHeight } = Dimensions.get(
  'window'
);

export const getFrequecyString = values => {
  let unit = 'day';
  if (parseInt(values.repeat[0].id, 10) === 2 || parseInt(values.repeat[0].id, 10) === 3) {
    unit = 'week';
  } else if (parseInt(values.repeat[0].id, 10) === 4) {
    unit = 'month';
  } else if (parseInt(values.repeat[0].id, 10) === 5) {
    unit = 'year';
  }
  let frequencyString = `${unit}`;
  if (parseInt(values.repeatEvery, 10) > 1) {
    frequencyString = `${unit}s`;
  }
  return frequencyString;
};

export const orderPosts = posts => {
  let temp1 = posts;
  for (let i = 0; i < temp1.length; i++) {
    if (!temp1[i].hasOwnProperty('postDate') && temp1[i].hasOwnProperty('addedOn')) {
      temp1[i].postDate = temp1[i].addedOn;
    }
    if ( temp1[i].postDate.indexOf('T') === 10 ) {
      const tempDate = moment(posts[i].postDate.toString(), ['M/DD/YYYY hh:mm:ss', moment.ISO_8601]);
      temp1[i].postDate = moment(tempDate).format('M/DD/YYYY h:mm:ss A');
    }
  }
  let temp = temp1.sort((a, b) => moment(a.postDate).diff(moment(b.postDate)));
  return temp;
};

export const nodeHistoryTime = dateString => {
  const temp = moment(dateString.split(' ')[0]).calendar();
  const temp2 = dateString.split(' ')[1];
  const temp3 = temp.split('12:00 AM');
  const amPm = dateString.split(' ')[2];
  return `${temp3[0]}${temp2} ${amPm}`;
};

export const formattedAddress = address => {
  const finalAddress = [];
  if (address.addressLine1) {
    finalAddress.push(address.addressLine1);
  }
  if (address.addressLine2) {
    finalAddress.push(address.addressLine2);
  }
  if (address.city) {
    finalAddress.push(address.city);
  }
  if (address.state) {
    finalAddress.push(address.state);
  }
  let temp = finalAddress.join(', ');
  if (address.zipCode) {
    temp = `${temp} ${address.zipCode}`;
  }
  return temp;
};

export const servicePhoneNumbers = phone => {
  const numbers = phone.split(',');
  const temp = numbers.join(', ');
  return temp;
};

export const calendarTime = timeString => {
  let time = moment(timeString).format('hh:mm A');
  return time;
};

export const filesTimeFormatted = timeString => {
  let timeZone = new Date().getTimezoneOffset();
  const shouldAdd = timeZone < 0 ? true : false;
  let time = timeString.split('T');
  time = time[1].slice(0, 5);
  const temp = time.split(':');
  let hours = (parseInt(temp[0], 10)) * 60;
  let minutes = parseInt(temp[1], 10);
  minutes = minutes + hours;
  if (shouldAdd) {
    minutes = minutes + (-timeZone);
  } else {
    minutes = minutes - timeZone;
  }
  hours = parseInt((minutes / 60), 10);
  minutes = parseInt((minutes % 60), 10);
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours %= 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  const strTime = `${hours}:${minutes} ${ampm}`;
  return strTime;
};

export const eventTimeFormatted = timeString => {
  const currentTime = new Date();
  const timeZoneOffset = currentTime.getTimezoneOffset();
  let additionalHours = parseInt(Math.abs(timeZoneOffset / 60), 10);
  let additionalMinutes = Math.abs(timeZoneOffset % 60);
  let time = timeString.split('T');
  time = time[1].slice(0, 5);
  const temp = time.split(':');
  let hours = parseInt(temp[0], 10);
  let minutes = parseInt(temp[1], 10);
  if (timeZoneOffset < 0) {
    hours = hours + additionalHours;
    minutes = minutes + additionalMinutes;
    if (minutes > 59) {
      minutes = minutes % 60;
      hours = hours + 1;
    }
  } else if (timeZoneOffset > 0) {
    hours = hours - additionalHours;
    minutes = minutes - additionalMinutes;
    if (minutes > 59) {
      minutes = minutes % 60;
      hours = hours + 1;
    }
  }
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours %= 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  const strTime = `${hours}:${minutes} ${ampm}`;
  return strTime;
};

export const checkUTC = dateTime => {
  if (!dateTime) {
    return 'N/A';
  } else {
    const shouldUpdate = dateTime.includes('T19');
    let updatedDate = dateTime;
    if (shouldUpdate) {
      updatedDate = moment(dateTime, 'MM/DD/YYYY').add('day', 1).format('MM/DD/YYYY');
    }
    return updatedDate;
  }
};

export const postDateFormat = dateTime => {
  let date = dateTime.replace('T', ' ');
  const temp = moment(dateTime.split('T')[0]).calendar();
  const temp2 = calendarTime(date); // eventTimeFormatted(dateTime);
  const temp3 = temp.split('12:00 AM');
  let alt = temp3[0];
  alt = parseInt(alt[0], 10);
  if (alt === 0 || alt === 1 || alt === 2) {
    alt = true;
  }
  return !alt ? `${temp3[0]}${temp2}` : `on ${temp3[0]} at ${temp2}`;
};

export const getResponsiveFont = fontSize => {
  const scale = fullWidth / 414;
  if (fullHeight > 900 && Platform.OS === 'android') {
    return fontSize * 1.5;
  }
  return fontSize * scale;
};

export const getHomeButtonHeight = () => {
  if (fullHeight > 900) {
    return getHeightPercentage(16);
  }
  if (fullHeight < 580 && Platform.OS === 'android') {
    return getHeightPercentage(17);
  }
  return getWidthPercentage(31.2);
};

export const getResponsiveInputHeight = valuesLength => {
  if (valuesLength < 3) {
    if (fullHeight < 700 && valuesLength > 0) {
      return getHeightPercentage(12.5);
    }
    return getHeightPercentage(10.5);
  }
  if (valuesLength % 2 === 0) {
    let height = (valuesLength - 1) * getHeightPercentage(5.5);
    if (valuesLength > 4) {
      height = height - (height / 5);
    }
    return height;
  } else {
    let height = valuesLength * getHeightPercentage(5.5);
    if (valuesLength > 4) {
      height = height - (height / 5);
    }
    return height;
  }
};

export const filesFiltersFormat = dateValue => {
  const updatedDate = moment(dateValue).format('MM/DD/YYYY hh:mm a');
  console.log(updatedDate);
  return updatedDate;
};

export const alpha = (color, value) => (
  color.startsWith('#') ? `${color}${lighten(value)}` : color
);

export const lighten = (value) => {
  const MAX_HEX_VALUE = 255;
  const hexValue = Math.floor(MAX_HEX_VALUE * Math.min(value, 1)).toString(16);
  return hexValue.length < 2 ? `0${hexValue}` : hexValue;
};

export const removeTags = description => {
  if (!description) {
    return description;
  }
  const temp = description.replace(/&quot;/g, '"');
  const temp2 = temp.replace(/&#39;/g, "'");
  return temp2;
};

export const addCommaSpace = description => {
  if (!description) {
    return description;
  }
  let temp2 = description.split(',');
  temp2 = temp2.filter((a, b) => temp2.indexOf(a) === b);
  temp2 = temp2.join();
  const temp = temp2.replace(/,/g, ', ');
  return temp;
};

export const removeExtension = (name) => {
  if (!name) {
    return { name: name, type: '' };
  } else {
    let extension = name.substr(-4);
    if (name.includes('.jpeg') || name.includes('.docx') || name.includes('.xslx')) {
      extension = name.substr(-5);
    }
    const fileName = name.replace(extension, '');
    return {name: fileName, type: extension};
  }
};

export const showInitials = name => {
  const res = name.split(' ');
  if (!res[1]) {
    return res[0].charAt(0).toUpperCase();
  }
  return `${res[0].charAt(0).toUpperCase()}${res[1].charAt(0).toUpperCase()}`;
};

export const fileDate = date => {
  return !date ? 'N/A' : date.toString().slice(0, 10);
};

export const fromNow = date => {
  const buffer = date.replace('T', ' ');
  return moment.utc((buffer.slice(0, 19) + 'Z'), 'MM-DD-YYYY hh:mm:ss').fromNow();
};

export const getRequestTime = date => {
  const dateString = getFormattedDate(date);
  const timeString = getFormattedTimeAlt(date);
  return `${dateString}${timeString}`;
};

export const getFormattedDate = (date, addDays) => {
  let dd = date.getDate();
  if (addDays) {
    let temp = date.setDate(dd + addDays);
    console.log('temp: ', temp);
    temp = new Date(temp);
    dd = temp.getDate();
  }
  let mm = date.getMonth() + 1; // January is 0!
  const yyyy = date.getFullYear();

  if (dd < 10) {
    dd = `0${dd}`;
  }

  if (mm < 10) {
    mm = `0${mm}`;
  }

  const today = `${mm}/${dd}/${yyyy}`;
  return today;
};

export const getFormattedDateAlt = date => {
  let dd = date.getDate();
  let mm = date.getMonth() + 1; // January is 0!
  const yyyy = date.getFullYear();

  if (dd < 10) {
    dd = `0${dd}`;
  }

  if (mm < 10) {
    mm = `0${mm}`;
  }

  const today = `${yyyy}-${mm}-${dd}`;
  return today;
};

export const getFormattedDateAltNew = date => {
  const today = date.slice(0, 10);
  return today;
};

export const getFormattedTime = date => {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours %= 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  const strTime = `${hours}:${minutes} ${ampm}`;
  return strTime;
};

export const getFormattedTimeAlt = date => {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  // const ampm = hours >= 12 ? 'PM' : 'AM';
  hours %= 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  const strTime = `T${hours}:${minutes}:00`;
  return strTime;
};

export const getCurrentRouteName = navState => {
  if (Object.prototype.hasOwnProperty.call(navState, 'index')) {
    return getCurrentRouteName(navState.routes[navState.index]);
  }
  return navState.routeName;
};

export const getNavigationRouteName = navState => {
  if (Object.prototype.hasOwnProperty.call(navState, 'action')) {
    return getNavigationRouteName(navState.action);
  }
  return navState;
};

export const hasValidZip = zip => {
  const isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zip);
  return isValidZip;
};

export const createRandomSlug = () =>
  Math.random()
    .toString(36)
    .substr(2);

export const saveData = (key, data) => {
  AsyncStorage.setItem(key, JSON.stringify(data));
};

export const getData = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value) {
      return JSON.parse(value);
    }
  } catch (error) {
    return null;
  }
  return null;
};

export const removeData = key => {
  AsyncStorage.removeItem(key);
};

export const containsOneEmoji = (text = '') => {
  const emojiRegex = /^(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32-\ude3a]|[\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])$/;
  return text.length < 4 && text.match(emojiRegex);
};

export const currencyFormat = (n, currency) =>
  `${currency} ${n.toFixed(0).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')}`;

export const currencyFormatDouble = (n, currency) => {
  try {
    return `${currency} ${n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')}`;
  } catch (err) {
    return `${currency}  0.00`;
  }
};

export const currencyFormatDoubleNoSpaceBw$Value = (n, currency) =>
  currency + n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');

export const currencyFormattedString = amount => {
  const dollars = amount / 100;
  return dollars.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD'
  });
};

export const dollarsFormattedString = amount => {
  const dollars = amount;
  return dollars.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD'
  });
};

export const getWidthPercentage = percentage => (fullWidth * percentage) / 100;

export const getHeightPercentage = percentage =>
  (fullHeight * percentage) / 100;

export const isDecimalValue = value => {
  if (value.toString().indexOf('.') !== -1) {
    return true;
  }
  return false;
};

export const logException = value => {
  console.log('LogException', value);
};
