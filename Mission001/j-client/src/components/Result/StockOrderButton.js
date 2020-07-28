import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { shadow } from 'lib/styleUtils';

const Stock = styled.div`
  width: 166px;
  height: 30px;
  font-weight: 500;
  color: ${oc.blue[5]};
  border: 1px solid ${oc.blue[5]};
  font-size: 1.1rem;
  margin: 3px 3px;
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

const StockOrderButton = ({ onClick }) => (
  <Stock onClick={onClick}>발주</Stock>
);

export default StockOrderButton;