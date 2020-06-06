import Product from './models/product';

export default function createFakeData() {
  const products = [...Array(50).keys()].map((i) => ({
    productId: `물품 #${i}`,
    productName: `product${i}`,
    price: Math.ceil(Math.random()*10)*1000,
    quantity: Math.ceil(Math.random()*10)*10,
  }));
  Product.insertMany(products, (err, docs) => {
    console.log(docs);
  });
}
