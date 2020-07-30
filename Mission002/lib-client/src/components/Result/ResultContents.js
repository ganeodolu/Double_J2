import React from 'react';
import styled from 'styled-components';

const Contents = styled.div`
padding: 2rem;
height: auto;
`;

const ResultContents = ({ children }) => {
  return (
    <Contents>
      {children}
    </Contents>
  )
}

export default ResultContents;