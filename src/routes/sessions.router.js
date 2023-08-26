import express from 'express';
import passport from 'passport';
import { sessionsController } from '../controllers/sessions.controller.js';
export const sessionsRouter = express.Router();

sessionsRouter.get('/login', sessionsController.viewLogin);
sessionsRouter.get('/register', sessionsController.viewRegister);
sessionsRouter.get('/logout', sessionsController.logout);
sessionsRouter.get('/current', sessionsController.current);
sessionsRouter.post('/login', passport.authenticate('login', { failureRedirect: '/error' }), sessionsController.loginUser);

sessionsRouter.post('/register', passport.authenticate('register', { failureRedirect: '/error' }), sessionsController.registerUser);
