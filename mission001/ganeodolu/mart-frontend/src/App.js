import React from 'react';
import { Route } from 'react-router-dom';
import ProductsListPage from './pages/ProductsListPage';
import HomePage from './pages/HomePage';
import CreateProductPage from './pages/CreateProductPage';
import ProductPage from './pages/ProductPage';
import './App.css';

function App() {
  return (
    <>
      <Route component={HomePage} path={'/'} exact />
      <Route component={ProductsListPage} path={'/products'} exact />
      <Route component={CreateProductPage} path={'/create'} />
      <Route component={ProductPage} path={'/products/:_id'} />
    </>
  );
}

export default App;
