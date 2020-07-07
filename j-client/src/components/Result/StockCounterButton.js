import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { shadow } from 'lib/styleUtils';

const Wrapper = styled.div`
  display: flex;
  height: 30px;
`

const CounterButton = styled.div`
  width: 50px;
  font-weight: 600;
  color: ${oc.blue[6]};
  border: 1px solid ${oc.blue[6]};
  font-size: 1.2rem;
  margin: 0px 3px;
  padding: auto 0.5rem;
  cursor: pointer;
  user-select: none;
  border-radius: 2px;
  text-align: center;
  text-decoration: none;
  transition: .2s all;

  &:hover {
    background: ${oc.blue[6]};
    color: white;
    ${shadow(1)}
  }

  &:active {
    transform: translateY(3px);
  }
`;

const OrderButton = styled.div`
  width: 170px;
  font-weight: 600;
  color: ${oc.blue[6]};
  border: 1px solid ${oc.blue[6]};
  font-size: 1.2rem;
  margin: 0px 2px;
  padding: auto 0.5rem;
  cursor: pointer;
  user-select: none;
  border-radius: 2px;
  text-align: center;
  text-decoration: none;
  transition: .2s all;

  &:hover {
    background: ${oc.blue[6]};
    color: white;
    ${shadow(1)}
  }

  &:active {
    transform: translateY(3px);
  }
`;

const CounterInput = styled.input`
  width: 60px;
  text-align: center;
  border: 1px solid ${oc.gray[3]};
  outline: none;
  border-radius: 0px;
  line-height: 2.5rem;
  font-size: 1.2rem;
  padding: auto 0.5rem;
  ::placeholder {
    color: ${oc.gray[3]};
  }
`;

const StockCounterButton = ({ onIncrease, onDecrease, number, onChange }) => (
  <Wrapper>
    <CounterButton onClick={onIncrease}>+</CounterButton>
    <CounterInput value={number} onChange={onChange}/>
    <CounterButton onClick={onDecrease}>-</CounterButton>
  </Wrapper>
);

export default StockCounterButton;