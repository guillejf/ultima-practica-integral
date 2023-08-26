import { logger } from '../../utils/main.js';

export default class UsersMemory {
  constructor() {
    this.data = [];
  }
  async readOne(email) {
    try {
      const user = await this.data.find(
        { email: email },
        {
          _id: true,
          firstName: true,
          lastName: true,
          age: true,
          email: true,
          password: true,
          role: true,
        }
      );
      return user;
    } catch (e) {
      logger.error(e);
    }
  }
  async read() {
    try {
      const users = await this.data.find(
        {},
        {
          _id: true,
          firstName: true,
          lastName: true,
          age: true,
          email: true,
          password: true,
          role: true,
        }
      );
      return users;
    } catch (e) {
      logger.error(e);
    }
  }
  async create(firstName, lastName, age, email, password, role) {
    try {
      const userCreated = await this.data.find({
        firstName,
        lastName,
        age,
        email,
        password,
        role,
        cartID: cartId,
      });
      return userCreated;
    } catch (e) {
      logger.error(e);
    }
  }
  async update({ _id, firstName, lastName, age, email, password, role }) {
    try {
      const userUpdated = await this.data.find({ _id: _id }, { firstName, lastName, age, email, password, role });
      if (userUpdated.nModified > 0) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      logger.error(e);
      return false;
    }
  }
  async delete(_id) {
    try {
      const deletedUser = await this.data.find({ _id: _id });
      return deletedUser;
    } catch (e) {
      logger.error(e);
    }
  }
}

export const usersMemory = new UsersMemory();
