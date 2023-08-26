import express from 'express';
export const usersApiRouter = express.Router();
import { usersController } from '../controllers/users.controller.js';

// usersApiRouter.post("/", usersController.create);
usersApiRouter.get('/', usersController.read);
usersApiRouter.put('/:_id', usersController.update);
usersApiRouter.delete('/:_id', usersController.delete);
