import express from 'express';
import * as root from './representation/root';

const router = express.Router();

/* GET index page. */
router.get('/', (req, res, next) => {
  root.handler(req, res);
});

export default router;