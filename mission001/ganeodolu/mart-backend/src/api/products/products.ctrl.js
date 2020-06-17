import Product from '../../models/product';
import mongoose from 'mongoose';
import Joi from 'joi';

const { ObjectId } = mongoose.Types;

export const getProductById = async (ctx, next) => {
  const { id } = ctx.params;
  if (!ObjectId.isValid(id)) {
    ctx.status = 400;
    return;
  }
  try {
    const product = await Product.findById(id);
    if (!product) {
      ctx.status = 404;
      return;
    }
    ctx.state.product = product;
    return next();
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const checkOwnProduct = (ctx, next) => {
  const { user, product } = ctx.state;
  if (product.user._id.toString() !== user._id) {
    ctx.status = 403;
    return;
  }
  return next();
};

export const create = async (ctx) => {
  const schema = Joi.object().keys({
    productId: Joi.string().required(),
    productName: Joi.string().required(),
    price: Joi.number().required(),
    quantity: Joi.number().required(),
  });
  const result = Joi.validate(ctx.request.body, schema);
  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }
  const { productId, productName, price, quantity } = ctx.request.body;
  const product = new Product({
    productId,
    productName,
    price,
    quantity,
    user: ctx.state.user,
  });
  try {
    await product.save();
    ctx.body = product;
  } catch (e) {
    ctx.throw(500, e);
  }
};
export const list = async (ctx) => {
  const page = parseInt(ctx.query.page || '1', 10);
  if (page < 1) {
    ctx.status = 400;
    return;
  }
  const {
    username,
    productName,
    minPrice,
    maxPrice,
    minQuantity,
    maxQuantity,
  } = ctx.query;
  const query = {
    ...(username ? { 'user.username': username } : {}),
    ...(productName ? { productName : {$regex : `.*${productName}.*`} } : {}),
    ...(minPrice ? { price: { $gte: minPrice } } : {}),
    ...(maxPrice ? { price: { $lte: maxPrice } } : {}),
    ...(minQuantity ? { quantity: { $gte: minQuantity } } : {}),
    ...(maxQuantity ? { quantity: { $lte: maxQuantity } } : {}),
  };
  try {
    const products = await Product.find(query)
      .sort({ _id: 1 })
      .limit(10)
      .skip((page - 1) * 10)
      .exec();
    const productCount = await Product.countDocuments(query).exec();
    ctx.set('Last-Page', Math.ceil(productCount / 10));
    ctx.body = products;
  } catch (e) {
    ctx.throw(500, e);
  }
};
export const read = async (ctx) => {
  ctx.body = ctx.state.product;
};
export const remove = async (ctx) => {
  const { id } = ctx.params;
  try {
    const product = await Product.findByIdAndRemove(id).exec();
    if (!product) {
      ctx.status = 404;
      return;
    }
    ctx.body = product;
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const update = async (ctx) => {
  const { id } = ctx.params;
  try {
    const product = await Product.findByIdAndUpdate(id, ctx.request.body, {
      new: true,
    }).exec();
    if (!product) {
      ctx.status = 404;
      return;
    }
    ctx.body = product;
  } catch (e) {
    ctx.throw(500, e);
  }
};
