import express from 'express';
export const productsAdminRouter = express.Router();
import { productsController } from '../controllers/products.controller.js';
import { checkAdmin } from '../middlewares/main.js';

productsAdminRouter.get('/', checkAdmin, productsController.readByRenderAdmin);
