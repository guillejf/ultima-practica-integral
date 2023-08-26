import { Schema, model } from 'mongoose';
import { generateCartId } from '../../../utils/main.js';

const ticketSchema = new Schema({
  code: { type: String, default: () => generateCartId(10), unique: true },
  purchase_datetime: { type: Date, required: true, default: Date.now },
  purchaser: { type: String, required: true },
  cartId: { type: String, required: true },
  amount: { type: Number, required: true },
  products: [
    {
      product: { type: Schema.Types.ObjectId, ref: 'products' },
      quantity: { type: Number, required: true },
    },
  ],
});

export const TicketsMongoose = model('tickets', ticketSchema);
