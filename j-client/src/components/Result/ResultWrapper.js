import React from 'react';
import styled from 'styled-components';
import { media } from 'lib/styleUtils';

const Container = styled.div`
  display: flex;
  justify-content: center;
  `;

// 너비, 그림자 설정
const ShadowedBox = styled.div`
  margin-top: 58px;
  width: 1200px;
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

const KakaoWrapper = ({ children }) => (
  <Container>
    <ShadowedBox>
      {children}
    </ShadowedBox>
  </Container>
);

export default KakaoWrapper;