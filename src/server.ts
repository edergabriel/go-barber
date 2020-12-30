import 'reflect-metadata';

import express, { Request, Response, NextFunction} from 'express';
import 'express-async-errors';

import routes from './routes';
const app = express();

import './database';
import uploadConfig from './config/upload';
import AppError from './errors/AppError';

app.use(express.json());
app.use(routes);
app.use('/files', express.static(uploadConfig.directory))

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if(err instanceof AppError) {
        return response.status(err.statusCode).json({
            status: 'error',
            message: err.message,
        })
    }

    console.error(err);

    return response.status(500).json({
        status: 'error',
        message: 'Internal server error'
    })




})

app.listen(3333, () => {
    console.log("Server started on port 3333!");
})
