import { CartsMongoose } from '../mongo/models/carts.mongoose.js';
import { logger } from '../../utils/main.js';

class CartsModel {
  async read() {
    try {
      const carts = await CartsMongoose.find({});
      return carts;
    } catch (e) {
      logger.info(e);
    }
  }

  async readById(cartId) {
    try {
      const cartById = await CartsMongoose.findById(cartId);
      return cartById;
    } catch (e) {
      logger.info(e);
      throw e;
    }
  }

  async readByRender(cartId) {
    try {
      const cart = await CartsMongoose.findById(cartId).populate('products.product');
      return cart;
    } catch (e) {
      logger.info(e);
    }
  }

  // SE CREA EL CARRITO CUANDO SE REGISTRA EL USUARIO
  async createCart(cartId) {
    try {
      const cartCreated = await CartsMongoose.create({ _id: cartId });
      return cartCreated;
    } catch (e) {
      logger.info(e);
    }
  }

  async updateCart(cartId, productIndex) {
    try {
      const cart = await CartsMongoose.findByIdAndUpdate(cartId, { productIndex }, { new: true });
      return cart;
    } catch (error) {
      throw new Error('Error updating cart in database');
    }
  }
}

export const cartsModel = new CartsModel();
