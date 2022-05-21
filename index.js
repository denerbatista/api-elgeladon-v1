import express from 'express';
import cors from 'cors';
import {config} from 'dotenv';
import {env} from  'process';
import { router } from './src/routers/paletas.router.js';

config()

const port = env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cors());
app.use('/paletas', router);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
