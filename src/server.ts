import 'reflect-metadata';

import express from 'express';
import routes from './routes';
const app = express();

import './database';
import uploadConfig from './config/upload';

app.use(express.json());
app.use(routes);
app.use('/files', express.static(uploadConfig.directory))

app.listen(3333, () => {
    console.log("Server started on port 3333!");
})
