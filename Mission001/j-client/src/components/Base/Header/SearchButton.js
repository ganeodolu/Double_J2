import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { shadow } from 'lib/styleUtils';
import { Link } from 'react-router-dom';

const BorderedButton = styled(Link)`
  font-weight: 600;
  color: ${oc.indigo[3]};
  border: 1px solid ${oc.indigo[3]};
  margin-left: 3px;
  padding: 0.5rem;
  padding-bottom: 0.4rem;
  cursor: pointer;
  border-radius: 2px;
  text-decoration: none;
  transition: .2s all;

  &:hover {
    background: ${oc.indigo[3]};
    color: white;
    ${shadow(1)}
  }

  &:active {
    /* 마우스 클릭시 아래로 미세하게 움직임 */
    transform: translateY(3px);
  }
`;

// 중간 여백
const Spacer = styled.div`
  flex-grow: 1;
`;

const SearchButton = ({ children, onClick }) => (
  <>
    <BorderedButton to={"/result/kakao"} onClick={onClick}>
      {children}
    </BorderedButton>
    <Spacer/>
  </>
);

export default SearchButton;