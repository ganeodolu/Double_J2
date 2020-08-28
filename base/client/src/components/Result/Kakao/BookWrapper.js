import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { shadow } from 'lib/styleUtils';

const Positioner = styled.div`
  // display: flex;
  // position: relative;
  margin: 10px;
  padding: 10px;
  width: 200px;
  border: 1px solid ${oc.gray[4]};
`;

const Thumbnail = styled.img`
  // margin: 15px;
  // border: 1px solid ${oc.gray[4]};
  width: 178px;
  height: 258.1px;
  // width: 100%;
`;

const InfoContainer = styled.div`
  margin: 10px;
`;

const TitleLink = styled.a`
  color: ${oc.blue[6]};
  text-decoration: none;
  font-size: 1rem;
  &:hover {
    color: ${oc.red[6]};
    text-decoration: underline;
  }
`

function BookWrapper({ book }) {
  const { thumbnail, title, authors, publisher, datetime, url, sale_price } = book;
  return (
    <Positioner>
      <Thumbnail src={thumbnail}/>
      <InfoContainer>
        <TitleLink href={url} target="_blank">{title}</TitleLink>
        <p>{authors.join(" ")} 지음</p>
        {/* <p>출판사: {publisher}</p>
        <p>{datetime.substr(0, 4)}년 {datetime.substr(5, 2)}월</p>
        <p>판매가: {sale_price.toLocaleString()}</p> */}
      </InfoContainer>
    </Positioner>
  )
};

export default BookWrapper;