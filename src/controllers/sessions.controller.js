import UsersDTO from './DTO/users.dto.js';
import { logger } from '../utils/main.js';

class SessionsController {
  async viewLogin(req, res) {
    try {
      const title = 'Fuego Burgers® - Login';
      return res.status(200).render('login', { title });
    } catch (e) {
      logger.error(e);
      res.status(501).send({ status: 'error', msg: 'Error en el servidor', error: err });
    }
  }

  async viewRegister(req, res) {
    try {
      const title = 'Fuego Burgers® - Register';
      return res.status(200).render('register', { title });
    } catch (e) {
      logger.error(e);
      res.status(501).send({ status: 'error', msg: 'Error en el servidor', error: err });
    }
  }

  async logout(req, res) {
    try {
      req.session.destroy((err) => {
        if (err) {
          console.error('Error al cerrar sesión:', err);
        }
        res.redirect('/');
      });
    } catch (e) {
      logger.info(e);
    }
  }

  async current(req, res) {
    try {
      const { firstName, lastName, age, email, role } = req.session.user;
      const userDTO = new UsersDTO({ firstName, lastName, age, email, role });
      const user = {
        firstName: userDTO.firstName,
        lastName: userDTO.lastName,
        age: userDTO.age,
        email: userDTO.email,
        role: userDTO.role,
      };
      return res.status(200).json({ user: user });
    } catch (e) {
      logger.info(e);
    }
  }

  async loginUser(req, res) {
    try {
      if (!req.user) {
        return res.status(400).render('error', { msg: 'Usuario Inexistente' });
      }
      req.session.user = {
        _id: req.user._id,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        age: req.user.age,
        email: req.user.email,
        role: req.user.role,
        cartId: req.user.cartID,
        purchase_made: req.user.purchase_made,
      };
      return res.redirect('/home');
    } catch (e) {
      logger.info(e);
    }
  }

  async registerUser(req, res) {
    try {
      if (!req.user) {
        return res.status(500).render('error');
      }
      req.session.user = {
        _id: req.user._id,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        age: req.user.age,
        email: req.user.email,
        role: req.user.role,
        cartId: req.user.cartID,
        purchase_made: req.user.purchase_made,
      };
      return res.redirect('/home');
    } catch (e) {
      logger.info(e);
    }
  }
}

export const sessionsController = new SessionsController();
