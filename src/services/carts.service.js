import importModels from '../DAO/factory.js';
import { logger } from '../utils/main.js';

const models = await importModels();
const productsModel = models.products;
const cartsModel = models.carts;

class CartService {
  async read() {
    const carts = await cartsModel.read();
    return carts;
  }

  async readById(cartId) {
    try {
      const cartById = await cartsModel.readById(cartId);
      return cartById;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async readByRender(cartId) {
    const cart = await cartsModel.readByRender(cartId);
    if (!cart) {
      throw new Error('Cart not found');
    }
    return cart;
  }

  // SE CREA EL CARRITO CUANDO SE REGISTRA EL USUARIO
  async createCart(cartId) {
    const cartCreated = await cartsModel.createCart({ _id: cartId });
    return cartCreated;
  }

  async addProduct(cartId, productId) {
    try {
      const cart = await cartsModel.readById(cartId);
      const product = await productsModel.readById(productId);

      if (!cart) {
        throw new Error('Cart not found');
      }
      if (!product) {
        throw new Error('Product not found');
      }

      const existingProduct = cart.products.find((item) => item.product.toString() === product._id.toString());

      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        cart.products.push({ product: product._id, quantity: 1 });
      }

      await cart.save();

      const updatedCart = await this.readById(cartId);
      const cartQuantity = updatedCart.products.reduce((total, product) => total + product.quantity, 0);

      return { cart: updatedCart, cartQuantity };
    } catch (error) {
      throw error;
    }
  }

  async updateCart(cartId, products) {
    try {
      const cart = await cartsModel.updateCart(cartId, products);
      return cart;
    } catch (error) {
      throw new Error('Error updating cart in database');
    }
  }

  async updateProductQuantity(cartId, productId, quantity) {
    try {
      const cart = await cartsModel.readById(cartId);
      const productIndex = cart.products.findIndex((p) => p.product.toString() === productId);
      if (productIndex === -1) {
        throw new Error('Product not found in cart');
      }
      cart.products[productIndex].quantity = quantity;
      await cart.save();
      return cart;
    } catch (error) {
      throw new Error('Error updating product quantity in cart');
    }
  }

  async emptyCart(cartId) {
    try {
      const cart = await cartsModel.readById(cartId);
      cart.products = [];
      await cart.save();
    } catch (error) {
      throw new Error('Error clearing cart');
    }
  }

  async deleteProduct(cartId, productId) {
    try {
      const cart = await cartsModel.readById(cartId);

      if (!cart) {
        throw new Error('Cart not found');
      }

      const productIndex = cart.products.map((product) => product.product.toString()).indexOf(productId);

      if (productIndex !== -1) {
        cart.products.splice(productIndex, 1);
        await cart.save();
      } else {
        logger.error('Producto no encontrado');
      }

      const updatedCart = await cartsModel.updateCart(cartId, productIndex);

      return updatedCart;
    } catch (error) {
      throw new Error('Error removing product from cart');
    }
  }
}

export const cartService = new CartService();
