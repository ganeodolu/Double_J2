import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { shadow } from 'lib/styleUtils';

const Button = styled.div`
  position: absolute;
  right: 15px;
  bottom: 15px;

  margin-top: 1rem;
  padding-top: 0.6rem;
  padding-bottom: 0.5rem;

  width: 100px;
  height: 40px;

  background: ${oc.blue[6]};
  color: white;

  text-align: center;
  font-size: 1rem;
  font-weight: 500;

  cursor: pointer;
  user-select: none;
  transition: .2s all;

  &:hover {
      background: ${oc.blue[5]};
      ${shadow(0)}
  }

  &:active {
      background: ${oc.blue[7]};
  }
`;

const AddButton = ({ onClick, children }) => (
    <Button onClick={onClick}>{children}</Button>
);

export default AddButton;