import { Schema, model } from 'mongoose';
import { generateCartId } from '../../../utils/main.js';

const schema = new Schema({
  _id: {
    type: String,
    default: () => generateCartId(),
  },
  products: {
    type: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'products',
          required: true,
        },
        quantity: { type: Number, default: 1 },
      },
    ],
    default: [],
  },
});

export const CartsMongoose = model('carts', schema);
