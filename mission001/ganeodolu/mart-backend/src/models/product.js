import mongoose from 'mongoose';

const { Schema } = mongoose;

const productSchema = new Schema({
  productId: String,
  productName: String,
  price: Number,
  quantity: Number,
  // tags: [String],
  publishedDate: {
    type: Date,
    default: Date.now,
  },
  user: {
    _id: mongoose.Types.ObjectId,
    username: String,
  },
});

const Product = mongoose.model('Product', productSchema);
export default Product;
