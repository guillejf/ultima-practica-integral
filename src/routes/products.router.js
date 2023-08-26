import express from 'express';
export const productsRouter = express.Router();
import { productsController } from '../controllers/products.controller.js';

productsRouter.get('/', productsController.readByRenderUser);
