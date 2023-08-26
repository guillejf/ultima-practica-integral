import { logger } from '../../utils/main.js';

class ProductsMemory {
  constructor() {
    this.data = [
      {
        _id: '1',
        title: 'Producto 1',
        description: 'Descripción del Producto 1',
        price: 10.99,
        thumbnail: 'url1',
        code: 'ABC123',
        stock: 50,
      },
      {
        _id: '2',
        title: 'Producto 2',
        description: 'Descripción del Producto 2',
        price: 19.99,
        thumbnail: 'url2',
        code: 'DEF456',
        stock: 30,
      },
      {
        _id: '3',
        title: 'Producto 2',
        description: 'Descripción del Producto 2',
        price: 19.99,
        thumbnail: 'url2',
        code: 'DEF456',
        stock: 30,
      },
      {
        _id: '4',
        title: 'Producto 2',
        description: 'Descripción del Producto 2',
        price: 19.99,
        thumbnail: 'url2',
        code: 'DEF456',
        stock: 30,
      },
      {
        _id: '5',
        title: 'Producto 2',
        description: 'Descripción del Producto 2',
        price: 19.99,
        thumbnail: 'url2',
        code: 'DEF456',
        stock: 30,
      },
      {
        _id: '6',
        title: 'Producto 2',
        description: 'Descripción del Producto 2',
        price: 19.99,
        thumbnail: 'url2',
        code: 'DEF456',
        stock: 30,
      },
      {
        _id: '7',
        title: 'Producto 2',
        description: 'Descripción del Producto 2',
        price: 19.99,
        thumbnail: 'url2',
        code: 'DEF456',
        stock: 30,
      },
      {
        _id: '8',
        title: 'Producto 2',
        description: 'Descripción del Producto 2',
        price: 19.99,
        thumbnail: 'url2',
        code: 'DEF456',
        stock: 30,
      },
      {
        _id: '9',
        title: 'Producto 2',
        description: 'Descripción del Producto 2',
        price: 19.99,
        thumbnail: 'url2',
        code: 'DEF456',
        stock: 30,
      },
      {
        _id: '10',
        title: 'Producto 2',
        description: 'Descripción del Producto 2',
        price: 19.99,
        thumbnail: 'url2',
        code: 'DEF456',
        stock: 30,
      },
    ];
  }

  async read() {
    return this.data;
  }
  async readWithPagination(page = 1, limit = 5) {
    const allProducts = await this.read();
    return allProducts;
  }
  async readById(_id) {
    try {
      const productById = this.data.find((product) => product._id === _id);
      return productById;
    } catch (e) {
      logger.error(e);
    }
  }
  async create({ title, description, price, thumbnail, code, stock }) {
    try {
      const newProduct = {
        _id: Date.now().toString(),
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };
      this.data.push(newProduct);
      return newProduct;
    } catch (e) {
      logger.error(e);
    }
  }
  async update({ _id, title, description, price, thumbnail, code, stock }) {
    try {
      const productIndex = this.data.findIndex((product) => product._id === _id);
      if (productIndex !== -1) {
        this.data[productIndex] = {
          ...this.data[productIndex],
          title,
          description,
          price,
          thumbnail,
          code,
          stock,
        };
        return this.data[productIndex];
      }
      return null; // Product not found
    } catch (e) {
      logger.error(e);
    }
  }
  async delete(id) {
    try {
      const productIndex = this.data.findIndex((product) => product._id === id);
      if (productIndex !== -1) {
        const deletedProduct = this.data.splice(productIndex, 1);
        return deletedProduct[0];
      }
      return null; // Product not found
    } catch (e) {
      logger.error(e);
    }
  }
}

export const productsMemory = new ProductsMemory();
