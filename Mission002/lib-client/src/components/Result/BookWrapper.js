import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { shadow } from 'lib/styleUtils';

const Positioner = styled.div`
  display: flex;
  position: relative;
  margin: 10px;
  padding: 10px;
  border-bottom: 1px solid ${oc.gray[4]};
`;

const Thumbnail = styled.img`
  margin: 5px;
  border: 1px solid ${oc.gray[4]}
`;

const InfoContainer = styled.div`
  margin: 10px;
`;

const TitleLink = styled.a`
  color: ${oc.blue[6]};
  text-decoration: none;
  font-size: 1.3rem;
  &:hover {
    color: ${oc.red[6]};
    text-decoration: underline;
  }
`

const AddButton = styled.div`
  position: absolute;
  right: 15px;
  bottom: 15px;

  margin-top: 1rem;
  padding-top: 0.6rem;
  padding-bottom: 0.5rem;

  width: 100px;
  height: 40px;

  background: ${oc.blue[6]};
  color: white;

  text-align: center;
  font-size: 1rem;
  font-weight: 500;

  cursor: pointer;
  user-select: none;
  transition: .2s all;

  &:hover {
      background: ${oc.blue[5]};
      ${shadow(0)}
  }

  &:active {
      background: ${oc.blue[7]};
  }
`;

const Spacer = styled.div`
  flex-grow: 1;
`;

function BookWrapper({ book, children }) {
  const { thumbnail, title, authors, publisher, datetime, url, sale_price, type, isbn } = book;
  return (
    <Positioner>
      <Thumbnail src={thumbnail}/>
      <InfoContainer>
        <TitleLink href={url} target="_blank">{title}</TitleLink>
        <p>{authors.join(" ")} 지음</p>
        <p>출판사: {publisher}</p>
        <p>{datetime.substr(0, 4)}년 {datetime.substr(5, 2)}월</p>
        <p>판매가: {sale_price.toLocaleString()}</p>
        <p>타입: {type}</p>
        <p>ISBN: {isbn}</p>
      </InfoContainer>
      <Spacer />
      <InfoContainer>
        {children}
      </InfoContainer>
    </Positioner>
  )
};

export default BookWrapper;