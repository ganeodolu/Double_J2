import React from 'react';
// import BookItem from './BookItem'

const SearchInput = () => {
  return (
    <>
      <form>
        <label>
          카카오책 검색
          <input name="query"></input>
        </label>
        <button>검색</button>
      </form>
    </>
  );
};

const SearchProduct = ({ document }) => {
  console.log(document);
  const { thumbnail, title, price } = document;
  return (
    <>
      <img src={thumbnail}></img>
      <div>{title}</div>
      <div>{price}</div>
    </>
  );
};

const SearchForm = ({ products, error, loading }) => {
  console.log(products);
  const { documents } = products;
  const SearchProducts = documents.map((document, idx) => (
    <SearchProduct key={idx} document={document} />
  ));

  return (
    <div>
      <SearchInput />
      {SearchProducts}
    </div>
  );
};

export default SearchForm;
