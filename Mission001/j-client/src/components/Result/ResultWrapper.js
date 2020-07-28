import React from 'react';
import styled from 'styled-components';
import { media } from 'lib/styleUtils';

const Container = styled.div`
  display: flex;
  justify-content: center;
  `;

// 너비, 그림자 설정
const ShadowedBox = styled.div`
  // margin-top: 58px;
  width: 1200px;
  background: white;
  height: auto;
  ${media.wide`
    width: 992px;
  `}
  ${media.tablet`
    width: 768px;
  `}
  ${media.phone`
    width: 376px;
  `}
`;

const ResultWrapper = ({ children }) => (
  <Container>
    <ShadowedBox>
      {children}
    </ShadowedBox>
  </Container>
);

export default ResultWrapper;