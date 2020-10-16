import React from "react";

const makePageArray = ({ page, endPage }) => {
  const startPage = (Math.ceil(page / 10)-1)*10+1;
  let pageArray = [];
  for (let i = 0; i < 10; i++) {
    if (startPage + i > endPage) {
      return pageArray;
    }
    pageArray[i] = startPage + i;
  }
  return pageArray;
};

const Pagination = ({ page, endPage, onChangePage }) => {
  const pageArray = makePageArray({ page, endPage }).map((val, idx) => {
    return page === val ? (
      <button key={idx} disabled={true}>
        {val}
      </button>
    ) : (
      <button key={idx} value={val} onClick={onChangePage}>
        {val}
      </button>
    );
  });
  return (
    <div>
      <button disabled={page === 1} value={page - 1} onClick={onChangePage}>
        이전
      </button>
      {pageArray}
      <button
        disabled={page === endPage}
        value={page + 1}
        onClick={onChangePage}
      >
        다음
      </button>
    </div>
  );
};

export default Pagination;
