import React from 'react';
import { Route } from 'react-router-dom';
import ProductListPage from './pages/ProductListPage';
import HomePage from './pages/HomePage';
import CreateProductPage from './pages/CreateProductPage';
// import logo from './logo.svg';
// import './App.css';

function App() {
  return (
    <>
      <Route component={HomePage} path={'/'} exact />
      <Route component={ProductListPage} path={'/products'} />
      <Route component={CreateProductPage} path={'/create'} />
    </>
  );
}

export default App;
