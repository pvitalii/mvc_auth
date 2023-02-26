import 'dotenv/config';
import Express, { json, urlencoded } from 'express';
import 'reflect-metadata';
import { PostgresDataSource } from './database/app-data-source';
import { appRouter } from './routes';
import cookieParser from 'cookie-parser';
import session from 'express-session';

PostgresDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });

const app = Express();

app
  .use(json())
  .use(urlencoded({ extended: true }))
  .use(cookieParser())
  .set('view engine', 'ejs')
  .use(Express.static(process.cwd() + '/public'))
  .use(
    session({
      secret: process.env.SESSION_SECRET!,
      resave: false,
      saveUninitialized: true
    })
  );

app.use(appRouter).get('*', (req, res) => res.redirect('/auth/login'));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
