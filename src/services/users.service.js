import importModels from '../DAO/factory.js';
import bcrypt from 'bcrypt';
import { createHash, isValidPassword } from '../utils/main.js';
import { generateCartId } from '../utils/main.js';
import { cartService } from './carts.service.js';
import { logger } from '../utils/main.js';

const models = await importModels();
const usersModel = models.users;

class UserService {
  async readOne(email, password) {
    try {
      const user = await usersModel.read(email);
      if (user && isValidPassword(password, user.password)) {
        return user;
      } else {
        return false;
      }
    } catch (e) {
      logger.error(e);
    }
  }

  async read() {
    try {
      const users = await usersModel.read();
      return users;
    } catch (e) {
      logger.error(e);
    }
  }

  async readById(_id) {
    try {
      const user = await usersModel.readById(_id);
      return user;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async update(_id, user) {
    try {
      if (user.password) {
        user.password = await bcrypt.hash(user.password, 10);
      }

      const userUpdated = await usersModel.update(_id, user);
      return userUpdated;
    } catch (e) {
      logger.error(e);
    }
  }

  async delete(_id) {
    try {
      const userDeleted = await usersModel.delete(_id);
      return userDeleted;
    } catch (e) {
      logger.error(e);
    }
  }

  async authenticateUser(email, password) {
    try {
      const user = await usersModel.readOne(email);

      if (!user || !isValidPassword(password, user.password)) {
        throw new Error('Invalid credentials');
      }

      return user;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  async registerUser(firstName, lastName, age, email, password, role) {
    try {
      const existingUser = await usersModel.readOne(email);

      if (existingUser) {
        throw new Error('User already exists');
      }

      const cartID = generateCartId();
      const hashedPassword = createHash(password);
      await cartService.createCart(cartID);
      const userCreated = await usersModel.create(firstName, lastName, age, email, hashedPassword, role, cartID);

      return userCreated;
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }
}
export const userService = new UserService();
