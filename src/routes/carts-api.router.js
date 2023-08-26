import express from 'express';
export const cartsApiRouter = express.Router();
import { cartsController } from '../controllers/carts.controller.js';

cartsApiRouter.post('/:cid/products/:pid', cartsController.addProduct);
cartsApiRouter.post('/:cid/purcharse');
cartsApiRouter.get('/', cartsController.read);
cartsApiRouter.get('/:cid', cartsController.readById);
cartsApiRouter.put('/:cid', cartsController.updateCart);
cartsApiRouter.put('/:cid/products/:pid', cartsController.updateProductQuantity);
cartsApiRouter.delete('/:cid', cartsController.emptyCart);
cartsApiRouter.delete('/:cid/products/:pid', cartsController.deleteProduct);
