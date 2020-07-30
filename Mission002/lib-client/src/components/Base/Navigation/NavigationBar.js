import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { shadow, media } from 'lib/styleUtils';
import { Link } from 'react-router-dom';

// 상단 고정, 그림자
const Positioner = styled.div`
  display: flex;
  flex-direction: column;
  // position: fixed;
  position: relative;
  position: sticky;
  top: 0px;
  width: 100%;
  z-index: 1;
  ${shadow(1)}
`;

// 흰 배경, 내용 중간 정렬
const WhiteBackground = styled.div`
  background: ${oc.blue[3]};
  display: flex;
  justify-content: center;
  height: auto;
`;

// 해더의 내용
const HeaderContents = styled.div`
  width: 1200px;
  height: 55px;
  display: flex;
  flex-direction: row;
  align-items: center;

  padding-right: 1rem;
  padding-left: 1rem;
  ${media.wide`
    width: 992px;
  `}

  ${media.tablet`
    width: 100%;
  `}
`;

// 로고
const Logo = styled(Link)`
  font-size: 1.4rem;
  letter-spacing: 2px;
  color: white;
  font-family: 'Rajdhani';
  text-decoration: none;
  height: 100%;
  padding: 10px 20px;

  &:hover {
    background: ${oc.blue[7]};
    color: white;
    ${shadow(1)}
  }
`;

// 중간 여백
const Spacer = styled.div`
  flex-grow: 1;
`;


const NavigationBar = ({ onClickList }) => {
  return (
    <Positioner>
      <WhiteBackground>
        <HeaderContents>
          <Spacer/>
          <Logo to="/">Home</Logo>
          <Logo to="/result/StockList" onClick={onClickList}>Stock LIst</Logo>
          <Logo to="/">Sales</Logo>
          <Logo to="/">Stock In</Logo>
          <Logo to="/">Stock Out</Logo>
          <Logo to="/result/kakao">Catalog</Logo>
          <Spacer/>
        </HeaderContents>
      </WhiteBackground>
    </Positioner>
  );
};

export default NavigationBar;