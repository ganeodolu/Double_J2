import axios from 'axios';
require('dotenv').config();

const kakaoApi = axios.create({
  baseURL: 'https://dapi.kakao.com',
});
kakaoApi.defaults.headers.common['Authorization'] = process.env.KAKAO_KEY;

export default kakaoApi;
