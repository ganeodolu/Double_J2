import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

const Wrapper = styled.div`
  & + & {
    margin-top: 1rem;
  }
`;

const Input = styled.input`
  width: 100%;
  border: 1px solid ${oc.gray[3]};
  outline: none;
  border-radius: 0px;
  line-height: 2.5rem;
  font-size: 1.2rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  ::placeholder {
    color: ${oc.gray[3]};
  }
`;

const SearchBar = ({ ...rest }) => (
  <Wrapper>
    <Input {...rest}/>
  </Wrapper>
);

export default SearchBar;