import express from 'express';
export const mockingProductsRouter = express.Router();
import { generateProduct } from '../utils/main.js';

mockingProductsRouter.get('/', async (req, res) => {
  const products = [];

  for (let i = 0; i < 100; i++) {
    products.push(generateProduct());
  }

  res.send({ status: 'success', payload: products });
});

export default mockingProductsRouter;
