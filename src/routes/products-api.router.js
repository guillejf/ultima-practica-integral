import express from 'express';
export const productsApiRouter = express.Router();
import { productsController } from '../controllers/products.controller.js';
import { checkAdmin } from '../middlewares/main.js';

productsApiRouter.post('/', checkAdmin, productsController.create);
productsApiRouter.get('/', productsController.read);
productsApiRouter.get('/:_id', productsController.readById);
productsApiRouter.put('/:_id', checkAdmin, productsController.update);
productsApiRouter.delete('/:_id', checkAdmin, productsController.delete);
