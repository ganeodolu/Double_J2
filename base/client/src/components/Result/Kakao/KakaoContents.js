import React from 'react';
import styled from 'styled-components';

const Contents = styled.div`
  padding: 2rem;
  height: auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
`;

const KakaoContents = ({ children }) => {
  return (
    <Contents>
      {children}
    </Contents>
  )
}

export default KakaoContents;