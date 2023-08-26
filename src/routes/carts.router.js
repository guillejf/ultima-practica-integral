import express from 'express';
export const cartsRouter = express.Router();
import { cartsController } from '../controllers/carts.controller.js';
import { ticketsController } from '../controllers/tickets.controller.js';
import { checkCart, checkUser, checkLogin } from '../middlewares/main.js';

cartsRouter.get('/:cid', checkLogin, checkCart, cartsController.readByRender);
cartsRouter.post('/:cid/products/:pid', checkCart, checkUser, cartsController.addProduct);
cartsRouter.put('/:cid/products/:pid', cartsController.updateProductQuantity);
cartsRouter.delete('/:cid/products/:pid', cartsController.deleteProduct);
cartsRouter.delete('/:cid', cartsController.emptyCart);

cartsRouter.post('/:cid/purchase', checkCart, checkUser, ticketsController.create);
