import axios from 'axios';
import { KAKAO_API_URI, KAKAO_API_KEY } from 'config'

const client = axios.create({
  baseURL: KAKAO_API_URI,
  method: 'post',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Host': 'dapi.kakao.com',
    'Authorization': `KakaoAK ${KAKAO_API_KEY}`,
  },
  timeout: 10000
});

export const searchKakaoBooks = (text) => client.get('/v3/search/book', { 
  params: {
    query: text,
  }
})
