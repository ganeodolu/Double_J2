import React from 'react';
// import { Link } from 'react-router-dom';

const ProductItem = ({product}) => {
  const { productId, productName, price, quantity, _id} = product
  return (
  <section className="ProductInfo">
    <div>{productId}</div>
    <img src='http://bgf-cu.xcache.kinxcdn.com/product/8801771018452.jpg' />
    <div>이름:{productName}</div>
    <div>{price}원</div>
    <div>{quantity}개</div>
  </section>
  )
}

const ProductList = ({products, loading, error}) => {
  console.log(products);
  if(error) {
    return <div>에러 발생</div>
  }
  return (
  <div>
    {!loading && products && (
      <div>
        {products.map(product => (
          <ProductItem product={product} key={product._id} />
        ))}
      </div>
    )}
  </div>
  );
};

export default ProductList;
