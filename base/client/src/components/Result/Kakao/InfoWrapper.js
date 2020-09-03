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

const SizeSelect = styled.select`
  color: ${oc.blue[7]};
  margin-right: 30px;
  font-family: 'Rajdhani';
  font-size: 1rem;
`

const Spacer = styled.div`
  flex-grow: 1;
`;

const InfoWrapper = ({ text, pageableCount, children, onChange }) => {
  return (
    <>
      <InfoContainer>
        <InfoText>{text}</InfoText>
        <InfoCount> 검색 결과 {pageableCount ? pageableCount : 0}건</InfoCount>
        <Spacer/>
        <SizeSelect onChange={onChange}>
          {children}
        </SizeSelect>
      </InfoContainer>
      <GradientBorder />
    </>
  )
}

export default InfoWrapper;