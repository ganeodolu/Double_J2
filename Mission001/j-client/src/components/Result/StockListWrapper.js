import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

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

const StockWrapper = ({ thumbnail, title, authors, publisher, datetime, url }) => (
  <Positioner>
    <Thumbnail src={thumbnail}/>
    <InfoContainer>
      <TitleLink href={url} target="_blank">{title}</TitleLink>
      <p>{authors.join(" ")} 지음</p>
      <p>출판사: {publisher}</p>
      <p>{datetime.substr(0, 4)}년 {datetime.substr(5, 2)}월</p>
    </InfoContainer>
  </Positioner>
);

export default StockWrapper;