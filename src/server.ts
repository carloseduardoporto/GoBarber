import express from 'express';
import routes from './routes';
import './database';
import 'reflect-metadata';


const app = express();

app.use(express.json());
app.use(routes);

app.get('/', (request, response) => response.json({ message: 'Hello Stack' }));

app.listen(3333, () => {
  console.log('Server running on port 3333!');
});
