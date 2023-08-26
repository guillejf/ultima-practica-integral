import { logger } from '../../utils/main.js';

export default class CartsMemory {
  constructor() {
    this.data = [];
  }

  async read() {
    return this.data;
  }

  async readById(_id) {
    try {
      const cartId = await this.data.find((cart) => cart.id === _id);
      return cartId;
    } catch (e) {
      logger.error(e);
    }
  }

  async readByRender(cartId) {
    try {
      const cart = await this.data.find((cart) => cart.id === cartId);
      return cart;
    } catch (e) {
      logger.error(e);
    }
  }

  async create(data) {
    this.data.push(data);
    return data;
  }

  async updateCart(cartId, products) {
    try {
      const cart = await this.data.find(cartId, { products }, { new: true });
      return cart;
    } catch (error) {
      throw new Error('Error updating cart in database');
    }
  }
}

export const cartsMemory = new CartsMemory();
