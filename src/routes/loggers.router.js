import express from 'express';
import { readFile } from 'fs/promises';
export const loggers = express.Router();
import { logger } from '../utils/main.js';

loggers.get('/', async (req, res) => {
  try {
    const logFilePath = './errors.log';
    const content = await readFile(logFilePath, 'utf8');

    const logs = content.split('\n').filter((line) => line.trim() !== '');

    res.render('loggers', { logs });
  } catch (e) {
    logger.error(e);
    res.status(501).send({ status: 'error', msg: 'Error en el servidor', error: err });
  }
});
