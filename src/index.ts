import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';
import setupSwagger from './middleware/swaggerMiddleware';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDatabase } from './config/database';
import connectionOptions from './config/typeorm';

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

setupSwagger(app);

connectDatabase(connectionOptions);

app.use('/', routes);

const PORT = process.env.PORT || 4568;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

export default app;
