import React from "react";
import { useSelector } from "react-redux";

const BookDetail = ({ match }) => {
  const { bookIndex } = match.params;
  const { data } = useSelector((state) => ({
    data: state.kakao.data,
  }));
  const {
    thumbnail,
    title,
    authors,
    publisher,
    datetime,
    url,
    isbn,
    status,
    contents,
    sale_price,
  } = data[bookIndex];
  console.log(thumbnail);
  return (
    <div>
      <img src={thumbnail}></img>
      <div>제목 : {title}</div>
      <div>저자 : {authors}</div>
      <div>출판 : {publisher}</div>
      {/* <div>{datetime}</div> */}
      <div>할인판매가 : {sale_price}원</div>
      <div>상태 : {status}</div>
      <div>ISBN : {isbn}</div>
      <br />
      <div>{contents}</div>
    </div>
  );
};

export default BookDetail;
