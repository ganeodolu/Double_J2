import React from 'react';
import { useSelector } from 'react-redux';
import { InfoWrapper, KakaoWrapper } from 'components/Result';

function Kakao({ location }) {
  const { text, totalCount, data } = useSelector(state => ({
    text: state.kakao.get('text'),
    totalCount: state.kakao.get('totalCount'),
    data: state.kakao.get('data')
  }))

  return (
    <InfoWrapper text={text} totalCount={totalCount}>
      {data && data.map((item, idx) => (
        <KakaoWrapper key={idx} thumbnail={item.thumbnail} title={item.title} authors={item.authors} publisher={item.publisher} datetime={item.datetime} url={item.url}/>
      ))}
    </InfoWrapper>
  )
};

export default Kakao;