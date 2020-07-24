import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import ProductsListPage from './pages/ProductsListPage';
import HomePage from './pages/HomePage';
import WriteProductPage from './pages/WriteProductPage';
import ProductPage from './pages/ProductPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import SearchProductsPage from './pages/SearchProductsPage';

function App() {
  return (
    <>
      <Route component={HomePage} path={'/'} exact />
      <Route component={RegisterPage} path={'/register'} />
      <Route component={LoginPage} path={'/login'} />
      <Route
        component={ProductsListPage}
        path={['/products', '/products/@:username']}
        exact
      />
      {/* <Route component={WriteProductPage} path={'products/create'} /> */}
      <Route component={ProductPage} path={'/products/:_id'} />
      {/* <Route component={ProductPage} path={'/products/:productId'} /> */}
      <Route component={SearchProductsPage} path={'/search'} />
    </>
  );
}

export default App;
