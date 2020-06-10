import qs from 'qs';
import client from './client';

export const listProducts = ({ page }) => {
  const queryString = qs.stringify({
    page,
  });
  return client.get(`/api/products?${queryString}`);
};

export const readProduct = id => client.get(`/api/products/${id}`)

export const createProduct = ({ productId, productName, price, quantity }) =>
  client.post('/api/products', { productId, productName, price, quantity });

export const removeProduct = (id) => {
  client.delete(`/api/products/${id}`);
};
