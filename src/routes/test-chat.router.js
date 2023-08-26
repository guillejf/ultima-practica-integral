import express from 'express';
export const testChatRouter = express.Router();
import { checkUser } from '../middlewares/main.js';

testChatRouter.get('/', checkUser, (req, res) => {
  return res.status(200).render('test-chat', {});
});
