import Product from '../../models/product';
import mongoose from 'mongoose';
import Joi from 'joi';

const { ObjectId } = mongoose.Types;

export const checkObjectId = (ctx, next) => {
  const { id } = ctx.params;
  if (!ObjectId.isValid(id)) {
    ctx.status = 400;
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
    // tags: Joi.array().items(Joi.string()).required(),
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
  try {
    const products = await Product.find()
      .sort({ _id: 1 })
      .limit(10)
      .skip((page - 1) * 10)
      .exec();
    const productCount = await Product.countDocuments().exec();
    ctx.set('Last-Page', Math.ceil(productCount / 10));
    ctx.body = products;
  } catch (e) {
    ctx.throw(500, e);
  }
};
export const read = async (ctx) => {
  const { id } = ctx.params;
  const schema = Joi.object().keys({
    productId: Joi.string(),
    productName: Joi.string(),
    price: Joi.number(),
    quantity: Joi.number(),
    // tags: Joi.array().items(Joi.string()),
  });
  const result = Joi.validate(ctx.request.body, schema);
  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }
  try {
    const product = await Product.findById(id).exec();
    if (!product) {
      ctx.status = 404;
      return;
    }
    ctx.body = product;
  } catch (e) {
    ctx.throw(500, e);
  }
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
