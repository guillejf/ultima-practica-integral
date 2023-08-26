import { Schema, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const schema = new Schema({
  title: { type: String, required: true, max: 100 },
  description: { type: String, required: true },
  category: { type: String, required: true },
  code: { type: Number, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  thumbnail: { type: String, required: true },
});

schema.plugin(mongoosePaginate);
export const ProductsMongoose = model('products', schema);
