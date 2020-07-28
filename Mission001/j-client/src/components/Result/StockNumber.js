import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

const Stock = styled.div`
  width: 166px;
  height: 30px;
  font-weight: 500;
  background-color: ${oc.blue[5]};
  color: white;
  border: 1px solid ${oc.blue[5]};
  font-size: 1.1rem;
  margin: 3px 3px;
  padding: auto 0.5rem;
  user-select: none;
  border-radius: 2px;
  text-align: center;
  text-decoration: none;
  transition: .2s all;
`;

const StockNumber = ({ children }) => (
  <Stock>{children}</Stock>
);

export default StockNumber;