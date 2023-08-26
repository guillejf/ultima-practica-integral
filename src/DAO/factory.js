import mongoose from 'mongoose';
import env from '../config/enviroment.config.js';
import { logger } from '../utils/main.js';
import { productsModel } from './mongo/products.model.js';
import { usersModel } from './mongo/users.model.js';
import { cartsModel } from './mongo/carts.model.js';
import { ticketsModel } from './mongo/tickets.model.js';
import { productsMemory } from './memory/products.memory.js';
import { usersMemory } from './memory/users.memory.js';
import { cartsMemory } from './memory/carts.memory.js';
import { ticketsMemory } from './memory/tickets.memory.js';

async function importModels() {
  let models;

  switch (env.persistence) {
    case 'MONGO':
      logger.info('Database: MongoDB');
      mongoose.connect(env.mongoUrl);
      models = {
        products: productsModel,
        users: usersModel,
        carts: cartsModel,
        tickets: ticketsModel,
      };
      break;

    case 'MEMORY':
      logger.info('Database: Persistencia en memoria');
      models = {
        products: productsMemory,
        users: usersMemory,
        carts: cartsMemory,
        tickets: ticketsMemory,
      };
      break;

    default:
      throw new Error(`El tipo de persistencia "${env.persistence}" no es válido.`);
  }

  return models;
}

export default importModels;
