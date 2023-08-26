import { logger } from './utils/main.js';

const suma = (...nums) => {
  if (nums.length === 0) return 0;
  if (nums.some((num) => typeof num !== 'number')) return null;

  return nums.reduce((suma, num) => suma + num);
};

let testOK = 0;
const testTotal = 4;

logger.info('\nTest 1. Debe devolver null si alguno de los parámetros no es un número');
const resultTest1 = suma('2', 2);
if (resultTest1 === null) {
  logger.info('Test 1: PASS');
  testOK++;
} else logger.info(`Test 1: Fallo!!! :( El resultado es ${resultTest1}`);

logger.info('\nTest 2. Debe devolver 0 si no hay parámetros');
const resultTest2 = suma();
if (resultTest2 === 0) {
  logger.info('Test 2: PASS');
  testOK++;
} else logger.info(`Test 2: Fallo!!!. El resultado es ${resultTest2}`);

logger.info('\nTest 3. La suma debe ser correcta.');
const resultTest3 = suma(2, 3);
if (resultTest3 === 5) {
  logger.info('Test 3: PASS');
  testOK++;
} else logger.info(`Test 3: Fallo!!!. El resultado es ${resultTest3}`);

logger.info('\nTest 4. La suma debe ser correcta con muchos parámetros');
const resultTest4 = suma(1, 2, 3, 5, 10);
if (resultTest4 === 21) {
  logger.info('Test 4: PASS');
  testOK++;
} else logger.info(`Test 4: Fallo!!!. El resultado es ${resultTest4}`);

logger.info(`\n\n Finalmente Pasaron ${testOK} testings de un total de ${testTotal}`);
