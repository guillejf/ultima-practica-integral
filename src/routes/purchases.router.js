import express from 'express';
export const purchasesRouter = express.Router();
import { ticketsController } from '../controllers/tickets.controller.js';
import { checkUser, checkLogin } from '../middlewares/main.js';

purchasesRouter.get('/', checkLogin, checkUser, ticketsController.readByRender);
