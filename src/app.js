import dotenv from 'dotenv';
import express from 'express';
import { dirname, format, join } from 'path';
import { fileURLToPath } from 'url';
import { indexRouter } from './routes/index-routes.js';


dotenv.config();

const{
  DATABASE_URL: connectionString = 'postgres://:@localhost/postgres',
  NODE_ENV: nodeEnv = 'development',
  PORT: port = 3000 
} = process.env;

//const { PORT: port = 3000 } = process.env;

const app = express();

// Sér um að req.body innihaldi gögn úr formi
app.use(express.urlencoded({ extended: true }));

const path = dirname(fileURLToPath(import.meta.url));

app.use(express.static(join(path, '../public')));
app.set('views', join(path, '../views'));
app.set('view engine', 'ejs');


app.locals.Date = (str) =>  {
  // TODO hjálparföll fyrir template
  let date = "";
  try{
    date = format(str || "", "dd.MM.yyyy");
  }catch{
    return "";
  }
  return date;
};

app.use('/', indexRouter);
// TODO admin routes
//app.use('/admin',adminRouter);

/** Middleware sem sér um 404 villur. */
app.use((req, res) => {
  const title = 'Síða fannst ekki';
  res.status(404).render('error', { title });
});

/** Middleware sem sér um villumeðhöndlun. */
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  const title = 'Villa kom upp';
  res.status(500).render('error', { title });
});

app.listen(port, () => {
  console.info(`Server running at http://localhost:${port}/`);
});
