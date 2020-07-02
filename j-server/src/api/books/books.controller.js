const Book = require('models/book');

exports.list = async (ctx) => {
  let books;

  try {
    books = await Book.find()
      .sort({_id: -1})
      // .limit(3)
      .exec();
  } catch(e) {
    return ctx.throw(500, e);
  };

  ctx.body = books;
};

exports.get = async (ctx) => {
  const { id } = ctx.params;

  let book;

  try {
    book = await Book.findById(id).exec();
  } catch(e) {
    if(e.name === 'CastError'){
      ctx.status = 400;
      return;
    }
    return ctx.throw(500, e)
  };

  if(!book) {
    ctx.status = 404;
    ctx.body = { message: 'book not found' };
    return;
  };

  ctx.body = book;
}

exports.create = async (ctx) => {
  // const { book } = ctx.request.body;
  const { authors, contents, datetime, isbn, price, publisher, sale_price, status, thumbnail, title, translators, url, order_list, stock } = ctx.request.body;
  const book = new Book({ authors, contents, datetime, isbn, price, publisher, sale_price, status, thumbnail, title, translators, url, order_list, stock });

  let existing = null;
  try {
    existing = await Book.findByIsbn(isbn);
  } catch(e) {
    ctx.throw(500, e);
  };

  if(existing) {
    ctx.status = 409;
    ctx.body = {
      key: existing.email === ctx.request.body.email ? 'email' : 'username'
    };
    return;
  };

  try {
    await book.save();
  } catch(e) {
    return ctx.throw(500, e);
  };

  ctx.body = book;
}

exports.delete = async (ctx) => {
  const { id } = ctx.params;

  try {
    await Book.findByIdAndRemove(id).exec();
  } catch(e) {
    if(e.name === 'CastError'){
      ctx.status = 400;
      return;
    }
  }

  ctx.status = 204;
}

exports.replace = async (ctx) => {
  const { id } = ctx.params;
  let book;

  try {
    book = await Book.findByIdAndUpdate(id, ctx.request.body, {
      upsert: true,
      new: true
    });
  } catch(e) {
    return ctx.throw(500, e);
  };

  ctx.body = book;
}

exports.update = async (ctx) => {
  const { id } = ctx.params;
  // const { id, stock } = ctx.request.body
  let book;

  try {
    book = await Book.findByIdAndUpdate(id, ctx.request.body, {
      new: true
    });
  } catch(e) {
    return ctx.throw(500, e);
  };

  ctx.body = book;
}