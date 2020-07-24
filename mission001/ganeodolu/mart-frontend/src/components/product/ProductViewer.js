import React from 'react'
import ProductActionButtonsContainer from '../../containers/product/ProductActionButtonsContainer'
import { useSelector } from 'react-redux'

const ProductViewer = ({product, error, loading}) => {
  console.log("Viewer Create: ", product, error)
  if(error) {
    if(error.response && error.response.status === 404) {
      return (
        <div>존재하지 않는 물품입니다.</div>
      )
    }
    return (
      <div>에러 발생2</div>
    )
  }
  
  if(loading || !product) {
    return null
  }

  const { productId, productName, price, quantity, _id } = product;
  return (
    <section className="Product-Info">
      <div>{productId}</div>
      <img src="/images/product2.jpg" alt="제품사진" />
      <div>이름:{productName}</div>
      <div>{price}원</div>
      <div>{quantity}개</div>
      <ProductActionButtonsContainer _id={_id} />
    </section>
  )
}

export default ProductViewer
