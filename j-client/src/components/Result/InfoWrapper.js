import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

const InfoContainer = styled.div`
background: white;
height: 4rem;
display: flex;
align-items: center;
justify-content: flex-start;
padding-left: 20px;
`;

const InfoText = styled.div`
color: ${oc.red[7]};
font-family: 'Rajdhani';
font-size: 1.3rem;
`;

const InfoCount = styled.div`
margin-left: 5px;
color: ${oc.blue[7]};
font-family: 'Rajdhani';
font-size: 1rem;
`;

const GradientBorder = styled.div`
height: 2px;
background: linear-gradient(to right, ${oc.blue[3]}, ${oc.pink[1]});
`;

const Contents = styled.div`
background: white;
padding: 2rem;
height: auto;
`;

const InfoWrapper = ({ text, totalCount, children }) => {
  return (
    <>
      <InfoContainer>
        <InfoText>{text}</InfoText>
        <InfoCount> 검색 결과 {totalCount ? totalCount : 0}건</InfoCount>
      </InfoContainer>
      <GradientBorder />
      <Contents>
        {children}
      </Contents>
    </>
  )
}

export default InfoWrapper;