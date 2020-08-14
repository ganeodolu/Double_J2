import axios from 'axios';

export const getBooksList = () => axios.get('/api/books');
export const getTypeBooksList = ( type ) => axios.get('/api/books/', type)
export const addBook = ( book ) => axios.post('/api/books', book);
export const updateStock = ({ id, stock, quantity }) => axios.patch('/api/books', { id, stock, quantity })
export const deleteStock = ({ id }) => axios.delete('/api/books', { id });