import kakaoApi from './kakaoApi';

export const list = async (ctx) => {
  const { query, page, size } = ctx.query;
  try {
    const searchResults = await kakaoApi.get('/v3/search/book', {
      params: {
        query,
        page,
        size
      },
    });
    console.log(searchResults)
    ctx.body = searchResults.data;
  } catch (e) {
    ctx.throw(500, e);
  }
};
