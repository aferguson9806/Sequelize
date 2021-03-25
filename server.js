import express from 'express';
import path from 'path';
import db from './database/initializeDB.js';
import apiRoutes from './routes/apiRoutes.js';





const __dirname = path.resolve();
const app = express();
const port = process.env.PORT || 3000;
const staticFolder = 'public';


// Configure express
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(staticFolder));

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', apiRoutes);

async function bootServer() {
  try {
    const mysql = await db.sequelizeDB;
    await mysql.sync();
    app.listen(PORT, () => {
      console.log(`Listening on: http//localhost:${PORT}`);
    });
  } catch (err) {
    console.error(err);
  }
}

bootServer();
