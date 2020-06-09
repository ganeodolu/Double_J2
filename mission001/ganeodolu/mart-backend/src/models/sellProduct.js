import mongoose from 'mongoose';

const { Schema } = mongoose;

const sellProductSchema = new Schema({
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

const sellProduct = mongoose.model('sellProduct', sellProductSchema);
export default sellProduct;
