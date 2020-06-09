import qs from 'qs';
import client from './client';

export const listProducts = ({
  page
}) => {
  const queryString = qs.stringify({
    page
  });
  return client.get(`/api/products?${queryString}`);
  // return client.get(`/api/products?${queryString}`);
};
