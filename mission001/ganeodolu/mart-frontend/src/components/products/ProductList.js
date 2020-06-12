import React from 'react';
import ProductActionButtonsContainer from '../../containers/product/ProductActionButtonsContainer';
// import { Link } from 'react-router-dom';

const ProductItem = ({ product, onClickProduct }) => {
  const { productId, productName, price, quantity, _id } = product;

  return (
    <>
      <section className="Products-Info" onClick={() => onClickProduct(_id)}>
        <div>{productId}</div>
        <img src="/images/product2.jpg" alt="제품사진" />
        <div>이름:{productName}</div>
        <div>{price}원</div>
        <div>{quantity}개</div>
      </section>
      {/* <ProductActionButtonsContainer _id={_id} /> */}
    </>
  );
};

const ProductList = ({ products, loading, error, onClickProduct }) => {
  console.log(products);
  if (error) {
    return <div>에러 발생</div>;
  }
  return (
    <div>
      {!loading && products && (
        <div>
          {products.map((product) => (
            <ProductItem
              product={product}
              key={product._id}
              onClickProduct={onClickProduct}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
