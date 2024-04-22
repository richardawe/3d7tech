import axios from 'axios';

export const axiosCall = async ({ method, url, params, data, headers }) => {
  try {
    const config = {
      method: method,
      url,
      params,
      data,
      headers,
    };

    const response = await axios(config);
    return response;
  } catch (error) {
    console.error('Error in Axios call:', error);
    throw error;
  }
};
