import qs from 'qs';
import client from './client';

export const searchProducts = ({ query, page, size }) => {
  const queryString = qs.stringify({
    query,
    page,
    size,
  });
  return client.get(`/api/search?${queryString}`);
};
