import express from 'express';
import { catchErrors } from '../lib/catch-errors.js';
import { listEvents } from '../lib/db.js';

export const indexRouter = express.Router();



async function indexRoute(req, res) {
  const events = await listEvents();
  //const events = {};
  res.render('index', {
    title: 'Viðburðasíðan',
    events,
  });
}

indexRouter.get('/', catchErrors(indexRoute));
//loginRouter.get('/views/login.ejs', catchErrors(loginRoute))

// TODO útfæra öll routes
/*const routes = {
  '/' : home,
  '/views/login.ejs' : login
}*/

